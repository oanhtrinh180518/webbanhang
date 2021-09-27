using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace BanHang.Notification.Client
{
    public class NotificationsHub : Hub
    {
        public async Task SendMessage(NotifyMessageModel message)
        {
            await Clients.All.SendAsync("NotifyMessage", message);
        }
    }
}
