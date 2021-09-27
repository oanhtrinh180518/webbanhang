using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using BanHang.Security.SecurityModel;
using Microsoft.AspNetCore.Http;

namespace DARS.WebAPI.Utility
{
    public interface IAuthozirationUtility
    {
        string RenderAccessToken(current_user_access access_user);
        JwtSecurityToken GetRequestAccessToken(HttpContext context);
        int GetUserId(HttpContext context);
        string GetClaim(HttpContext context, string claimType);
        List<Claim> GetClaims(HttpContext context);

    }
}
