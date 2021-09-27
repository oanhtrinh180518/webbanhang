using BanHang.Data.Repository;
using BanHang.Services.ViewModel;
using BanHang.Data.Models;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Text;
using Z.EntityFramework.Plus;
using Microsoft.EntityFrameworkCore;
using System.Drawing;
using System.IO;
using Microsoft.Extensions.Configuration;
namespace BanHang.Services.Services
{
    public class PictureService : IPictureService
    {
        private readonly UnitOfWork work;
        private readonly IConfiguration _configuration;
        public PictureService(IConfiguration configuration)
        {
            work = UnitOfWork.GetDefaultInstance();
            _configuration = configuration;
        }
        /*public List<PictureViewModel> GetAll()
        {
            var pictures = work.PictureRepository.NoTrackingEntities.ToList();
            var pictureViewModel = pictures
                .Select(model => new PictureViewModel(model)
                { 
                    Content=ConvertImageToBase64(model.FilePath)
                })
                .ToList();
            return pictureViewModel;
        }*/
        public List<PictureViewModel> GetAll(PictureFilter filter)
        {
            var results = work.PictureRepository.Entities
                .Include(o => o.Product)
                .Where(o => filter.ProductId == null || o.ProductId == filter.ProductId)
                .Where(o => filter.FileName == null || o.FileName.Contains(filter.FileName))
                .Where(o => filter.ProductName == null || o.Product.Name.Contains(filter.ProductName))
                .Select(o => new PictureViewModel(o))
                .ToList();

            return results;
        }
        // Create picture 
        public async System.Threading.Tasks.Task<int> CreateAsync(PictureRequest request)
        {
            var source = _configuration.GetValue<string>("FileStore");

            var filepath = Path.Combine( source , request.File.FileName);

            // lưu file từ filepath với IFormFile asp.net core

            using (var fileSteam = new FileStream(filepath, FileMode.Create))
            {
                 await request.File.CopyToAsync(fileSteam);
            }
           
																						
										  
            var newPicture = new Picture()
            {
                ProductId = request.ProductId,
                FileName = request.File.FileName,
                FilePath = filepath.Substring(filepath.IndexOf("\\img\\")),
                FileExtension = Path.GetExtension(request.File.FileName)
            };
            var id = work.PictureRepository.Create(newPicture);
            return id;
        }
        
        // Update Picture
        public async System.Threading.Tasks.Task<bool> Update(PictureRequest request,int Id)
        {
            try
            {
                var source = _configuration.GetValue<string>("FileStore");

                var filepath = Path.Combine(source, request.File.FileName);

                // lưu file từ filepath với IFormFile asp.net core

                using (var fileSteam = new FileStream(filepath, FileMode.Create))
                {
                    await request.File.CopyToAsync(fileSteam);
                }

                //change PictureVM -> Picture
                var isOk= work.PictureRepository.Entities
                     .Where(o => o.Id == Id)
                     .Update(o => new Picture
                     {
                         FileName = request.File.FileName,
                         FilePath = filepath.Substring(filepath.IndexOf("\\img\\")),
                         FileExtension = Path.GetExtension(request.File.FileName)
                     }) ;
              return  isOk > 0 ? true : false;
                // //return true;
            }
            catch (Exception)
            {

                return false;
            }
        }
        // Delete picture
        public bool Delete(int id)
        {
            try
            {
                //xoa anh trong folder
                var picture=work.PictureRepository.Entities
                   .Where(o => o.Id == id)
                   .ToList() ;
                var picturePath = picture[0].FilePath;
                //var path = Path.GetFullPath((new Uri(picturePath)).LocalPath);
                var path = "../BanHang.Website/public/img/product/product/noi-cong.jpg";
                //string fullPath =Server + picturePath;
                if (File.Exists(path))
                {
                    File.Delete(path);
                    var isDelete=work.PictureRepository.Entities.Where(o => o.Id == id)
                        .Delete()>0 ? true: false;
                    return isDelete;
                }
                return false;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public string ConvertImageToBase64(string imgPath)
        {
            Image image = Image.FromFile(imgPath);
            var ms = new MemoryStream();
            image.Save(ms, image.RawFormat);
            byte[] imgBytes = ms.ToArray();
            string base64String = Convert.ToBase64String(imgBytes);
            return base64String;
        }

        public ApiSuccess<List<PictureViewModel>> GetAll()
        {
            var pictures = work.PictureRepository.NoTrackingEntities.ToList();
            var pictureViewModel = pictures
                .Select(model => new PictureViewModel(model)
                {
                    Content = ConvertImageToBase64(model.FilePath)
                })
                .ToList();
            return new ApiSuccess<List<PictureViewModel>> { Result = pictureViewModel };
        }
    }

}
