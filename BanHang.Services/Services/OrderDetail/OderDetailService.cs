using BanHang.Data.Models;
using BanHang.Data.Repository;
using BanHang.Services.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Z.EntityFramework.Plus;

namespace BanHang.Services.Services
{
    public class OderDetailService:IOrderDetailService
    {
        private readonly UnitOfWork work;
        public OderDetailService()
        {
            // Khoi tao work
            work = UnitOfWork.GetDefaultInstance();
        }

        // ge
        public List<OrderDetailViewModel> GetAll()
        {
            var orderDetails = work.OrderDetailRepository.NoTrackingEntities.ToList();
            var orderDetailViewModel = orderDetails
                .Select(model => new OrderDetailViewModel(model))
                .ToList();
            return orderDetailViewModel;
        }
        // get product by id
        public OrderDetailViewModel Get(int id)
        {
            var orderDetails = work.OrderDetailRepository.NoTrackingEntities.Where(o => o.Id == id).FirstOrDefault();
            var orderDetailViewModel = new OrderDetailViewModel(orderDetails);
            return orderDetailViewModel;
        }

        // Create OrderDetail
        public int Create(OrderDetailViewModel model)
        {
            var newOrderDetail = new OrderDetail()
            {
                ProductId = model.ProductId,
                OrderId = model.OrderId,
                Quantity = model.Quantity
            };
            var id = work.OrderDetailRepository.Create(newOrderDetail);
            return id;
        }
        public bool Delete(int id)
        {
            try
            {
                work.OrderDetailRepository.Entities
                    .Where(o => o.Id == id)
                    .Delete();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool Update(OrderDetailViewModel model, int Id)
        {
            try
            {
                work.OrderDetailRepository.Entities
                    .Where(o => o.Id == Id)
                    .Update(o => new OrderDetail
                    {
                        ProductId = model.ProductId,
                        OrderId = model.OrderId,
                        Quantity = model.Quantity
                    }
                    );
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
