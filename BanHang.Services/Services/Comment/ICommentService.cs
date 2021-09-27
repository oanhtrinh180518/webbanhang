using BanHang.Services.ViewModel;
using System;
using System.Collections.Generic;
using System.Text;

namespace BanHang.Services.Services
{
    public interface ICommentService
    {
        ApiSuccess<List<CommentViewModel>> GetAll(int productId);
        CommentViewModel Get(int id);
        int Create(CommentViewModel model,int userId);
        
    }
}
