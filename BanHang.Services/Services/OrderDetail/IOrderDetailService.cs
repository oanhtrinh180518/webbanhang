using BanHang.Services.ViewModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace BanHang.Services.Services
{
    public interface IOrderDetailService
    {
        List<OrderDetailViewModel> GetAll();
        OrderDetailViewModel Get(int id);
        int Create(OrderDetailViewModel model);
        bool Delete(int id);
        bool Update(OrderDetailViewModel model, int Id);
    }
}
