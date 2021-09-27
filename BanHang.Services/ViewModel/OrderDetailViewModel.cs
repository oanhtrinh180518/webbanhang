using BanHang.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BanHang.Services.ViewModel
{
    public class OrderDetailViewModel
    {
        public OrderDetailViewModel() { }
        public OrderDetailViewModel(OrderDetail o) 
        {
            Id = o.Id;
            ProductId = o.ProductId;

            OrderId = o.OrderId;
            Quantity = o.Quantity;
            TotalAmount = o.TotalAmount;


        }
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int OrderId { get; set; }
        public int Quantity { get; set; }
        public double TotalAmount { get; set; }
        public ProductInOrder Product { get; set; }
    }
}
