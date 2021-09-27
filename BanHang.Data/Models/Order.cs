using System;
using System.Collections.Generic;
using System.Text;

namespace BanHang.Data.Models
{
    public class Order : IEntity
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int Status { get; set; }
        public DateTime CreateDate { get; set; }
        public string Address { get; set; }
        public DateTime ShipDate { get; set; }
        public string Phone { get; set; }
        public int TotalPrice { get; set; }
        
        public virtual User User { get; set; }
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
    }
}
