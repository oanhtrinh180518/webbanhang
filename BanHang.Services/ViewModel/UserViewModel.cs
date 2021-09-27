using BanHang.Data.Models;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace BanHang.Services.ViewModel
{
    public class UserViewModel
    {
        public UserViewModel() { 
        }
        public UserViewModel (User model)
        {
            FullName = model.FullName;
            UserName = model.UserName;
            Email = model.Email;
            //Age = model.Age; 
            Age = DateTime.Now.Year - model.BirthDay.Year; 
            Gender = model.Gender;
            Birthday = model.BirthDay;
            PhoneNumber = model.PhoneNumber;
            Address = model.Address;
            Active = model.Active;
            OrderCount = model.Orders.Count;
        }
        public int Id { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public int Age { get; set; }
        public DateTime Birthday { get; set; }
        public int Gender { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public bool Active { get; set; }
        public int OrderCount { get; set; }
    }
    public class UserResult : UserViewModel
    {
        public string Token { get; set; }
    }

    public class TopSpendVM : UserViewModel
    {
        public double TotalSpend { get; set; }
    }
    public class RegisterRequest
    {
        public string FullName { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }

    }

    public class ListUsernames
    {
        public string Username { get; set; }
    }
    public class updateActiveReq
    {
        public bool isActive { get; set; }
    }
    public class RegisterResult
    {
        public string Username { get; set; }
        public string Token { get; set; }
    }
    public class ResetPasswordViewModel
    {
        [Required]
        public string Token { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        [MinLength(8)]
        [MaxLength(16)]
        public string NewPassword { get; set; }

        [Required]
        [Compare("NewPassword")]
        public string ConfirmNewPassword { get; set; }

    }
    public class Login
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }

    public class UserTokenResult
    {
        public string UserName { get; set; }
        public string Token { get; set; }
    }

    public class CheckPasswordVM
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class ChangePasswordVM
    {
        [Required]
        public string CurrentPassword { get; set; }

        [Required]
        [MinLength(8)]
        [MaxLength(16)]
        public string NewPassword { get; set; }

        [Required]
        [Compare("NewPassword")]
        public string ConfirmNewPassword { get; set; }
    }

    // Validate Register Request
    public class RegisterRequestValidator : AbstractValidator<RegisterRequest>
    {
        public RegisterRequestValidator()
        {
            RuleFor(x => x.UserName).NotEmpty().WithMessage("Username is required");
            //.Matches(@"^\S*$/").WithMessage("Username is invalid!");


            RuleFor(x => x.Email).NotEmpty().WithMessage("Email Is Require")
                .Matches(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$")
                .WithMessage( "Email is invalid!");

            RuleFor(x => x.Password).NotEmpty().WithMessage("Password can not empty")
                .MinimumLength(8)
                .MaximumLength(16)
                .WithMessage("Password must be between 8 and 16 characters long")
                .Matches(@"^.*(?=.{8})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@]).*$")

                .WithMessage("Password must contain at least one uppercase (A-Z)," +
                    " least one lowercase (a-z), least one number (0-9), and @ character.");

            //RuleFor(x => x.PhoneNumber).NotEmpty().WithMessage("Phone number can not empty!")
            //    .Matches(@"^[0][1-9]\d{8}$|^[1-9]\d{8}$")
            //    .WithMessage("Phone number is invalid!");

            RuleFor(x => x).Custom((request, context) =>
            {
                if (request.Password != request.ConfirmPassword)
                {
                    context.AddFailure("Xác nhận mật khẩu không đúng");
                }
            });
        }
    }
}
