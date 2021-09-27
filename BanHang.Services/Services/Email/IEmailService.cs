using BanHang.Services.ViewModel;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BanHang.Services.Services
{
    public interface IEmailService
    {
        Task<ApiResult<bool>> SendConfirmEmail(string link, string email, string encodeToken);
        Task<ApiResult<bool>> SendResetPasswordLink(string link, string email, string encodeToken);

    }
}
