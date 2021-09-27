using BanHang.Data.Models;
using BanHang.Services.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BanHang.Services.ViewModel;


namespace BanHang.Web.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet("getall")]
        public IActionResult GetAll()
        {
            var categories = _categoryService.GetAll();
            return Ok(categories);
        }

        [HttpGet("getById/{id}")]
        public IActionResult Get(int id)
        {
            var category = _categoryService.Get(id);
            return Ok(category);
        }

        [HttpPost("create")]
        public IActionResult CreateCategory([FromBody] CategoryViewModel model)
        {
            var id = _categoryService.Create(model);
            return Ok(id);
        }

        [HttpDelete("delete/{id}")]
        public IActionResult DeleteCategory(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Category does not exist!");
            }
            var isOk = _categoryService.Delete(id);
            if (isOk == true)
            {
                return Ok("Category has been deleted!");
            }
            else
            {
                return BadRequest("Delete failed!");
            }

        }
        [HttpPut("update/{id}")]
        public IActionResult UpdateCategory([FromBody] CategoryViewModel model,int Id) 
        {
            if (Id <= 0)
            {
                return BadRequest("Category does not exist!");
            }
            var isOk = _categoryService.Update(model,Id);
            if (isOk == true)
            {
                return Ok("Category has been update!");
            }
            else
            {
                return BadRequest("Update failed!");
            }

        }
    }
}
