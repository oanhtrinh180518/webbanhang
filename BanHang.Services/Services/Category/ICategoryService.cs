using BanHang.Data.Models;
using BanHang.Services.ViewModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace BanHang.Services.Services
{
    public interface ICategoryService
    {
        ApiResult<List<CategoryViewModel>> GetAll();
        CategoryViewModel Get(int id);
        List<CategoryViewModel> GetByName(string name);
        int Create(CategoryViewModel model);
        bool Delete(int id);
        bool Update(CategoryViewModel model, int Id);


    }
}
