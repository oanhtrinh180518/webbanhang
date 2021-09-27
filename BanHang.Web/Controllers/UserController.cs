using BanHang.Data.Models;
using BanHang.Services.Services;
using BanHang.Services.ViewModel;
using BanHang.Services.ViewModel.Filter;
using BanHang.Web.Attributes;
using DARS.WebAPI.Utility;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BanHang.Web.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IAuthozirationUtility _utility;

        public UserController(IUserService userService, IAuthozirationUtility utility)
        {
            _userService = userService;
            _utility = utility;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest model)
        {

            string confirmationLink = Url.Action("ConfirmEmail", "User");
            var userVM = await _userService.RegisterAsync(model, confirmationLink);
            // tryen them link
            if (userVM.IsOk == false)
            {
                return BadRequest(userVM);
            }
            return Ok(userVM);
        }

        [HttpPost("admin-register")]
        public async Task<IActionResult> AdminRegister([FromBody] RegisterRequest model)
        {

            var confirmationLink = Url.Action("ConfirmEmail", "Admin");
            var userVM = await _userService.AdminRegisterAsync(model, confirmationLink);
            // tryen them link
            if(userVM.IsOk == false)
            {
                return BadRequest(userVM);
            }
            return Ok(userVM);
        }

        // Login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Login model)
        {
            var userVM = await _userService.LoginAsync(model);
            if (userVM.IsOk == false)
            {
                return BadRequest(userVM);
            }
            return Ok(userVM);
        }

        // Confirm Email
        [HttpGet("confirmemail")]
        public async Task<IActionResult> ConfirmEmail(string token, string email)
        {
            var isConfirm = await _userService.ConfirmEmail(token, email);
            if (isConfirm == false)
                return BadRequest("Confirm email failed!");

            return Ok("Confirm email successfully!");
        }


        // Forgot password
        [HttpPost("forgotpassword")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPaswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Error!");
            }
            var passwordResetLink = Url.Action("ResetPassword", "User");
            var result = await _userService.ForgetPasswordAsync(model, passwordResetLink);
            if (result.IsOk == true) 
            {
                return Ok(result);
            };
            return BadRequest(result);
        }

        // Reset password
        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordViewModel model)
        {
            var result =  await _userService.ResetPasswordAsync(model);
            if (result.IsOk == true)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

        // Get all member
        [HttpPost("getall")]
        [CustomAuthorization(Policy = "admin")]
        public async Task<IActionResult> GetAllUserAsync([FromBody] UserFilter filter)
        {
            var userid = _utility.GetUserId(HttpContext); // doc user id tu token
            if (userid <= 0)
                return Unauthorized();

            var users = await _userService.GetUsersAsync(filter);
            return Ok(users);
        }

        // Get all member without pagination
        [HttpGet("getallusernames")]
        [CustomAuthorization(Policy = "admin")]
        public async Task<IActionResult> GetAllUsernames()
        {
            var userId = _utility.GetUserId(HttpContext);
            if(userId <= 0)
            
                return Unauthorized();

            var usernames = await _userService.GetListUsernames();
            return Ok(usernames);
            
        }


        [HttpPost("filter")]
        [CustomAuthorization(Policy = "admin,manager")]
        // Get user by filter
        public IActionResult GetAll([FromBody] UserFilter filter)
        {
            var users = _userService.FilterUser(filter);
            return Ok(users);
        }

        // Gett user by token
        [HttpGet("getuserbytoken")]
        public IActionResult GetUserByToken()
        {
            var userid = _utility.GetUserId(HttpContext); // doc user id tu token
            if (userid <= 0) return Unauthorized();

            var user = _userService.GetUserById(userid);
            return Ok(user);
        }
        
        // Gett user by id
        [HttpPost("getuserbyid")]
        [CustomAuthorization(Policy = "admin")]
        public IActionResult GetUserById([FromBody]int id)
        {
            var userid = _utility.GetUserId(HttpContext);
            if (userid <= 0) return Unauthorized();

            var user = _userService.GetUserById(id);
            return Ok(user);
        }

        // Member Update information
        [HttpPut("update")]
        public  IActionResult UpdateUser([FromBody] UserViewModel model)
        {
            //  get id of user was loged
            var userid = _utility.GetUserId(HttpContext);

            if (userid <= 0)
                return Unauthorized();

            var isOk = _userService.UpdateUser(model, userid);
            if (isOk == true)
            {
                return Ok("Update sucessfully!");
            } else
            {
                return BadRequest("Update failed!");
            }
        }

        // Admin deactivate/activate member
        [HttpPut("adminactive/{memberId}")]
        [CustomAuthorization(Policy = "admin")]
        public IActionResult UpdateMemberActive([FromBody]updateActiveReq request, int memberId)
        {
            var userId = _utility.GetUserId(HttpContext);
            if (userId <= 0)
                return Unauthorized();

            var isSuccess = _userService.UpdateMemberActive(request, memberId);
            if(isSuccess == true)
            {
                return Ok("Thành công!");
            } 
            return BadRequest(" Thất bại!");
        }
          
        // Change password
        [HttpPost("change-password")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordVM model)
        {
            var userId = _utility.GetUserId(HttpContext);
            if (userId <= 0)
                return Unauthorized();
            string strUserId = userId.ToString();
            var result = await _userService.ChangePassword(model, strUserId);
            if (result.IsOk == true)
            {
                return Ok(result);
            }
            return BadRequest(result);
        }

    }
}
