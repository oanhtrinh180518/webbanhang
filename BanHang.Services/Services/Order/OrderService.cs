using BanHang.Data.Models;
using BanHang.Data.Repository;
using BanHang.Services.Define;
using BanHang.Services.ViewModel;
using BanHang.Services.ViewModel.Filter;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Z.EntityFramework.Plus;
using Microsoft.EntityFrameworkCore;

namespace BanHang.Services.Services
{

    public class OrderService: IOrderService
    {
        private readonly UnitOfWork work;
        private readonly IProductService _productService;
        private readonly IOrderDetailService _orderDetailService;
        private readonly ICartSevice _cartSevice;
        public OrderService(IProductService productService,
            IOrderDetailService orderDetailService,
            ICartSevice cartSevice)
        {
            // Khoi tao work
            work = UnitOfWork.GetDefaultInstance();
            _productService = productService;
            _orderDetailService = orderDetailService;
            _cartSevice = cartSevice;
        }

        // View personal orders                                    
        public List<OrderViewModel> GetAll(int userid)
        {
            var ordersVMs = work.OrderRepository.Entities
                .Include(o => o.User)
                .Where(o => o.UserId == userid)
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
            return ordersVMs;
        }

        // get order by id
        public OrderViewModel Get(int id)
        {
            var orders = work.OrderRepository.Entities
                .Include(o => o.User)
                .Where(o => o.Id == id).FirstOrDefault();
            var orderViewModel = new OrderViewModel(orders);
            return orderViewModel;
        }

        // Lay ra order vua duoc tao
        public ApiResult<OrderViewModel> Get(int userid, int id)
        {
            try
            {
                var order = work.OrderRepository.Entities
                .Include(o => o.User)
                .Include(o => o.OrderDetails).ThenInclude(o => o.Product)
                .Where(o => o.UserId == userid)
                .Where(o => o.Id == id).FirstOrDefault();

                var orderVM = new OrderViewModel(order);

                orderVM.OrderDetails = order.OrderDetails
                    .Select(o => new OrderDetailViewModel(o)
                    {
                        Product = new ProductInOrder
                        {
                            Name = o.Product.Name,
                            UnitPrice = o.Product.UnitPrice
                        }


                    }).ToList();

                return new ApiResult<OrderViewModel> { Result = orderVM };
            }
            catch (Exception)
            {

                return new ApiError<OrderViewModel>("Order is not exist!");
            }
            
        }

        // Create order from cart
        public ApiResult<OrderViewModel> Create(OrderRequest request)
        {
            // check available quantity
            foreach(var product in request.Products)
            {
                var availableQuantity = _productService.GetById(product.ProductId).AvailableQuantity;
                if (product.Quantity > availableQuantity)
                    return new ApiError<OrderViewModel>("Product quantity is larger" +
                        " than the number of products in stock");
            }
            if(request.Products.Count <= 0)
            {
                return new ApiError<OrderViewModel>("Create order failed!");
            }

            var order = new Order()
            {
                UserId = request.UserId,
                Status = (int)eStatus.prepare,
                CreateDate = DateTime.Now,
                Address = request.Address,
                ShipDate = DateTime.Now.AddDays(3),
                Phone = request.Phone,
                
            };
            var orderId = work.OrderRepository.Create(order);

            // Make OrderDetail
            foreach(var product in request.Products)
            {
                _orderDetailService.Create(new OrderDetailViewModel
                {
                    OrderId = orderId,
                    ProductId = product.ProductId,
                    Quantity = product.Quantity,
                    TotalAmount = _productService.GetById(product.ProductId).UnitPrice * product.Quantity
                });
            }
            // xoa cart
            foreach (var product in request.Products)
            {
                _cartSevice.Delete(request.UserId,product.ProductId);
            }


            return new ApiSuccess<OrderViewModel>
                ("Create Order successfully!")
                { Result = new OrderViewModel(order ) };
        }

        // Admin update order
        public ApiResult<bool> Update(OrderViewModel model)
        {
            
            if (model.ShipDate == null)
            {
                return new ApiError<bool>("Cập nhật đơn hàng thất bại") { Result = false };
            }
            try
            {
                var res = work.OrderRepository;
                var order = res.Entities
                    .Include(o => o.OrderDetails)
                    .Where(o => o.Id == model.Id).FirstOrDefault();

                var numOfRows = work.OrderRepository.Entities
                //.Where(o => o.UserId == model.UserId)
                .Include(o => o.OrderDetails)
                .Where(o => o.Id == model.Id)
                .Update(o => new Order
                    {
                        Status = model.Status,
                        ShipDate = (DateTime)model.ShipDate,
                    }
                );
                if (numOfRows > 0 && model.Status == 0)
                {
                    foreach (var i in order.OrderDetails)
                    {
                        var product = work.ProductRepository.Entities
                        .FirstOrDefault(o => o.Id == i.ProductId);

                        work.ProductRepository.Entities
                        .Where(o => o.Id == i.ProductId)
                        .Update(o => new Product
                        {
                            AvailableQuantity = product.AvailableQuantity + i.Quantity
                        });
                    }
                    return new ApiSuccess<bool>("Hủy đơn hàng thành công") { Result = true };
                }
                return new ApiSuccess<bool>("Cập nhật đơn hàng thành công") {Result = true };
            }
            catch (Exception)
            {
                return new ApiError<bool>("Cập nhật đơn hàng thất bại") { Result = false };
            }
        }

        // User Update Order
        public ApiResult<bool> CancelOrder(int orderId , int userId)
        {
            try
            {
                var res = work.OrderRepository;
                var order = res.Entities
                    .Include(o => o.OrderDetails)
                    .Where(o => o.UserId == userId)
                    .Where(o => o.Id == orderId).FirstOrDefault();
                if (order.Status == 0 || order.Status == 4 || order.Status ==3)
                {
                    return new ApiError<bool>("Hủy đơn hàng thất bại!") { Result = false };
                }

                var sss = res.Entities
                    .Where(o => o.Id == order.Id)
                    .Update(o => new Order
                    {
                        Status = 0
                    }
                );

                if (sss > 0)
                {
                    foreach (var i in order.OrderDetails)
                    {
                        var product = work.ProductRepository.Entities
                        .FirstOrDefault(o => o.Id == i.ProductId);

                        work.ProductRepository.Entities
                        .Where(o => o.Id == i.ProductId)
                        .Update(o => new Product
                        {
                            AvailableQuantity = product.AvailableQuantity + i.Quantity
                        });
                    }
                    return new ApiSuccess<bool>("Hủy đơn hàng thành công") { Result = true };

                }
                return new ApiSuccess<bool>("Hủy đơn hàng thành công") { Result = true };
            }
            catch (Exception e)
            {
                return new ApiError<bool>("Hủy đơn hàng thất bại!") { Result = false };
            }
        }
        // Admin View All order and seacrh
        public ApiResult<Pagination<OrderViewModel>> GetAllOrder(OrderFilter filter)
        {
            var orderVMs = work.OrderRepository.Entities
                .Include(o => o.User)
                .Where(o => filter.Status == null || o.Status == filter.Status)
                .Where(o => filter.UserId == null || o.UserId == filter.UserId)
                .Where(o => filter.UserName == null || o.User.UserName.Contains(filter.UserName))
                .Where(o => filter.FromDate == null || o.CreateDate >= filter.FromDate)
                .Where(o => filter.ToDate == null || o.CreateDate < filter.ToDate)
                .OrderBy(o=>o.CreateDate)
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

            //var orderVMs = new List<OrderViewModel>(orders);


            var pagination = new Pagination<OrderViewModel>();
            pagination.TotalRecords = orderVMs.Count;
            pagination.PageIndex = filter.PageIndex;
            pagination.PageSize = filter.PageSize;
            pagination.Items = orderVMs
                .Skip(filter.PageSize * (filter.PageIndex - 1))
                .Take(filter.PageSize)
                .ToList();

            return new ApiSuccess<Pagination<OrderViewModel>> { Result = pagination };
        }

        public ApiResult<List<TotalAmount>> ProceedsEachMonth(FilterTotalAmount filter)
        {
            var TotalAmounts = new List<TotalAmount>();

            for (int i = 1; i <= 12; i++)
            {
                var orderVMs = work.OrderRepository.Entities
                .Where(o => o.ShipDate.Month == i)
                .Where(o => filter.Year == 0 || o.ShipDate.Year == filter.Year)
                .Where(o => o.Status == 4)
                   .Select(o => new OrderViewModel(o))
                   .ToList();

                double totalAmount = 0;
                foreach (var order in orderVMs)
                {
                    totalAmount += order.TotalPrice;
                }
                TotalAmount p = new TotalAmount(i, totalAmount);
                TotalAmounts.Add(p);
            }

            return new ApiSuccess<List<TotalAmount>> { Result = TotalAmounts };
        }
    }

}
