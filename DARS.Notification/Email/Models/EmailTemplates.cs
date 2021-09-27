using System;
using System.Collections.Generic;
using System.Text;

namespace BanHang.Notification.Email.Models
{
    public class EmailTemplate
    {
        public string id { get; set; }
        public string name { get; set; }
        public List<Version> versions { get; set; }
    }
}
