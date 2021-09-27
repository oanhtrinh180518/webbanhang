using BanHang.Data.Models;
using BanHang.Notification.Email;
using BanHang.Services.ViewModel;
using Microsoft.AspNetCore.Identity;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BanHang.Services.Services
{
    public class EmailService : IEmailService
    {
        private readonly IEmailProvider _emailProvider;
        private readonly UserManager<User> _userManager;
        public EmailService(IEmailProvider emailProvider,
                            UserManager<User> userManager)
        {
            _emailProvider = emailProvider;

            _userManager = userManager;
        }
        public async Task<ApiResult<bool>> SendConfirmEmail(string confirmationLink, string email, string encodeToken)
        {
            var emailPram = new EmailProviderParameter
            {
                mail_from_title = "Emai Confirm",
                mail_from = "oganuceicdb@gmail.com",
                mail_to = email,
                mail_subject = "[OGN] Email Confirm",
                //template_id = _config["SendGrid:EmailConfirmTemplateId"],
                plain_text_content = "Cảm ơn bạn đã đăng ký !",
                html_content = "<div><span>Cảm ơn bạn đã đăng ký </span></div>" +
                                  "<div><span>Để bắt đầu, hãy nhấp vào liên kết bên dưới để xác nhận tài khoản của bạn.</span></div>" +
                                  $"<div><a href='https://localhost:5001/user/confirmemail/?token={encodeToken}&email={email}'>Xác nhận tài khoản</div></span>"

            };
            //emailPram.merge_fields = new Dictionary<string, string>();
            //emailPram.merge_fields.Add("message", "Cảm ơn");
            var result = await _emailProvider.ExecuteAsync(emailPram);
            if (result)
                return new ApiError<bool>("Gửi email thành công");
            return new ApiError<bool>("Gửi email không thành công");
        }

        public async Task<ApiResult<bool>> SendResetPasswordLink( string resetPasswordLink, string email, string encodeToken)
        {
            var emailParam = new EmailProviderParameter
            {
                mail_from_title = "Reset Password",
                mail_from = "oganuceicdb@gmail.com",
                mail_to = email,
                mail_subject = "[OGN] Reset Password",
                plain_text_content = "Reset Password",
                html_content = "<div><span>Chúng tôi nhận được yêu cầu đặt lại mật khẩu của bạn.</span></div>" +
                                "<div><span>Để bắt đầu, vui lòng nhấn vào liên kết bên dưới để tiến hành đặt lại mật khẩu của bạn.</span></div>" +
                                $"<div><a href='http://localhost:3000/reset-password?token={encodeToken}&email={email}'>Đặt lại mật khẩu</div>"
            };

            var result = await _emailProvider.ExecuteAsync(emailParam);
            if (result)
                return new ApiError<bool>("Gửi email thành công");
            return new ApiError<bool>("Gửi email không thành công");
        }
        
    }
}
