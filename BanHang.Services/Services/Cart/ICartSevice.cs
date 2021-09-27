using BanHang.Services.ViewModel;
using BanHang.Services.ViewModel.Filter;
using System;
using System.Collections.Generic;
using System.Text;

namespace BanHang.Services.Services
{
    public interface ICartSevice
    {
        ApiResult<Pagination<CartViewModel>> GetAll(BaseFilter filter, int userid);
        ApiResult<int> Create(CartViewModel model, int userId);
        bool Delete(int userId, int id);
        ApiResult<int> UpdatePlus(CartViewModel model, int userId);
        ApiResult<int> Update(CartViewModel model, int userId);
        bool DeleteAll(int userId);
        ApiResult<int> AddToCart(CartViewModel model,int userId);
        
    }
}

