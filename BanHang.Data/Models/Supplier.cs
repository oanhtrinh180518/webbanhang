using System;
using System.Collections.Generic;
using System.Text;

namespace BanHang.Data.Models
{
    public class Supplier : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public int Status { get; set; }

        public ICollection<Product> Products { get; set; }
    }
}
