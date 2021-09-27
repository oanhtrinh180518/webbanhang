using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BanHang.Services.Services;
using DARS.WebAPI.Utility;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace BanHang.Web.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IAuthozirationUtility _utility;
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, IUserService userService ,IAuthozirationUtility utility)
        {
            _logger = logger;
            _userService = userService;
            _utility = utility;
        }

        [HttpGet("test")]
        public IActionResult Get()
        {
            var userid = _utility.GetUserId(HttpContext);
            
            
            if (userid <= 0)
                return Unauthorized();

            return Ok(userid);
        }
    }
}
