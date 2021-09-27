using System;
using System.Collections.Generic;
using System.Security.Principal;
using System.Text;

namespace BanHang.Security.SecurityModel
{
    public class current_user_access
    {
        public int UserId { get; set; }
        public string Email { get; set; }
        public string UserName { get; set; }
        public List<string> Roles { get; set; }
        public DateTime ExpireTime { get; set; }
    }

    public class JWTAuthenticationIdentity : GenericIdentity
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public List<string> Roles { get; set; }
        public DateTime ExpireTime { get; set; }
        public JWTAuthenticationIdentity(string userName)
            : base(userName)
        {
            UserName = userName;
        }
    }
}
