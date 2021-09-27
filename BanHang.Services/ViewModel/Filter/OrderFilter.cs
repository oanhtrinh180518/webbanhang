using System;
using System.Collections.Generic;
using System.Text;

namespace BanHang.Services.ViewModel.Filter
{
    public class OrderFilter : BaseFilter
    {
        public int? Status { get; set; }
        public int? UserId { get; set; }
        public string UserName { get; set; }
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
        public DateTime? ShipDate { get; set; }


    }
    public class OrderSort
    {
        public bool? IsStatus { get; set; } = true;
        public bool? IsUserId { get; set; } = true;
        public bool? IsCreateAt { get; set; } = true;
        public bool? IsShipDate { get; set; } = true;

    }

    public class OrderFilterMonth
    {
        public DateTime? FromDate { get; set; }
        public DateTime? ToDate { get; set; }
    }
}
