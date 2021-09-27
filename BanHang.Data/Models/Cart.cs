using System;
using System.Collections.Generic;
using System.Text;

namespace BanHang.Data.Models
{
    public class Cart : IEntity
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public virtual User User { get; set; }
        public virtual Product Product { get; set; }                                                    
    }
}
