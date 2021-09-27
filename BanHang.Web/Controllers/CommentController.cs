using BanHang.Services.Services;
using BanHang.Services.ViewModel;
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
    public class CommentController : ControllerBase
    {
        private readonly ICommentService _commentService;
        private readonly IAuthozirationUtility _utility;
        public CommentController(ICommentService commentService, IAuthozirationUtility utility)
        {
            _commentService = commentService;
            _utility = utility;
        }
        //get all by ProductId
        [HttpGet("getall/{productId}")]
        public IActionResult GetAll(int productId)
        {
            var comments = _commentService.GetAll(productId);
            return Ok(comments);
        }
        [HttpGet("getId/{id}")]
        public IActionResult Get(int id)
        {
            var comment = _commentService.Get(id);
            return Ok(comment);
        }
        [HttpPost("create")]
        [CustomAuthorization(Policy = "member")]

        public IActionResult Create([FromBody] CommentViewModel model)
        {
            var userId = _utility.GetUserId(HttpContext);
            var id = _commentService.Create(model,userId);
            return Ok(id);
        }
       
    }
}
