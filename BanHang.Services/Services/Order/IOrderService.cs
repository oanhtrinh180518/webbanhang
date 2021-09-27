using BanHang.Services.ViewModel;
using BanHang.Services.ViewModel.Filter;
using System;
using System.Collections.Generic;
using System.Text;

namespace BanHang.Services.Services
{
    public interface IOrderService
    {
        //View orders
        List<OrderViewModel> GetAll(int userid);

        // Get order by id
        OrderViewModel Get(int id);
        // get all order of userid
        ApiResult<OrderViewModel> Get(int userid, int id);

        // Create order from cart
        ApiResult<OrderViewModel> Create(OrderRequest model);

        //Admin Update order
        ApiResult<bool> Update(OrderViewModel model);

        // User Cancel Order
        ApiResult<bool> CancelOrder(int orderId, int userId);

        // Admin view all order
        ApiResult<Pagination<OrderViewModel>> GetAllOrder(OrderFilter filter);
        ApiResult<List<TotalAmount>> ProceedsEachMonth(FilterTotalAmount filter);


    }
}
