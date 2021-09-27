using BanHang.Data.Repository;
using BanHang.Services.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Z.EntityFramework.Plus;
using BanHang.Data.Models;
using Microsoft.EntityFrameworkCore;
using BanHang.Services.ViewModel.Filter;

namespace BanHang.Services.Services
{
    public class CartService : ICartSevice
    {
        private readonly UnitOfWork work;

        // tu mot service, minh muon goi cai service khac
        //private readonly IProductService _productService;

        public CartService(IProductService productService)
        {
            // Khoi tao work
            work = UnitOfWork.GetDefaultInstance();
            //_productService = productService;
        }
        // xem gio hang
        public ApiResult<Pagination<CartViewModel>> GetAll(BaseFilter filter, int userid)
        {
            var results = work.CartRepository.Entities
                .Include(o =>o.Product)
                .ThenInclude(o=>o.Pictures)
                .Where(o => o.UserId == userid)
                .Select(o =>new CartViewModel(o) { 
                    Id=o.Id,
                    ProductName= o.Product.Name,
                    UnitPrice=o.Product.UnitPrice,
                    AvailableQuantity=o.Product.AvailableQuantity
                })
                .ToList();
            foreach(var item in results)
            {
                item.Pictures=work.PictureRepository.Entities
                    .Where(o => o.ProductId==item.ProductId)
               
                    .Select(o => new PictureViewModel(o)).ToList();
            }
            
            var pagination = new Pagination<CartViewModel>();

            pagination.TotalRecords = results.Count();
            pagination.PageIndex = filter.PageIndex;
            pagination.PageSize = filter.PageSize;
            pagination.Items = results
                .Skip(filter.PageSize * (filter.PageIndex - 1))
                .Take(filter.PageSize).ToList();
                
            return new ApiSuccess<Pagination<CartViewModel>> { Result = pagination };
        }
        // add to cart
        public ApiResult<int> Create(CartViewModel model, int userId)
        {
            var products = work.CartRepository.Entities
                .Where(o => o.UserId == userId)
                .Select(o => o.Product).ToList();

            foreach(var product in products)
            {
                if (product.Id == model.ProductId)
                    return new ApiError<int>("Product already exist in cart!");
            }

            var newCart = new Cart()
            {
                UserId = userId,
                ProductId = model.ProductId,
                Quantity = model.Quantity,
            };

            var id = work.CartRepository.Create(newCart);
            return new ApiSuccess<int>("Add product successfully!") { Result = id };
        }
        //delete product
        public bool Delete(int userId, int id)
        {
            try
            {
                return work.CartRepository.Entities
                    .Where(o => o.ProductId == id)
                    .Where(o => o.UserId == userId)
                    .Delete() > 0 ? true : false ;
            }
            catch (Exception)
            {
                return false;
            }
        }
        // update product by plus
        public ApiResult<int> UpdatePlus(CartViewModel model, int userId)
        {
            try
            {
                var cart=work.CartRepository.Entities
                    .Where(o => o.ProductId == model.ProductId)
                    .Where(o => o.UserId == userId)
                    .ToList().FirstOrDefault();
                bool isUpdate=work.CartRepository.Entities
                    .Include(o => o.Product)
                    .Where(o => o.UserId == userId)
                    .Where(o=> o.ProductId==model.ProductId)
                    .Where(o=> o.Quantity+cart.Quantity <o.Product.AvailableQuantity)
                    .Update(o => new Cart
                    {
                        Quantity = model.Quantity + cart.Quantity,
                        ProductId = model.ProductId,
                        //UserId = model.UserId

                    })>0? true : false;
                if (isUpdate) return new ApiSuccess<int>("Update product successfully!") { Result = 1 };
                return new ApiError<int>("The quantity added to the cart exceeds the quantity in stock") { Result = 0 };
            }
            catch (Exception)
            {
                return new ApiError<int>("Update false") { Result = 0 };
            }
        }
        public bool DeleteAll(int userId)
        {
            try
            {
                return work.CartRepository.Entities
                    .Where(o => o.UserId == userId)
                    .Delete() > 0 ? true : false;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public ApiResult<int> AddToCart(CartViewModel model,int userId)
        {
            var check = work.CartRepository.Entities
                .Where(o => o.ProductId == model.ProductId)
                .Where(o => o.UserId == userId)
                .ToList().Count;
            if (check > 0) return UpdatePlus(model, userId);
            return Create(model, userId);
        }

        public ApiResult<int> Update(CartViewModel model, int userId)
        {
            try
            {

                bool isUpdate = work.CartRepository.Entities
                    .Include(o => o.Product)
                    .Where(o => o.UserId == userId)
                    .Where(o => o.ProductId == model.ProductId)
					.Where(o=>model.Quantity  <= o.Product.AvailableQuantity)
                    .Where (o => model.Quantity>0)														 
                    .Update(o => new Cart
                    {
                        Quantity = model.Quantity,
                        ProductId = model.ProductId,

                    }) > 0 ? true : false;
                if (isUpdate) return new ApiSuccess<int>("Update product successfully!") { Result = 1 };
                return new ApiError<int>("The quantity added to the cart exceeds the quantity in stock") { Result = 0 };
            }
            catch (Exception)
            {
                return new ApiError<int>("Update false") { Result = 0 };
            }
        }
    }
}

