using BanHang.Services.ViewModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace BanHang.Services.Services
{
    public interface IReportService
    {
        // get users make most order
        List<UserViewModel> GetTopUsersMakeOrder();

        // get all order without pagination
        List<OrderViewModel> GetAllOrder();

        //get users spend most money
        List<TopSpendVM> GetTopSpendMoney();

        List<UserViewModel> GetListUsers();

        List<ProductViewModel> GetListProducts();


    }
}
