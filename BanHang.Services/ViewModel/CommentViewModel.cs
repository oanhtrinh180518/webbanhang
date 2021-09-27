using BanHang.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BanHang.Services.ViewModel
{
    public class CommentViewModel
    {
        public CommentViewModel() { }
        public CommentViewModel(Comment model)
        {
            Id = model.Id;
            //UserId = model.UserId;
            ProductId = model.ProductId;
            Content = model.Content;
            CreateTime = model.CreateTime;
            Rate = model.Rate;
        }
        public int Id { get; set; }
        //public int UserId { get; set; }
        public int ProductId { get; set; }
        public string Content { get; set; }
        public DateTime? CreateTime { get; set; }

        public int Rate { get; set; }
        public string FullName { get; set; }
    }
}
