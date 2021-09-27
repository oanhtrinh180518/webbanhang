using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace BanHang.Services.ViewModel
{
    public class ForgotPaswordViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
