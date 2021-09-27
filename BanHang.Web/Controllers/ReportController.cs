using BanHang.Services.Services;
using BanHang.Web.Attributes;
using DARS.WebAPI.Utility;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BanHang.Web.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private readonly IReportService _reportService;
        private readonly IAuthozirationUtility _utility;
        private readonly IUserService _userService;



        public ReportController(IReportService reportService,
            IAuthozirationUtility utility,
            IUserService userService)
        {
            _reportService = reportService;
            _utility = utility;
            _userService = userService;
        }


        // top users spend money
        [HttpGet("get-topusers-makeorder")]
        [CustomAuthorization(Policy = "admin")]
        public IActionResult GetTopUserMakeOrder()
        {
            var userId = _utility.GetUserId(HttpContext);
            if (userId <= 0) return Unauthorized();

            try
            {
                var topUsers = _reportService.GetTopUsersMakeOrder();
                return Ok(topUsers);
            }
            catch (Exception)
            {

                return BadRequest("Có lỗi xảy ra");
            }
        }

        // get all orders without pagination
        [HttpGet("getallorder")]
        [CustomAuthorization(Policy = "admin")]
        public IActionResult GetAllOrderWithoutPagi()
        {
            var userId = _utility.GetUserId(HttpContext);
            if (userId <= 0) return Unauthorized();

            try
            {
                var allOrders = _reportService.GetAllOrder();
                return Ok(allOrders);
            }
            catch (Exception)
            {

                return BadRequest("Có lỗi xảy ra");
            }
        }

        // get top users spend money
        [HttpGet("gettopspendmoney")]
        [CustomAuthorization(Policy = "admin")]
        public IActionResult GetTopSpendMoney()
        {
            var userId = _utility.GetUserId(HttpContext);
            if (userId <= 0) return Unauthorized();

            try
            {
                var topUsers = _reportService.GetTopSpendMoney();
                return Ok(topUsers);
            }
            catch (Exception)
            {
                //throw;
                return BadRequest("Có lỗi xảy ra");
            }
        }

        [HttpGet("getlistusers")]
        [CustomAuthorization(Policy = "admin")]
        public IActionResult GetListUser()
        {
            var userId = _utility.GetUserId(HttpContext);
            if (userId <= 0) return Unauthorized();

            try
            {
                var listUsers = _reportService.GetListUsers();
                return Ok(listUsers);
            }
            catch (Exception)
            {

                return BadRequest("Có lỗi xảy ra");
            }
        }

        [HttpGet("getlistproducts")]
        [CustomAuthorization(Policy = "admin")]
        public IActionResult GetListProducts()
        {
            var userId = _utility.GetUserId(HttpContext);
            if (userId <= 0) return Unauthorized();

            try
            {
                var listProducts = _reportService.GetListProducts();
                return Ok(listProducts);
            }
            catch (Exception)
            {

                return BadRequest("Có lỗi xảy ra");
            }
        }

        //[HttpGet("get-soldqty-eachcategory")]
        //[CustomAuthorization(Policy = "admin")]
        //public IActionResult GetSoldQtyEachCategory()
        //{
        //    var userId = _utility.GetUserId(HttpContext);
        //    if (userId <= 0) return Unauthorized();

        //    try
        //    {
        //        var list = _reportService.GetSoldQtyEachCategory();
        //        return Ok(list);
        //    }
        //    catch (Exception)
        //    {
        //        //throw;
        //        return BadRequest("Có lỗi xảy ra");
        //    }
        //} 
    }
}
