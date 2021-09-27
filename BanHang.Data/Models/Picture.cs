using System;
using System.Collections.Generic;
using System.Text;

namespace BanHang.Data.Models
{
        public class Picture : IEntity
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string FileName { get; set; }
        public string FilePath { get; set; }
        public string FileExtension { get; set; }
        public int Status { get; set; }
        
        
        public virtual Product Product { get; set; }
    }
}
