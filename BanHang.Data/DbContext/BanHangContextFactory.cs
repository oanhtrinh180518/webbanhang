using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace BanHang.Data.DbContext
{
    public class BanHangContextFactory : IDesignTimeDbContextFactory<BanHangContext>
    {
        
        public BanHangContext CreateDbContext(string[] args)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();

            var connectionString = configuration.GetConnectionString("BanHang");

            var optionBuilder = new DbContextOptionsBuilder<BanHangContext>();
            optionBuilder.UseSqlServer(connectionString);
            return new BanHangContext(optionBuilder.Options);
        }
    }
}
