using System;
using System.Collections.Generic;
using System.Text;

namespace BanHang.Data.Models
{
    public class Category : IEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Status { get; set; }
        public string Code { get; set; }
        public int ProductQty { get; set; }

        public virtual ICollection<Product> Products { get; set; }
    }
}
