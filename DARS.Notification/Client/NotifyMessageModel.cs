using System;
using System.Collections.Generic;
using System.Text;

namespace BanHang.Notification.Client
{
    public class NotifyMessageModel
    {
        public string Title { get; set; }
        public string Type { get; set; }
        public int Status { get; set; }
        public string Message { get; set; }
        public string Link { get; set; }
    }
}
