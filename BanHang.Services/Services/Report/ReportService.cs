using BanHang.Data.Models;
using BanHang.Data.Repository;
using BanHang.Services.ViewModel;
using BanHang.Services.ViewModel.Filter;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BanHang.Services.Services
{
    public class ReportService : IReportService
    {
        private readonly UnitOfWork work;
        private readonly UserManager<User> _userManager;
        private readonly IOrderService _orderService;

        public ReportService(
            UserManager<User> userManager,
            IOrderService orderService)
        {
            // Khoi tao work
            work = UnitOfWork.GetDefaultInstance();
            _userManager = userManager;
            _orderService = orderService;
        }

        // get top user spend most money
        public List<UserViewModel> GetTopUsersMakeOrder()
        {
            var topUserVms = work.UserRepository.Entities
                .Include(o => o.Orders)
                .Select(o => new UserViewModel()
                {
                    Id = o.Id,
                    UserName = o.UserName,
                    PhoneNumber = o.PhoneNumber,
                    Email = o.Email,
                    OrderCount = o.Orders.Count,
                })
                .OrderByDescending(o => o.OrderCount)
                .Take(4)
                .ToList();
            return topUserVms;
        }

        // get all order without pagination
        public List<OrderViewModel> GetAllOrder()
        {
            var allOrders = work.OrderRepository.Entities
                .Select(o => new OrderViewModel(o)
                {
                    OrderDetails = o.OrderDetails
                    .Select(o => new OrderDetailViewModel(o)
                    {
                        Product = new ProductInOrder
                        {
                            Name = o.Product.Name,
                            UnitPrice = o.Product.UnitPrice
                        }
                    }).ToList()
                })
                .ToList();
            return allOrders;
        }

        public List<TopSpendVM> GetTopSpendMoney()
        {
            var topUserVms = work.UserRepository.Entities
                .Include(o => o.Orders)
                .Select(o => new TopSpendVM()
                {
                    Id = o.Id,
                    UserName = o.UserName,
                    PhoneNumber = o.PhoneNumber,
                    Email = o.Email,
                    TotalSpend = o.Orders.Sum(o => o.TotalPrice),
                    FullName = o.FullName
                })
                .OrderByDescending(o => o.TotalSpend)
                .Take(3)
                .ToList();
            return topUserVms;
        }

        // get alll user wihput pagination
        public List<UserViewModel> GetListUsers()
        {
            var listUser = work.UserRepository.Entities
                .Select(o => new UserViewModel() {
                    Id = o.Id,
                    Active = o.Active
                })
                .ToList();

            return listUser;
        }

        public List<ProductViewModel> GetListProducts()
        {
            var listProducts = work.ProductRepository.Entities
                .Where(o => o.Status == 1)
                .Select(o => new ProductViewModel()
                {
                    Id = o.Id,
                })
                .ToList();

            return listProducts;
        }

    }
}
