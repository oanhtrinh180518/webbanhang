using BanHang.Services.Services;
using BanHang.Services.ViewModel;
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
    public class PictureController : ControllerBase
    {
        private readonly IPictureService _pictureService;

        public PictureController(IPictureService pictureService)
        {
            _pictureService = pictureService;
        }

        [HttpGet("getall")]
        public IActionResult GetAll()
        {
            var pictures = _pictureService.GetAll();
            return Ok(pictures);
        }

        [HttpPost("search")]
        public IActionResult Search([FromBody] PictureFilter filter)
        {
            var pictures = _pictureService.GetAll(filter);
            return Ok(pictures);
        }

        //  create picture
        [HttpPost("create")]
        public IActionResult CreatePicture([FromForm] PictureRequest request)
        {
            var id = _pictureService.CreateAsync(request);

            return Ok(id);
        }

        // Update one picture
        [HttpPut("update/{id}")]
        public IActionResult UpdatePicture([FromForm] PictureRequest request, int Id)
        {
            if (Id <= 0)
            {
                return BadRequest("Picture does not exist!");
            }
            var isOk = _pictureService.Update(request, Id);
            if (isOk.Result)
            {
                return Ok("Update succesfully");
            }
            else
            {
                return BadRequest("Update failed");
            }
        }

        // Delete one picture
        [HttpDelete("delete/{id}")]
        public IActionResult DeletePicture(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Supplier does not exist!");
            }
            var isOk = _pictureService.Delete(id);
            if (isOk == true)
            {
                return Ok("Delete successfully!");
            }
            else
            {
                return BadRequest("Delete failed!");
            }
        }

    }


    
}
