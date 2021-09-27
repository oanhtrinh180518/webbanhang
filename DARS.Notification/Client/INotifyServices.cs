using System.Threading.Tasks;
using BanHang.Notification.Client;
using BanHang.Notification.Email.Models;

namespace BanHang.Notification.Client
{
    public interface INotifyServices
    {
        Task<bool> SendMessage(NotifyMessageModel message);
    }
}
