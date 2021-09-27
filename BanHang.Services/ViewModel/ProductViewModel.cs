using BanHang.Data.Models;
using BanHang.Services.ViewModel.Filter;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BanHang.Services.ViewModel
{
    public class ProductViewModel:BaseFilter
    {
        public ProductViewModel() { }

        public ProductViewModel(Product model)
        {
            Id = model.Id;
            Name = model.Name;
            CategoryId = model.CategoryId;
            SupplierId = model.SupplierId;
            Description = model.Description;
            UnitPrice = model.UnitPrice;
            AvailableQuantity = model.AvailableQuantity;
            Weight = model.Weight;
            CreateDate = model.CreateDate;
            UpdateDate = model.UpdateDate;
			ExpDate = model.ExpDate;
            Status = model.Status;
            Discount = model.Discount;
            AverageRate = model.AverageRate;
            Sold = model.Sold;
           
        }

        public IFormFileCollection? ImagesProduct { get; set; } 
        public int Id { get; set; }
        public int SupplierId { get; set; }
        public int CategoryId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double UnitPrice { get; set; }
        public int? AvailableQuantity { get; set; }
        public int? Weight { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime ExpDate { get; set; }
        public DateTime UpdateDate { get; set; }

        public int Status { get; set; }
        public int Discount { get; set; }
        public bool IsDelete { get; set; }
        public int AverageRate { get; set; }
        public int CountRate { get; set; }
        public string CategoryName { get; set; }
        public string SupplierName { get; set; }
        public int Sold { get; set; }

        public List<PictureViewModel> Pictures { get; set; }

    }
    public class ProductFilter : BaseFilter
    {
        public int? Id { get; set; }
        public int? SupplierId { set; get; }
        public int? AvailableQuantity { get; set; }
        public string SupplierName { get; set; }

        public string ProductName { get; set; }
        public int? PriceFrom { get; set; }
        public int? PriceTo { get; set; }
        public DateTime? DateFrom { get; set; }
        public DateTime? DateTo { get; set; }
        public int? Status { get; set; }
        public int? AverageRateFrom { set; get; }
        public int? AverageRateTo { set; get; }
        public string CategoryName { get; set; }
        public int? Weight { get; set; }
        public bool? IsRate { get; set; } = false;
        public string Search { get; set; }
        public int? SortBy { get; set; }
        //start
        //public int? IsProductName { get; set; }
        //public int? IsUntilPrice { get; set; } 
        //public int? IsQuantity { get; set; } 


        //end



    }


    public class ProductInOrder 
    {
        public string Name { get; set; }
        public double UnitPrice { get; set; }
    }
    public class ProductRequest : ProductViewModel
    {
        public int UserId { get; set; }
    }
    public class ProductStatus
    {
        public int id { get; set; }
        public int status { get; set; }
    }
	public class ProductWeight
    {
        public int weight { get; set; }
    }
    public class ProductFilterTest
    {
        public ProductFilterTest(Product model)
        {
            Id = model.Id;
            Name = model.Name;
            UnitPrice = model.UnitPrice;
            AvailableQuantity = model.AvailableQuantity;
            Weight = model.Weight;
            Status = model.Status;

        }
        public int Id { get; set; }
        public string Name { get; set; }
        public double UnitPrice { get; set; }
        public int? AvailableQuantity { get; set; }
        public int? Weight { get; set; }

        public int Status { get; set; }
    }
    
}

