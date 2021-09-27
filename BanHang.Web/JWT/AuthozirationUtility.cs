using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using BanHang.Security.SecurityModel;
using BanHang.Security.Common;
using BanHang.Security.Extension;

namespace DARS.WebAPI.Utility
{
    public class AuthozirationUtility : IAuthozirationUtility
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<AuthozirationUtility> _logger;

        public AuthozirationUtility(
            IConfiguration configuration, 
            ILogger<AuthozirationUtility> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }

        public string RenderAccessToken(current_user_access access_user)
        {
            var audience = _configuration["TokenAuthentication:siteUrl"];

            var jwtToken = new JwtSecurityToken(
                issuer: audience,
                audience: audience,
                claims: GetTokenClaims(access_user),
                expires: access_user.ExpireTime,
                signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Constant.SecretSercurityKey)), SecurityAlgorithms.HmacSha256)
            );

            return new JwtSecurityTokenHandler().WriteToken(jwtToken);
        }


        public JwtSecurityToken GetRequestAccessToken(HttpContext context)
        {
            //var tokenTest = context.GetTokenAsync("Bearer", "access_token");
            try
            {
                var token = GetToken(context);
                token = token.Replace("Bearer ", "");
                return new JwtSecurityTokenHandler().ReadJwtToken(token);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, message: "ReadJwtToken false");
                return null;
            }
        }

        private string GetToken(HttpContext context)
        {
            var token = context.Request.Headers["Authorization"].ToString();
            return string.IsNullOrWhiteSpace(token) ? string.Empty : token;
        }

        private IEnumerable<Claim> GetTokenClaims(current_user_access access_user)
        {
            return new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Email, access_user.Email),
                new Claim(JwtRegisteredClaimNames.Typ, string.Join(",",access_user.Roles)),
                new Claim(JwtRegisteredClaimNames.NameId, access_user.UserName),
                new Claim(JwtRegisteredClaimNames.Exp, access_user.ExpireTime.ToShortDateString()),
                new Claim(JwtRegisteredClaimNames.Sub, access_user.UserId.ToString())
            };
        }

        public string GetClaim(HttpContext context, string claimType)
        {
            var jwtSecurityToken = GetRequestAccessToken(context);
            return jwtSecurityToken?.GetClaimValue(claimType.ToString());
        }

        public List<Claim> GetClaims(HttpContext context)
        {
            var jwtSecurityToken = GetRequestAccessToken(context);
            return jwtSecurityToken?.Payload.Claims.ToList();
        }

        public int GetUserId(HttpContext context)
        {
            var jwtSecurityToken = GetRequestAccessToken(context);
            var userIdClaim = jwtSecurityToken?.GetClaimValue(JwtRegisteredClaimNames.Sub.ToString());
            double userExp;
            if (!double.TryParse(jwtSecurityToken?.GetClaimValue(JwtRegisteredClaimNames.Exp.ToString()), out userExp))
            {
                return 0;
            }
            var now = DateTimeOffset.Now.ToUnixTimeSeconds();
            if (userExp < now) { return -1; } // expired
            int userId = 0;
            if (userIdClaim != null && int.TryParse(userIdClaim, out userId))
            {
                return userId;
            }
            return -1;
        }
    }
}
