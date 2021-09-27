using BanHang.Services.Services;
using BanHang.Services.ViewModel;
using BanHang.Services.ViewModel.Filter;
using BanHang.Web.Attributes;
using DARS.WebAPI.Utility;
using Microsoft.AspNetCore.Http;

using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BanHang.Web.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICartSevice _cartService;
        private readonly IAuthozirationUtility _utility; // xuong cho phan login de add to cart
        public CartController(ICartSevice cartService, IAuthozirationUtility utility)

        {
            _cartService = cartService;
            _utility = utility;

        }
        [HttpPost("getall")]
        public IActionResult GetAll([FromBody] BaseFilter filter)
        {
            var userid = _utility.GetUserId(HttpContext); // doc user id tu token
            if (userid <= 0) return Unauthorized();
            var cart = _cartService.GetAll(filter,userid);
            return Ok(cart);
        }

        // create new cart
        [HttpPost("create")]
        public IActionResult CreateCart([FromBody] CartViewModel model)
        {
            var userId = _utility.GetUserId(HttpContext); // doc user id tu token
            if (userId <= 0) 
            return Unauthorized();

            var id = _cartService.Create(model, userId);

            return Ok(id);
        }

        [HttpDelete("delete/{id}")]
        [CustomAuthorization(Policy = "member")]
        public IActionResult DeleteCart(int id)
        {
            var userId = _utility.GetUserId(HttpContext); // doc user id tu token
            if (userId <= 0)
                return Unauthorized();

            if (id <= 0)
            {
                return BadRequest("Cart does not exist!");
            }
            var isOk = _cartService.Delete(userId, id);
            if (isOk == true)
            {
                return Ok("Cart has been deleted!");
            }
            else
            {
                return BadRequest("Delete failed!");
            }

        }
        [HttpDelete("deleteall")]
        [CustomAuthorization(Policy = "member")]
        public IActionResult DeleteAll()
        {
            var userId = _utility.GetUserId(HttpContext); // doc user id tu token
            if (userId <= 0)
                return Unauthorized();

            
            var isOk = _cartService.DeleteAll(userId);
            if (isOk == true)
            {
                return Ok("Cart has been deleted!");
            }
            else
            {
                return BadRequest("Delete failed!");
            }

        }

        [HttpPut("updateplus")]
        [CustomAuthorization(Policy = "member")]
        public IActionResult UpdateCart([FromBody] CartViewModel model)
        {
            var userId = _utility.GetUserId(HttpContext); // doc user id tu token
            if (userId <= 0)
                return Unauthorized();

            var isOk = _cartService.UpdatePlus(model, userId);
            return Ok(isOk);
        }
        [HttpPut("update")]
        [CustomAuthorization(Policy = "member")]
        public IActionResult Update([FromBody] CartViewModel model)
        {
            var userId = _utility.GetUserId(HttpContext); // doc user id tu token
            if (userId <= 0)
                return Unauthorized();

            var isOk = _cartService.Update(model, userId);
            return Ok(isOk);
        }

        [HttpPost("addtocart")]
        [CustomAuthorization(Policy = "member")]
        public IActionResult AddToCart([FromBody] CartViewModel model)
        {
            var userId = _utility.GetUserId(HttpContext); // doc user id tu token
            if (userId <= 0)
                return Unauthorized();
            var isOk = _cartService.AddToCart(model, userId);
            return Ok(isOk);
        }
    }
}
