using BanHang.Data.Models;
using BanHang.Services.ViewModel;
using BanHang.Data.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Z.EntityFramework.Plus;
using Microsoft.EntityFrameworkCore;
using System.Drawing;
using System.IO;
using BanHang.Services.Common;

namespace BanHang.Services.Services
{
    public class ProductService : IProductService
    {
        private readonly UnitOfWork work;
        private readonly IPictureService _pictureService;
        public ProductService(IPictureService pictureService)
        {
            // Khoi tao work
            work = UnitOfWork.GetDefaultInstance();
            _pictureService = pictureService;
        }

        
        public async System.Threading.Tasks.Task<int> Create(ProductViewModel model)
        {
            
            var newProduct = new Product()
            {
                Name = model.Name,
                CategoryId = model.CategoryId,
                SupplierId = model.SupplierId,
                Description = model.Description,
                UnitPrice = model.UnitPrice,
                AvailableQuantity = model.AvailableQuantity,
                Weight = model.Weight,
                ExpDate = model.ExpDate,
                Status = model.Status,
            };
            var id = work.ProductRepository.Create(newProduct);

            foreach (var file in model.ImagesProduct)
            {
                var request = new PictureRequest
                {
                    ProductId = id,
                    File = file
                };
                var idPicture = await _pictureService.CreateAsync(request);

            }

            return id;
        }

        // update product
        public async System.Threading.Tasks.Task<bool> Update(ProductViewModel model)
        {
            try
            {
                var isUpdate = work.ProductRepository.Entities
                    .Where(o => o.Id == model.Id)
                    .Update(o => new Product
                    {
                        Name = model.Name,
                        CategoryId = model.CategoryId,
                        SupplierId = model.SupplierId,
                        Description = model.Description,
                        UnitPrice = model.UnitPrice,
                        AvailableQuantity = model.AvailableQuantity,
                        Weight = model.Weight,
                        CreateDate = model.CreateDate,
                        UpdateDate = model.UpdateDate,
                        ExpDate = model.ExpDate,
                        Status = model.Status,
                        Discount = model.Discount,
                    });
                var pictue = work.PictureRepository.Entities.Where(o => o.ProductId == model.Id).FirstOrDefault();
                if (model.ImagesProduct != null)
                {
                    var request = new PictureRequest
                    {
                        ProductId = model.Id,
                        File = model.ImagesProduct[0]
                    };

                    var idPicture = await _pictureService.Update(request, pictue.Id);
                }
                return isUpdate > 0 ? true : false;
                //return true;
            }
            catch (Exception)
            {
                return false;
            }

        }


        // delete one product
        public bool Delete(int id)
        {
            try
            {
                return work.ProductRepository.Entities
                    .Where(o => o.Id == id)
                    .Delete() > 0 ? true : false;
            }
            catch (Exception)
            {
                return false;
            }
        }

        // update status
        public bool UpdateStatus(ProductStatus fliter)
        {
            try
            {
               return work.ProductRepository.Entities
                    .Where(o => o.Id == fliter.id)
                    .Update(u => new Product
                    {
                        Status = fliter.status
                    })>0 ?true: false;
               

            }
            catch (Exception)
            {

                return false;
            }
        }
        // get all products
        public ApiResult<Pagination<ProductViewModel>> GetAll(ProductFilter filter)
        {
            var results = work.ProductRepository.Entities
                .Include(o => o.Supplier)
                .Include(o => o.Category)
                .Include(o => o.Pictures)
                .Where(o => filter.Id == null || o.Id == filter.Id)
                .Where(o => filter.SupplierId == null || o.SupplierId == filter.SupplierId)
                .Where(o => filter.ProductName == null || o.Name.Contains(filter.ProductName))
                .Where(o => filter.PriceFrom == null || o.UnitPrice >= filter.PriceFrom)
                .Where(o => filter.PriceTo == null || o.UnitPrice <= filter.PriceTo)
                .Where(o => filter.DateFrom == null || o.CreateDate > filter.DateFrom)
                .Where(o => filter.DateTo == null || o.ExpDate < filter.DateTo)
                .Where(o => filter.Status == null || o.Status == filter.Status)
                .Where(o => filter.AverageRateFrom == null || o.AverageRate > filter.AverageRateFrom)
                .Where(o => filter.AverageRateTo == null || o.AverageRate > filter.AverageRateTo)
                .Where(o => filter.SupplierName == null || o.Supplier.Name.Contains(filter.SupplierName))
                .Where(o => filter.CategoryName == null || o.Category.Name.Contains(filter.CategoryName))
                .Where(o => filter.Weight == null || o.Weight == filter.Weight)
                .Where(o => o.Status == 1)
                .Where(o => filter.Search == null || o.Name.Contains(filter.Search) ||
                    o.Supplier.Name.Contains(filter.Search) || o.Category.Name.Contains(filter.Search))
                .ToList();

            if (filter.IsRate == true)
            {
                results = results.OrderByDescending(o => o.AverageRate).ToList();
            }
            //1: ProductNameIncrease, 2: ProductNameReduction,3: PriceIncrease, 4:PriceReduction
            switch (filter.SortBy)
            {
                case 1: results = results.OrderBy(o => o.Name).ToList(); break;
                case 2: results = results.OrderByDescending(o => o.Name).ToList(); break;
                case 3: results = results.OrderBy(o => o.UnitPrice).ToList(); break;
                case 4: results = results.OrderByDescending(o => o.UnitPrice).ToList(); break;
                default: break;
            }

            var pagination = new Pagination<ProductViewModel>();

            pagination.TotalRecords = results.Count;
            pagination.PageIndex = filter.PageIndex;
            pagination.PageSize = filter.PageSize;
            pagination.Items = results
                .Skip(filter.PageSize * (filter.PageIndex - 1))
                .Take(filter.PageSize)
                .Select(o => new ProductViewModel(o)
                {
                    CategoryName = o.Category.Name,
                    SupplierName = o.Supplier.Name,
                    Pictures = o.Pictures?
                        .Select(o => new PictureViewModel(o)
                        {
                            //Content = Helper.ConvertImageToBase64(o.FilePath)
                        }).ToList()
                })
                .ToList();

            return new ApiSuccess<Pagination<ProductViewModel>> { Result = pagination };
        }

        public ApiResult<Pagination<ProductViewModel>> GetAllAdmin(ProductFilter filter)
        {
            var results = work.ProductRepository.Entities
                .Include(o => o.Supplier)
                .Include(o => o.Category)
                .Include(o => o.Pictures)
                .Where(o => filter.Id == null || o.Id == filter.Id)
                .Where(o => filter.SupplierId == null || o.SupplierId == filter.SupplierId)
                .Where(o => filter.ProductName == null || o.Name.Contains(filter.ProductName))
                .Where(o => filter.PriceFrom == null || o.UnitPrice >= filter.PriceFrom)
                .Where(o => filter.PriceTo == null || o.UnitPrice <= filter.PriceTo)
                .Where(o => filter.DateFrom == null || o.CreateDate > filter.DateFrom)
                .Where(o => filter.DateTo == null || o.ExpDate < filter.DateTo)
                .Where(o => filter.Status == null || o.Status == filter.Status)
                .Where(o => filter.AverageRateFrom == null || o.AverageRate > filter.AverageRateFrom)
                .Where(o => filter.AverageRateTo == null || o.AverageRate > filter.AverageRateTo)
                .Where(o => filter.SupplierName == null || o.Supplier.Name.Contains(filter.SupplierName))
                .Where(o => filter.CategoryName == null || o.Category.Name.Contains(filter.CategoryName))
                .Where(o => filter.Weight == null || o.Weight == filter.Weight)
                
                
                
                .ToList();

            if (filter.IsRate == true)
            {
                results = results.OrderByDescending(o => o.AverageRate).ToList();
            }
            //start
            //1: ProductNameIncrease, 2: ProductNameReduction,3: PriceIncrease, 4:PriceReduction
            switch (filter.SortBy)
            {
                case 1: results = results.OrderBy(o => o.Name).ToList(); break;
                case 2: results = results.OrderByDescending(o => o.Name).ToList(); break;
                case 3: results = results.OrderBy(o => o.UnitPrice).ToList(); break;
                case 4: results = results.OrderByDescending(o => o.UnitPrice).ToList(); break;
                case 5: results = results.OrderBy(o => o.AvailableQuantity).ToList(); break;
                case 6: results = results.OrderByDescending(o => o.AvailableQuantity).ToList(); break;
                default: break;
            }

       
            //end
            var pagination = new Pagination<ProductViewModel>();

            pagination.TotalRecords = results.Count;
            pagination.PageIndex = filter.PageIndex;
            pagination.PageSize = filter.PageSize;
            pagination.Items = results
                .Skip(filter.PageSize * (filter.PageIndex - 1))
                .Take(filter.PageSize)
                .Select(o => new ProductViewModel(o)
                {
                    CategoryName = o.Category.Name,
                    SupplierName = o.Supplier.Name,
                    Pictures = o.Pictures?
                        .Select(o => new PictureViewModel(o)
                        {
                            //Content = Helper.ConvertImageToBase64(o.FilePath)
                        }).ToList()
                })
                .ToList();

            

            return new ApiSuccess<Pagination<ProductViewModel>> { Result = pagination };
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
        //  delete soft(xóa mềm)
        public bool SoftDelete(int id)
        {
            {
                try
                {
                    return work.ProductRepository.Entities
                        .Where(o => o.Id == id)
                        .Update(u => new Product
                        {
                            IsDelete = true
                        }) >0 ? true : false;
                    //return true;

                }
                catch (Exception)
                {

                    return false;
                }
            }

        }

        public bool UpdateAverageRate(int Id)
        {
            throw new NotImplementedException();
        }

        public ProductViewModel GetById(int id )
        {
            var product = work.ProductRepository.Entities
                    .Where(o => o.Id == id)
                    .Include(o => o.Pictures)
                    .Select(o => new ProductViewModel(o)
                    {
                        CategoryName=o.Category.Name,
                        SupplierName=o.Supplier.Name,
                        Pictures=o.Pictures
                        .Select(o => new PictureViewModel(o)).ToList()

                    }).ToList()
                    .FirstOrDefault();
            return  product;
        }

        //public ApiResult<Pagination<ProductViewModel>> GettByRate(ProductViewModel model)
        //{
        //    var products = work.ProductRepository.NoTrackingEntities.ToList();
        //    var resultVMs = products.Select(model => new ProductViewModel(model))
        //        .OrderByDescending(s=>s.AverageRate)
        //        .ToList();

        //    var pagination = new Pagination<ProductViewModel>();

        //    pagination.TotalRecords = resultVMs.Count;
        //    pagination.PageIndex = model.PageIndex;
        //    pagination.PageSize = model.PageSize;
        //    pagination.Items = resultVMs
        //        .Skip(model.PageSize * (model.PageIndex - 1))
        //        .Take(model.PageSize)
        //        //.Select(model => new ProductViewModel(model))
        //        .ToList();

        //    return new ApiSuccess<Pagination<ProductViewModel>> { Result = pagination };
        //}

        public void Test()
        {

        }
        // get best selling products
        public ApiResult<Pagination<ProductViewModel>> GetBestSellingProduct(ProductViewModel model)
        {
            var productVMs = work.ProductRepository.Entities
                .Include(o => o.Supplier)
                .Include(o => o.Category)
                .Include(o => o.Pictures)
                .ToList()
                .OrderByDescending(o => o.Sold)
                .ToList();

            var pagination = new Pagination<ProductViewModel>();

            pagination.TotalRecords = productVMs.Count;
            pagination.PageIndex = model.PageIndex;
            pagination.PageSize = model.PageSize;
            pagination.Items = productVMs
                .Skip(model.PageSize * (model.PageIndex - 1))
                .Take(model.PageSize)
                //.Select(model => new ProductViewModel(model))
                .Select(o => new ProductViewModel(o)
                {
                    CategoryName = o.Category.Name,
                    SupplierName = o.Supplier.Name,
                    Pictures = o.Pictures?
                        .Select(o => new PictureViewModel(o)
                        {
                            //Content = Helper.ConvertImageToBase64(o.FilePath)
                        }).ToList()
                })
                .ToList();

            return new ApiSuccess<Pagination<ProductViewModel>> { Result = pagination };
        }

        public ApiResult<List<ProductWeight>> GetWeight()
        {
            var weight = work.ProductRepository.Entities.GroupBy(o => o.Weight)
                .Select(o => new ProductWeight() { weight = (int)o.Key }).ToList();
            //var weight = work.productrepository.Entities.groupby(o => o.weight).Select(o => new ProductWeight() { weight = o.Weight}).tolist();
            //var listWeight = Weight.;
            return new ApiResult<List<ProductWeight>>() { Result = weight };
        }
    }
}
