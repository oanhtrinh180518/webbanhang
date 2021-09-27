using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using SendGrid;
using SendGrid.Helpers.Mail;
using Microsoft.Extensions.Configuration;
using System.Linq;
using System.Net;
using System.Reflection;
using Newtonsoft.Json;
using BanHang.Notification.Email.Models;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using NLog;

namespace BanHang.Notification.Client
{
    public class NotifyServices : INotifyServices
    {
        private readonly IConfiguration _config;
        private readonly ILogger<NotifyServices> _logger;
        private readonly IHubContext<NotificationsHub> _hubContext;

        public NotifyServices(IConfiguration configuration, ILogger<NotifyServices> logger,
            IHubContext<NotificationsHub> hubContext)
        {
            _config = configuration;
            _logger = logger;
            _hubContext = hubContext;
        }

        public async Task<bool> SendMessage(NotifyMessageModel message)
        {
            await _hubContext.Clients.All.SendAsync("NotifyMessage", message);
            return true;
        }
    }
}
