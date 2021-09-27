using BanHang.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BanHang.Services.ViewModel
{
    public class OrderViewModel
    {
        public OrderViewModel() { }
        public OrderViewModel(Order o)
        {
            Id = o.Id;
            UserId = o.UserId;
            Status = o.Status;
            CreateDate = o.CreateDate;
            Address = o.Address;
            ShipDate = o.ShipDate;
            Phone = o.Phone;
            TotalPrice = o.TotalPrice;
            UserName = o.User?.UserName;
        }
        public int Id { get; set; }
        public int UserId { get; set; }
        public int Status { get; set; }
        public DateTime CreateDate { get; set; }
        public string Address { get; set; }
        public DateTime? ShipDate { get; set; }
        public string Phone { get; set; }
        public double TotalPrice { get; set; }
        public string UserName { get; set; }

        public List<OrderDetailViewModel> OrderDetails { get; set; }
    }
    public class OrderRequest
    {
        public int UserId { get; set; }
        public string Address { get; set; }
        public DateTime ShipDate { get; set; }
        public string Phone { get; set; }
        public List<ProductDetail> Products { get; set; }
    }
    public class ProductDetail
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }

    public class FilterTotalAmount
    {
        public int Year { get; set; }
    }
    public class TotalAmount
    {
        public int Month { get; set; }
        public double Total { get; set; }
        public TotalAmount() { }
        public TotalAmount(int month, double total)
        {
            Month = month;
            Total = total;
        }
    }

}
