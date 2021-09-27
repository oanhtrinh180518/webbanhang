using BanHang.Security.Common;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BanHang.Web.Attributes
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = true, Inherited = true)]
    public class CustomAuthorization : Attribute, IAuthorizeData
    {
        public CustomAuthorization(params object[] Roles)
        {
            if (Roles.Any(p => p.GetType().BaseType != typeof(Enum)))
            {
                this.Policy = Enum.GetName(typeof(UserTypeEnum), UserTypeEnum.admin);
            }
            else
            {
                this.Policy = string.Join(",", Roles.Select(p => Enum.GetName(p.GetType(), p)).Distinct().ToList());
            }

            AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme;
        }
        public string Policy { get; set; }
        public string Roles { get; set; }
        public string AuthenticationSchemes { get; set; }
    }
}