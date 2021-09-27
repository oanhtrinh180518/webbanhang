using System;
using System.Collections.Generic;
using System.Text;

namespace BanHang.Data.Models
{
    public class Product : IEntity
    {
        public int Id { get; set; }
        public int SupplierId { get; set; }
        public int CategoryId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double UnitPrice { get; set; }
        public int? AvailableQuantity { get; set; }
        public int? Weight { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime ExpDate { get; set; }
        public DateTime UpdateDate { get; set; }
        public int Status { get; set; }
        public int Discount { get; set; }
        public bool IsDelete { get; set; }
        public int AverageRate { get; set; }
        public int CountRate { get; set; }
        public int Sold { get; set; }
        
        


        public virtual Supplier Supplier { get; set; }
        public virtual Category Category { get; set; }
        


       
        public ICollection<Picture> Pictures { get; set; }
        public ICollection<Comment> Comments { get; set; }
        public ICollection<OrderDetail> OrderDetails { get; set; }
        public ICollection<Cart> Carts { get; set; }

    }
}
