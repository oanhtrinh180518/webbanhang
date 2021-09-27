using BanHang.Data.Models;
using BanHang.Services.ViewModel;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BanHang.Services.Services
{
    public interface IProductService
    {
        
        ApiResult<Pagination<ProductViewModel>> GetAll(ProductFilter filter);
        ApiResult<Pagination<ProductViewModel>> GetAllAdmin(ProductFilter filter);
        //ApiResult<Pagination<ProductViewModel>> GettByRate(ProductViewModel model);
        bool UpdateAverageRate(int Id);
        Task<int> Create(ProductViewModel model);
        Task<bool> Update(ProductViewModel model);
        bool Delete(int id);
        bool SoftDelete(int id);
        bool UpdateStatus(ProductStatus fliter);
        ProductViewModel GetById(int id);
        void Test();
        ApiResult<Pagination<ProductViewModel>> GetBestSellingProduct(ProductViewModel moddel);
		ApiResult<List<ProductWeight>> GetWeight();
									   

    }
}
