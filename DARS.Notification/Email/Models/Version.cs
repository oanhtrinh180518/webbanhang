using System;
using System.Collections.Generic;
using System.Text;

namespace BanHang.Notification.Email.Models
{
    public class Version
    {
        public string id { get; set; }
        public string user_id { get; set; }
        public string template_id { get; set; }
        public bool active { get; set; }
        public string name { get; set; }
        public string html_content { get; set; }
        public string plain_content { get; set; }
        public string subject { get; set; }
        public string editor { get; set; }
        public string updated_at { get; set; }
    }
}
