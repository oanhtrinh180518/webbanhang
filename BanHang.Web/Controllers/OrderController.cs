using BanHang.Services.Services;
using BanHang.Services.ViewModel;
using BanHang.Services.ViewModel.Filter;
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
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly IAuthozirationUtility _utility;

        public OrderController(IOrderService orderService,
            IAuthozirationUtility utility)
        {
            _orderService = orderService;
            _utility = utility;
        }


        // Create order
        [HttpPost("create")]
        public IActionResult MakeOrder([FromBody] OrderRequest model)
        {
            model.UserId = _utility.GetUserId(HttpContext);
            if (model.UserId <= 0)
                return Unauthorized();

            var order = _orderService.Create(model);
            return Ok(order);

        }
        // Update order
        [HttpPut("update")]
        [CustomAuthorization(Policy = "admin,manager")]
        public IActionResult UpdateOrder([FromBody] OrderViewModel model)
        {
            //  get id of user was loged
            var userid = _utility.GetUserId(HttpContext);
            if (userid <= 0)
                return Unauthorized();

            var result = _orderService.Update(model);
            if (result.IsOk == true)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest(result);
            }
        }
        // User cancel orrder
        [HttpPut("cancelorder/{orderId}")]
        [CustomAuthorization(Policy = "member")]
        public IActionResult CancelOrder(int orderId)
        {
            var userid = _utility.GetUserId(HttpContext);

            if (userid <= 0)
                return Unauthorized();

            var cancelResult = _orderService.CancelOrder(orderId, userid);
            if (cancelResult.IsOk == true)
                return Ok(cancelResult);
            return BadRequest(cancelResult);

        }

        //getall order of user by userId
        [HttpGet("getuserorder")]
        public IActionResult GetAll()
        {
            var userid = _utility.GetUserId(HttpContext); // doc user id tu token
            if (userid <= 0) return Unauthorized();

            var order = _orderService.GetAll(userid);
            return Ok(order);
        }

        // get all order of all user
        [HttpPost("Getallorder")]
        [CustomAuthorization(Policy = "admin,manager")]

        public IActionResult GetAllOrder(OrderFilter filter)
        {
            var userid = _utility.GetUserId(HttpContext); // doc user id tu token
            if (userid <= 0) return Unauthorized();

            var orders = _orderService.GetAllOrder(filter);

            return Ok(orders);
        }
        
        // get order by orderId
        [HttpGet("get/{id}")]
        public IActionResult Get(int id)
        {
            var userid = _utility.GetUserId(HttpContext); // doc user id tu token
            if (userid <= 0) return Unauthorized();

            var orders = _orderService.Get(userid, id);

            return Ok(orders);
        }

        [HttpPost("ProceedsEachMonth")]
        [CustomAuthorization(Policy = "admin,manager")]

        public IActionResult ProceedsEachMonth(FilterTotalAmount filter)
        {
            var userid = _utility.GetUserId(HttpContext); // doc user id tu token
            if (userid <= 0) return Unauthorized();

            var orders = _orderService.ProceedsEachMonth(filter);

            return Ok(orders);
        }

    }
}
