using System;
using System.Collections.Generic;
using System.Text;

namespace BanHang.Services.ViewModel.Filter
{
    public class UserFilter : BaseFilter
    {
        public string FullName { get; set; }
        public string Username { get; set; }
        public string PhoneNumber { get; set; }
        public bool? Active { get; set; }
    }
}
