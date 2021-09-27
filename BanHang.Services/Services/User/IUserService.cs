using BanHang.Data.Models;
using BanHang.Services.ViewModel;
using BanHang.Services.ViewModel.Filter;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BanHang.Services.Services
{
    public interface IUserService
    {
        Task<ApiResult<RegisterResult>> RegisterAsync(RegisterRequest request, string confirmationLink);
        Task<ApiResult<UserTokenResult>> AdminRegisterAsync(RegisterRequest request, string confirmationLink);
        Task<bool> ConfirmEmail(string token, string email);
        Task<ApiResult<UserTokenResult>> LoginAsync(Login model);
        Task<ApiResult<UserTokenResult>> ForgetPasswordAsync(ForgotPaswordViewModel model, string passwordResetLink);
        Task<ApiResult<bool>> ResetPasswordAsync(ResetPasswordViewModel model);
        Task<ApiResult<Pagination<UserViewModel>>> GetUsersAsync(UserFilter filter);
        Task<List<ListUsernames>> GetListUsernames();
        bool UpdateUser(UserViewModel model, int id);
        bool UpdateMemberActive(updateActiveReq request, int memberId);
        UserViewModel GetUserById(int id);
        ApiResult<Pagination<UserViewModel>> FilterUser(UserFilter filter);
        bool ValidateEmailFormat(string email);
        Task<ApiResult<bool>> CheckPassword(CheckPasswordVM model);
        Task<ApiResult<bool>> ChangePassword(ChangePasswordVM model, string userId);
    }
}
