using BanHang.Data.Models;
using BanHang.Services.ViewModel;
using BanHang.Data.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Z.EntityFramework.Plus;
using BanHang.Services.Services;

namespace BanHang.Services.Services
{

    public class CategoryService : ICategoryService
    {
        private readonly UnitOfWork work;
        public CategoryService()
        {
            // Khoi tao work
            work = UnitOfWork.GetDefaultInstance();
        }

       
        // get product by id
        public CategoryViewModel Get(int id)
        {
            var categories = work.CategoryRepository.NoTrackingEntities.Where(o => o.Id == id).FirstOrDefault();
            var categoryViewModel =  new CategoryViewModel(categories);
            return categoryViewModel;
        }
        // get product by name 
        public List<CategoryViewModel> GetByName(string name)
        {
            var categories = work.CategoryRepository.NoTrackingEntities.Where(o => o.Name.Contains(name, StringComparison.CurrentCultureIgnoreCase)).ToList();
            var categoryViewModel = categories
                .Select(model => new CategoryViewModel(model))
                .ToList();
            return categoryViewModel;
        }
        public int Create(CategoryViewModel model)
        {
            var newCategory = new Category()
            {
                Id = model.Id,
                Name = model.Name,
                Status=model.Status
            };
            
            
            var id = work.CategoryRepository.Create(newCategory);
            return id;
        }
        public bool Delete(int id)
        {
            try
            {
                return work.CategoryRepository.Entities
                    .Where(o => o.Id == id)
                    .Delete() > 0 ? true : false ;
                //return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
        // update product
        public bool Update(CategoryViewModel model, int Id)
        {
            try
            {
                return work.CategoryRepository.Entities
                    .Where(o => o.Id == Id)
                    .Update(o => new Category
                    {
                        Name = model.Name,
                        Status = model.Status
                    }
                    )>0 ? true :false;
                //return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public ApiResult<List<CategoryViewModel>> GetAll()
        {
            var categories = work.CategoryRepository.NoTrackingEntities.ToList();
            var categoryVMs = categories
                .Select(model => new CategoryViewModel(model))
                .ToList();
            return new ApiSuccess<List<CategoryViewModel>> { Result = categoryVMs };
        }


        

    }
}
