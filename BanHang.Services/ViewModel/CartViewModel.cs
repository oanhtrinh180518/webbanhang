using BanHang.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BanHang.Services.ViewModel
{
    public class CartViewModel
    {
        public CartViewModel() { }

        public ProductViewModel product;
        public CartViewModel(Cart model)
        {
           UserId = model.UserId;
            ProductId = model.ProductId;
            Quantity = model.Quantity;


        }
        
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public string ProductName { get; set; }
        public double UnitPrice { get; set; }
        public List<PictureViewModel> Pictures { get; set; }
        public int? AvailableQuantity { get; set; }
    }
}
