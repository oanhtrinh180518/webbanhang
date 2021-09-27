using BanHang.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace BanHang.Data.Configurations
{
    public class PictureConfiguration : IEntityTypeConfiguration<Picture>
    {
        public void Configure(EntityTypeBuilder<Picture> builder)
        {
            builder.ToTable("Picture");

            builder.HasKey(x => x.Id);
            builder.Property(x => x.Id).UseIdentityColumn();

            //add Property ProductId
            builder.Property(x => x.ProductId).IsRequired();
            //alter Filename is auto from FilePath => delete IsRequired()
            builder.Property(x => x.FileName).IsRequired();
            builder.Property(x => x.FilePath).IsRequired();
            builder.Property(x => x.FileExtension);
            builder.Property(x => x.Status).HasDefaultValue(0);
            
            
            builder.HasOne(x => x.Product).WithMany(y => y.Pictures).HasForeignKey(f => f.ProductId);
        }
    }
}
