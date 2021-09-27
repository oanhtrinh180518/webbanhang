
using BanHang.Data.Configurations;
using BanHang.Data.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace BanHang.Data.DbContext
{
    public sealed class BanHangContext : IdentityDbContext<User, Role, int, UserClaim, UserRole, UserLogin, RoleClaim, UserToken>
    {
        //contructor
        public BanHangContext(DbContextOptions<BanHangContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            // load config
            builder.ApplyConfiguration(new UserConfiguration());
            builder.ApplyConfiguration(new OrderConfiguration());
            builder.ApplyConfiguration(new CommentConfiguration());
            builder.ApplyConfiguration(new CategoryConfiguration());
            builder.ApplyConfiguration(new ProductConfiguration());
            builder.ApplyConfiguration(new PictureConfiguration());
            builder.ApplyConfiguration(new SupplierConfiguration());
            builder.ApplyConfiguration(new RoleConfiguration());
            builder.ApplyConfiguration(new CartConfiguration());
            // add identity
            builder.Entity<UserRole>().ToTable("UserRole");
            builder.Entity<UserLogin>().ToTable("UserLogin");
            builder.Entity<UserClaim>().ToTable("UserClaim");
            builder.Entity<UserToken>().ToTable("UserToken");
            builder.Entity<RoleClaim>().ToTable("RoleClaim");
            //
            base.OnModelCreating(builder);
        }
    }
}
