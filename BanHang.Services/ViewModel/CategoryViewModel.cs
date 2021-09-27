using BanHang.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BanHang.Services.ViewModel
{
    public class CategoryViewModel
    {   
        public CategoryViewModel() { }
        public CategoryViewModel(Category model)
        {
            Id = model.Id;
            Name = model.Name;
            Status = model.Status;
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public int Status { get; set; }
    }
}
