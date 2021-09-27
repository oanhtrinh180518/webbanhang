using BanHang.Data.Models;
using BanHang.Data.Repository;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using BanHang.Services.Services;
using BanHang.Services.ViewModel;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Z.EntityFramework.Plus;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using BanHang.Services.ViewModel.Filter;
using System.Text.RegularExpressions;

namespace BanHang.Services.Services
{
    public class UserService : IUserService
    {
        private readonly UnitOfWork work;
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _config;

        // goi EmailService
        private readonly IEmailService _emailService;


        public UserService(
            UserManager<User> userManager,
            IEmailService emailService, IConfiguration config)
        {
            work = UnitOfWork.GetDefaultInstance();
            _userManager = userManager;
            _emailService = emailService;
            _config = config;
        }


        // Member Register
        public async Task<ApiResult<RegisterResult>> RegisterAsync(RegisterRequest request, string confirmationLink)
        {
            var user = await _userManager.FindByNameAsync(request.UserName);
            if (user != null) 
                return new ApiError<RegisterResult>("User already exist!");

            var email = await _userManager.FindByEmailAsync(request.Email);
            if (email != null)
                return new ApiError<RegisterResult>("Email already used !");
            // check thong tin truoc: password
            if (request.Password != request.ConfirmPassword)
                return new ApiError<RegisterResult>("Password and confirm password do not match!");
            // fix thoong tin tao moi
            var userModel = new User
            {
                UserName = request.UserName,
                Email = request.Email,
                FullName = request.FullName,
                Address = request.Address,
                PhoneNumber = request.PhoneNumber
            };
            var result = await _userManager.CreateAsync(userModel, request.Password);
            if (!result.Succeeded)
            {
               
                return new ApiError<RegisterResult>(result.Errors.FirstOrDefault().Description);
            }
            // phan quyen
            await _userManager.AddToRoleAsync(userModel, "member");
            //tao token confirm email
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(userModel);
            var tokenEncode = Convert.ToBase64String(Encoding.UTF8.GetBytes(token));
            // goi emailservice
            await _emailService.SendConfirmEmail(confirmationLink, userModel.Email, tokenEncode);
            //await ConfirmEmail(tokenEncode, request.Email);
            //return new ApiSuccess<UserTokenResult> { Result = new UserTokenResult { Token = tokenEncode, UserName = userModel.UserName } };
            return new ApiSuccess<RegisterResult> ("Register Successfully!") { Result = new RegisterResult {  Token = tokenEncode, Username = userModel.UserName } };
        }

        // Admin Register
        public async Task<ApiResult<UserTokenResult>> AdminRegisterAsync(RegisterRequest request, string confirmationLink)
        {
            var user = await _userManager.FindByNameAsync(request.UserName);
            if (user != null)
                return new ApiError<UserTokenResult>("Admin already exist!");
            // check thong tin truoc: password
            if (request.Password != request.ConfirmPassword)
                return new ApiError<UserTokenResult>("Password and confirm password do not match!");
            // fix thoong tin tao moi
            var userModel = new User
            {
                UserName = request.UserName,
                Email = request.Email,
                FullName = request.FullName,
                Address = request.Address,
                PhoneNumber = request.PhoneNumber
            };
            var result = await _userManager.CreateAsync(userModel, request.Password);
            if (!result.Succeeded)
            {
                return new ApiError<UserTokenResult>("Register failed!");
            }
            // tao token confirm email
            var token = await _userManager.GenerateEmailConfirmationTokenAsync(userModel);
            var tokenEncode = Convert.ToBase64String(Encoding.UTF8.GetBytes(token));
            // phan quyen
            var addrole = await _userManager.AddToRoleAsync(userModel, "admin");
            if (!addrole.Succeeded)
            {
                return new ApiError<UserTokenResult>("Add role failed!");
            }
            //goi emailservice
            await _emailService.SendConfirmEmail(confirmationLink, userModel.Email, tokenEncode);
            return new ApiSuccess<UserTokenResult> { Result = new UserTokenResult { Token = tokenEncode} };
        }

        // Login
        public async Task<ApiResult<UserTokenResult>> LoginAsync(Login model)
        {

            var user = await _userManager.FindByNameAsync(model.UserName);
            if(user.Active == false)
            {
                return new ApiError<UserTokenResult>("Tài khoản đã bị khóa, Vui lòng liên hệ với cửa hàng để biết thêm thông tin.");
            }
            var result = await _userManager.CheckPasswordAsync(user, model.Password);
            if (!result)
            {
                return new ApiError<UserTokenResult>("Mật khẩu không chính xác!");
            }
            var roles =  await _userManager.GetRolesAsync(user);
            var token = RenderAccessToken(user, roles, DateTime.Now.AddDays(30));
            return new ApiSuccess<UserTokenResult> { Result = new UserTokenResult {Token = token, UserName = user.UserName } };
        }

        // Confirm Email
        public async Task<bool> ConfirmEmail(string tokenEncode, string email)
        {

            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return false;
            }

            var tokenDecode = Encoding.UTF8.GetString(Convert.FromBase64String(tokenEncode));
            await _userManager.ConfirmEmailAsync(user, tokenDecode);

            return true;
        }

        // Forgot password
        public async Task<ApiResult<UserTokenResult>> ForgetPasswordAsync(ForgotPaswordViewModel model, string passwordResetLink)
        {
            var email = await _userManager.FindByEmailAsync(model.Email);
            
            if (email != null && await _userManager.IsEmailConfirmedAsync(email))

            {
                if (email.Active == false)
                {
                    return new ApiError<UserTokenResult>("Tài khoản liên kết với email này hiện đang bị khóa. Vui lòng liên hệ cửa hàng để được hỗ trợ.");
                }

                var token = await _userManager.GeneratePasswordResetTokenAsync(email);
                var tokenEncode = Convert.ToBase64String(Encoding.UTF8.GetBytes(token));
                // gui mail qua EmailService
                await _emailService.SendResetPasswordLink(passwordResetLink, model.Email, tokenEncode);
                return new ApiSuccess<UserTokenResult> { Result = 
                    new UserTokenResult { Token = tokenEncode, UserName = model.Email } };
            }
            return new ApiError<UserTokenResult>("This email was not registered!!!");
        }

        // Reset Password
        public async Task<ApiResult<bool>> ResetPasswordAsync(ResetPasswordViewModel model)
        {
             var user = await _userManager.FindByEmailAsync(model.Email);
             if (user ==  null)
            {
                return new ApiError<bool>("Failed!") { IsOk = false };
            }
             if (model.ConfirmNewPassword != model.NewPassword)
            {
                return new ApiError<bool>("Password and Confirm password doesn't match") {IsOk = false };
            }
            var tokenDecode = Encoding.UTF8.GetString(Convert.FromBase64String(model.Token));
            var result = await _userManager.ResetPasswordAsync(user, tokenDecode, model.NewPassword);
            if (result.Succeeded)
            {
                return new ApiSuccess<bool>("Reset password successfully!") { IsOk = true };
            }
            else if (!result.Succeeded)
            {
                return new ApiError<bool>(result.Errors.FirstOrDefault().Description) { IsOk = false }; 
            }
                return new ApiError<bool>("Reset password Failed!");
        }

        // Get all users ("member" role)
        public async Task<ApiResult<Pagination<UserViewModel>>> GetUsersAsync(UserFilter filter)
        {
            var userList = await _userManager.GetUsersInRoleAsync("member");
            var userListVMs = userList
                .Where(o => string.IsNullOrWhiteSpace(filter.FullName) || o.FullName.ToLower().Contains(filter.FullName.ToLower()))
                .Where(o => string.IsNullOrWhiteSpace(filter.Username) || o.UserName.ToLower().Contains(filter.Username.ToLower()))
                .Where(o => string.IsNullOrWhiteSpace(filter.PhoneNumber) || o.PhoneNumber == filter.PhoneNumber)
                .Where(o => filter.Active == null || o.Active == filter.Active)
                
                .ToList();

            var pagination = new Pagination<UserViewModel>();

            pagination.TotalRecords = userListVMs.Count;
            pagination.PageIndex = filter.PageIndex;
            pagination.PageSize = filter.PageSize;
            pagination.Items = userListVMs
                .Skip(filter.PageSize * (filter.PageIndex - 1))
                .Take(filter.PageSize)
                .Select(model => new UserViewModel()
                {
                    Id = model.Id,
                    FullName = model.FullName,
                    UserName = model.UserName,
                    PhoneNumber = model.PhoneNumber,
                    Age = model.Age,
                    Address = model.Address,
                    Email = model.Email,
                    Active = model.Active

                })

                .ToList();

            return new ApiSuccess<Pagination<UserViewModel>> { Result = pagination};
        }

        // Get all users without pagination
        public async Task<List<ListUsernames>> GetListUsernames()
        {
            var usernameList = await _userManager.GetUsersInRoleAsync("member");
            var usernameListVMs = usernameList
                .Select(model => new ListUsernames()
                {
                    Username = model.UserName
                })
                .ToList();
            return usernameListVMs;

        }
        
        // Update thong tin user
        public bool UpdateUser(UserViewModel model, int id)
        {
            try
            {
                work.UserRepository.Entities
                    .Where(o => o.Id == id)
                    .Update(o => new User
                    {
                        FullName = model.FullName,
                        Address = model.Address,
                        PhoneNumber = model.PhoneNumber,
                        //Age = model.Age,
                        Age = DateTime.Now.Year - model.Birthday.Year,
                        BirthDay = model.Birthday,
                        Gender = model.Gender,
                        Active = model.Active

                    });
                return true;
            }
            catch (Exception)
            {

                return false;
            }
        }

        // Admin Activate/Unactivate member
        public bool UpdateMemberActive(updateActiveReq request, int memberId)
        {
            try
            {
                work.UserRepository.Entities
               .Where(o => o.Id == memberId)
               .Update(o => new User
               {
                   Active = request.isActive
               });
                return true;
            }
            catch (Exception)
            {

                return false;
            }
        }

        // Get user by id
        public UserViewModel GetUserById(int id)
        {
            var user = work.UserRepository.Entities
                        .Where(o => o.Id == id).FirstOrDefault();
            var userVM = new UserViewModel()
            {
                Id = user.Id,
                FullName = user.FullName,
                UserName = user.UserName,
                Email = user.Email,
                Address = user.Address,
                PhoneNumber = user.PhoneNumber,
                Age = user.Age,
                Birthday = user.BirthDay,
                Gender = user.Gender,
                Active = user.Active
            };
            
            return userVM;
        }

        // Filter User
        public ApiResult<Pagination<UserViewModel>>FilterUser(UserFilter filter)
        {
            var result = work.UserRepository.Entities
                .Where(o => filter.FullName == null || o.FullName.Contains(filter.FullName))
                .Where(o => filter.Active == null || o.Active == filter.Active)
                .ToList();
            var result2 = work.UserRepository.Entities
                .ToList();

            var pagination = new Pagination<UserViewModel>();

            pagination.TotalRecords = result.Count;
            pagination.PageIndex = filter.PageIndex;
            pagination.PageSize = filter.PageSize;
            pagination.Items = result
                .Skip(filter.PageSize * (filter.PageIndex - 1))
                .Take(filter.PageSize)
                .Select(model => new UserViewModel(model))
                .ToList();

            return new ApiSuccess<Pagination<UserViewModel>> { Result = pagination };
        }

        //JWT
        private string RenderAccessToken(User user, IList<string> roles, DateTime expire)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Typ, string.Join(",", roles)),
                new Claim(JwtRegisteredClaimNames.NameId, user.UserName),
                new Claim(JwtRegisteredClaimNames.Exp, expire.ToShortDateString()),
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString())
            };

            string issuer = "http://localhost:5000";
            string secretSercurityKey = "473B2693-19T5-4822-8209-8FFB97729615";
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretSercurityKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(issuer,
                issuer,
                claims,
                expires: expire, //DateTime.Now.AddDays(30),
                signingCredentials: creds);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        // Validate Email format
        public bool ValidateEmailFormat(string email)
        {
            Regex regex = new Regex(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$");
            Match match = regex.Match(email);
            if(match.Success)
            {
                return true;
            }
            return false;
        }

        // Check Password
        public async Task<ApiResult<bool>> CheckPassword(CheckPasswordVM model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);
            if(user != null && await _userManager.IsEmailConfirmedAsync(user) && user.Active == true)
            {
                var result =await _userManager.CheckPasswordAsync(user, model.Password);
                if (result == true)
                {
                    return new ApiSuccess<bool>("Password ís valid") { IsOk = true };
                }
                return new ApiError<bool>("Password is invalid") { IsOk = false };
            }
            return new ApiError<bool>("An error occurred!");
        }

        // Change Password
        public async Task<ApiResult<bool>> ChangePassword(ChangePasswordVM model, string userId)
        {
            if (model.CurrentPassword == model.NewPassword)
            {
                return new ApiError<bool>("New password and current password must be different!");
            }
            var user = await _userManager.FindByIdAsync(userId);
            if (user != null && await _userManager.IsEmailConfirmedAsync(user) && user.Active == true)
            {
                var result = await _userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);
                if (result.Succeeded)
                {
                    return new ApiSuccess<bool>("Your password has been changed!") { IsOk = true };
                }
                else if (!result.Succeeded)
                {
                    return new ApiError<bool>(result.Errors.FirstOrDefault().Description) { IsOk = false };
                }
                return new ApiError<bool>("Change password Failed!") {IsOk = false };
            }
            return new ApiError<bool>("Something went wrong, please try agian later.") { IsOk = false };

        }
    }
}
