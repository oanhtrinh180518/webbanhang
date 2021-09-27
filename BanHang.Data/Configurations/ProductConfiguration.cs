using BanHang.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace BanHang.Data.Configurations
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.ToTable("Product");
            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).UseIdentityColumn();

            builder.Property(x => x.Name).IsRequired().HasMaxLength(100);
            builder.Property(x => x.Description).HasMaxLength(100);
            builder.Property(x => x.Weight).IsRequired().HasDefaultValue(1);
            // CreateDate and UpdateDate add HasDefaultValue 
            builder.Property(x => x.CreateDate).IsRequired().HasDefaultValue(DateTime.Now);
            builder.Property(x => x.UpdateDate).HasDefaultValue(DateTime.Now);

            builder.Property(x => x.ExpDate).IsRequired();
            builder.Property(x => x.Status).HasDefaultValue(1);
            builder.Property(x => x.Discount).HasDefaultValue(0);
            builder.Property(x => x.IsDelete).HasDefaultValue(false);
            builder.Property(x => x.AvailableQuantity).IsRequired().HasDefaultValue(1);
            builder.Property(x => x.UnitPrice).IsRequired();
            builder.Property(x => x.SupplierId).IsRequired();
            builder.Property(x => x.CategoryId).IsRequired();
            builder.Property(x => x.AverageRate);
            builder.Property(x => x.CountRate);
            builder.Property(x => x.Sold).HasDefaultValue(0);




            builder.HasOne(x => x.Category).WithMany(y => y.Products).HasForeignKey(f => f.CategoryId);
            builder.HasOne(x => x.Supplier).WithMany(y => y.Products).HasForeignKey(f => f.SupplierId);
           
        }
    }
}
