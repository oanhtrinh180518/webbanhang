using BanHang.Data.Models;
using BanHang.Data.Repository;
using BanHang.Services.Services;
using BanHang.Services.ViewModel;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Z.EntityFramework.Plus;


namespace BanHang.Services.Services
{
    public class CommentService:ICommentService
    {
        private readonly UnitOfWork work;
        public CommentService()
        {
            // Khoi tao work
            work = UnitOfWork.GetDefaultInstance();
        }

        // get comment by id
        public CommentViewModel Get(int id)
        {
            var comments = work.CommentRepository.NoTrackingEntities.Where(o => o.Id == id).FirstOrDefault();
            var commentViewModel = new CommentViewModel(comments);
            return commentViewModel;
        }
        //create comment 
        public int Create(CommentViewModel model,int userId)
        {
            var newComment = new Comment()
            {
                UserId = userId,
                ProductId = model.ProductId,
                Content = model.Content,
                Rate=model.Rate
            };


            var id = work.CommentRepository.Create(newComment);
            if (id > 0)
            {
                UpdateCountRate(id);
            }
            return id;
        }
        //update CountRate in Product
        public bool UpdateCountRate(int Id)
        {
            try
            {
                //get a comment
                var cmt = work.CommentRepository.Entities
                    .Include(o => o.Product)
                    .Where(o => o.Id == Id)
                    .Where(o => o.ProductId == o.Product.Id)
                    .Where(o => o.Rate > 0).FirstOrDefault();

                //add CountRate in table Product
                work.ProductRepository.Entities
                    .Where(o => o.Id == cmt.ProductId)
                    .Update(o => new Product
                    {
                        CountRate = cmt.Product.CountRate + 1,
                        AverageRate = (cmt.Product.AverageRate * cmt.Product.CountRate + cmt.Rate) / (cmt.Product.CountRate + 1)
                    });
                return true;
            }
            catch (Exception )
            {
                return false;
            }

        }
        
        // update 
        


        // get all Comment by ProductId
        ApiSuccess<List<CommentViewModel>> ICommentService.GetAll(int productId)
        {
            var comments = work.CommentRepository.Entities
                .Include(o => o.User)
                .Where(o => o.ProductId == productId)
                .Select(o => new CommentViewModel(o)
                {
                    FullName = o.User.FullName
                })
                .ToList();
            //var commentViewModel = comments
            //    .Incluce(o => o.User)
                
            //    .ToList();
            return new ApiSuccess<List<CommentViewModel>> { Result = comments };
        }
    }
}
