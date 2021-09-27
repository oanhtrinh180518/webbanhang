using BanHang.Data.Models;
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
    public class SupplierController : ControllerBase
    {
        private readonly ISupplierService _supplierService;

        public SupplierController(ISupplierService supplierService)
        {
            _supplierService = supplierService;
        }

        // get all supplier
        [HttpGet("getAll")]
        public IActionResult GetAll()
        {
            var supplier = _supplierService.GetAll();
            return Ok(supplier);
        }

        //  create supplier
        [HttpPost("create")]
        public IActionResult CreateSupplier([FromBody] SupplierViewModel model)
        {
            var id = _supplierService.Create(model);
            return Ok(id);
        }

        // Update one supplier
        [HttpPut("update/{id}")]
        public IActionResult UpdateSupplier([FromBody] SupplierViewModel model,int Id)
        {
            var isOk = _supplierService.Update(model,Id);
            if (isOk == true)
            {
                return Ok("Update succesfully");
            }
            else
            {
                return BadRequest("Update failed");
            }
        }

        // Delete one supplier
        [HttpDelete("delete/{id}")]
        public IActionResult DeleteSupplier(int id)
        {
            if(id <= 0)
            {
                return BadRequest("Supplier does not exist!");
            }
            var isOk = _supplierService.Delete(id);
            if(isOk == true)
            {
                return Ok("Delete successfully!");
            } else
            {
                return BadRequest("Delete failed!");
            }
        }
    }
}
