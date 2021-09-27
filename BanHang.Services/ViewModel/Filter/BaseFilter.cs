using System;
using System.Collections.Generic;
using System.Text;

namespace BanHang.Services.ViewModel.Filter
{
    public class BaseFilter
    {
        public int PageIndex { get; set; } = 1;
        public int PageSize { get; set; } = 9;
    }
}
