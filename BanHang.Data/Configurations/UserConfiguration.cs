using BanHang.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace BanHang.Data.Configurations
{
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.ToTable("User");

            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).UseIdentityColumn();

            builder.Property(x => x.UserName).IsRequired().HasMaxLength(100);
            builder.Property(x => x.PasswordHash).IsRequired();
            builder.Property(x => x.FullName).HasMaxLength(100);
            builder.Property(x => x.Address).HasMaxLength(100);
            builder.Property(x => x.Active).HasDefaultValue(true);
            builder.Property(x => x.Age);
            builder.Property(x => x.BirthDay);
            builder.Property(x => x.Gender);

            builder.Property(x => x.Email).IsRequired().HasMaxLength(200);
        }
    }
}
