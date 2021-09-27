using BanHang.Services.ViewModel;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BanHang.Services.Services
{
    public interface IPictureService
    {
        ApiSuccess<List<PictureViewModel>> GetAll();
        List<PictureViewModel> GetAll(PictureFilter filter);

        Task<int> CreateAsync(PictureRequest request);
        Task<bool> Update(PictureRequest request,int id);
        bool Delete(int id);
    }
}
