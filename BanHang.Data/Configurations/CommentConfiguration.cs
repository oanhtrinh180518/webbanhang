using BanHang.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace BanHang.Data.Configurations
{
    class CommentConfiguration : IEntityTypeConfiguration<Comment>
    {
        public void Configure(EntityTypeBuilder<Comment> builder)
        {
            builder.ToTable("Comment");

            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).UseIdentityColumn();
            builder.Property(x => x.Content).HasMaxLength(200);
            builder.Property(x => x.CreateTime).HasDefaultValue(DateTime.Now);

            //oanh: them property UserId, ProductId
            builder.Property(x => x.UserId).IsRequired();
            builder.Property(x => x.ProductId).IsRequired();
            //add Property Rate
            builder.Property(x => x.Rate).HasDefaultValue(0);

            builder.HasOne(x => x.User).WithMany(y => y.Comments).HasForeignKey(f => f.UserId);
            builder.HasOne(x => x.Product).WithMany(y => y.Comments).HasForeignKey(f => f.ProductId);
            
        }
    }
}
