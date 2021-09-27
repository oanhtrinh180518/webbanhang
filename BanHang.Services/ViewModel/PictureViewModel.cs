using BanHang.Data.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;

namespace BanHang.Services.ViewModel
{
    public class PictureViewModel
    {
        public PictureViewModel() { }
        public PictureViewModel(Picture model)
        {
            Id = model.Id;
            ProductId = model.ProductId;
            FileName = model.FileName;
            FilePath = model.FilePath;
            FileExtension = model.FileExtension;
    }
        public int Id { get; set; }
        public int ProductId { get; set; }
        public string FileName { get; set; }
        public string FilePath { get; set; }
        public string FileExtension { get; set; }
        public string Content { get; set; }
    }
    public class PictureFilter
    {
        public int? ProductId { get; set; }
        public string FileName { get; set; }
        public string ProductName { get; set; }
    }

    public class PictureRequest
    {
        public int ProductId { get; set; }
        public IFormFile File { get; set; }
    }
}
