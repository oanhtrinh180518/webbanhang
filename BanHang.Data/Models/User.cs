using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;

namespace BanHang.Data.Models
{
    public class User : IdentityUser<int>, IEntity
    {
        public string FullName { get; set; }
        public bool Active { get; set; }
        public string Address { get; set; }

        public int Age { get; set; }
        public DateTime BirthDay { get; set; }
        public int Gender { get; set; }

        public ICollection<Comment> Comments { get; set; }
        public ICollection<Cart> Carts { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
       
    }

    public class Role : IdentityRole<int>, IEntity
    {
        public string Description { get; set; }
    }
    public class UserRole : IdentityUserRole<int>
    {
    }

    public class UserClaim : IdentityUserClaim<int>, IEntity
    {
    }

    public class UserLogin : IdentityUserLogin<int>
    {
    }

    public class RoleClaim : IdentityRoleClaim<int>, IEntity
    {
    }

    public class UserToken : IdentityUserToken<int>
    {
    }
}
