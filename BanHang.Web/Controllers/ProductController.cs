using BanHang.Services.Services;
using BanHang.Services.ViewModel;
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
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly IAuthozirationUtility _utility;

        public ProductController(IProductService productService, IAuthozirationUtility utility)
        {
            _productService = productService;
            _utility = utility;
        }


        // Get all products
        [HttpPost("search")]
        public IActionResult GetAll([FromBody] ProductFilter filter)
        {
            var products = _productService.GetAll(filter);

            return Ok(products);
        }
		// Get all products user
        [HttpPost("search-admin")]
        public IActionResult GetAllAdmin([FromBody] ProductFilter filter)
        {
            var products = _productService.GetAllAdmin(filter);
            return Ok(products);
        }								
        [HttpGet("getbyProductId/{productId}")]
        public IActionResult GetbyProductId(int productId)
        {
            var products = _productService.GetById(productId);

            return Ok(products);
        }
        // Get all products by rate
        //[HttpPost("getbyrate")]
        //public IActionResult GettByRate([FromBody] ProductViewModel model)
        //{
        //    var products = _productService.GettByRate(model);

        //    return Ok(products);
        //}
        // create new product
        [HttpPost("create")]
        public IActionResult CreateProduct([FromForm] ProductRequest model)
        {
            model.UserId = _utility.GetUserId(HttpContext);
            if (model.UserId <= 0)
                return Unauthorized(); // user o ton tai

            var id = _productService.Create(model);
            return Ok(id);
            //return Ok(id);
        }

        // Get all products user
        //[HttpPost("search-admin")]
        //public IActionResult GetAllAdmin([FromBody] ProductFilter filter)
        //{
        //    var products = _productService.GetAllAdmin(filter);
        //    return Ok(products);
        //}

        // Update one product
        [HttpPut("update")]
        public IActionResult UpdateProduct([FromForm] ProductViewModel model)
        {
            var isOk = _productService.Update(model);
            if (isOk.Result == true)
            {
                return Ok("Update successfully!");
            }
            else
            {
                return BadRequest("Update failed");
            }
        }
        // Update status product
        [HttpPut("updatestatus")]
        public IActionResult UpdateStatus([FromBody] ProductStatus fliter)
        {
            var isOk = _productService.UpdateStatus( fliter);
            if (isOk == true)
            {
                return Ok("Update successfully!");
            }
            else
            {
                return BadRequest("Update failed");
            }
        }
        // Delete one product
        [HttpDelete("delete/{id}")]
        public IActionResult DeleteProduct(int id)
        {
            var UserId = _utility.GetUserId(HttpContext);
            if (UserId <= 0)
                return Unauthorized();
            if (id <= 0)
            {
                return BadRequest("Product does not exist!");
            }

            var isOk = _productService.Delete(id);
            if (isOk == true)
            {
                return Ok("Product has been deleted!");
            }
            else
            {
                return BadRequest("Delete failed!");
            }
        }
        //Delete soft a product
        [HttpPut("deleteSoft/{id}")]
        public IActionResult DeleteSoft(int Id)
        {
            var isOk = _productService.SoftDelete(Id);
            if (isOk == true)
            {
                return Ok("Update successfully!");
            }
            else
            {
                return BadRequest("Update failed");
            }
        }

        [HttpPost("getbestsellingorder")]
        public IActionResult GetBestSellingOrder([FromBody] ProductViewModel model)
        {
            var bestSellingProduct = _productService.GetBestSellingProduct(model);

            return Ok(bestSellingProduct);
        }
		[HttpGet("getweight")]
        public IActionResult GetWeight()
        {
            var weights = _productService.GetWeight();

            return Ok(weights);
        }

    }
}
