using BanHang.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace BanHang.Data.Configurations
{
    public class OrderDetailConfiguration : IEntityTypeConfiguration<OrderDetail>
    {
        public void Configure(EntityTypeBuilder<OrderDetail> builder)
        {
            builder.ToTable("OrderDetail");

            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).UseIdentityColumn();

            builder.Property(x => x.OrderId).IsRequired();
            builder.Property(x => x.ProductId).IsRequired();

            builder.Property(x => x.Quantity).HasDefaultValue(1);
            builder.Property(x => x.TotalAmount).HasDefaultValue(0);

            builder.HasOne(orderdetail => orderdetail.Order).WithMany(order => order.OrderDetails).HasForeignKey(f => f.OrderId);
            builder.HasOne(orderdetail => orderdetail.Product).WithMany(product => product.OrderDetails).HasForeignKey(f => f.OrderId);
        }
    }
}
