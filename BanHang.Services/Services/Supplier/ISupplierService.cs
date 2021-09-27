using BanHang.Services.ViewModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace BanHang.Services.Services
{
    public interface ISupplierService
    {
        ApiResult<List<SupplierViewModel>> GetAll();

        int Create(SupplierViewModel model);

        bool Update(SupplierViewModel model,int Id);

        bool Delete(int id);
    }
}
