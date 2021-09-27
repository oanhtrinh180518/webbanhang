using System.Threading.Tasks;
using BanHang.Notification.Email.Models;

namespace BanHang.Notification.Email
{
    public interface IEmailProvider
    {
        Task<bool> ExecuteAsync(EmailProviderParameter parameter);
        Task<EmailTemplates> GetTemplatesAsync();
        Task<EmailTemplate> GetTemplateByNameAsync(string templateName);
        Task<EmailTemplate> GetTemplateByIdAsync(string id);
    }
}
