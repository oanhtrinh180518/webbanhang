using System;
using System.Collections.Generic;
using System.Text;

namespace BanHang.Data.Models
{
    public class Comment : IEntity
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ProductId { get; set; }
        public string Content { get; set; }
        public int Rate { get; set; }
        public DateTime? CreateTime { get; set; }

        
        public virtual User User { get; set; }
        public virtual Product Product { get; set; }
    }
}
