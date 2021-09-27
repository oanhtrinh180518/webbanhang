using BanHang.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace BanHang.Data.Configurations
{
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.ToTable("Order");

            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).UseIdentityColumn();
            builder.Property(x => x.Status).HasDefaultValue(1);
            //CreateDate add HasDefaultValue
            builder.Property(x => x.CreateDate).IsRequired().HasDefaultValue(DateTime.Now);
            builder.Property(x => x.UserId).IsRequired();
            builder.Property(x => x.ShipDate);
            builder.Property(x => x.Phone).IsRequired();
            //TotalPrice delete IsRequired beacause TotalPrice alter OderDetail
            builder.Property(x => x.TotalPrice);
            builder.Property(x => x.Address).IsRequired().HasMaxLength(100);

            builder.HasOne(order => order.User).WithMany(user => user.Orders).HasForeignKey(f_order => f_order.UserId);
        }
    }
}
