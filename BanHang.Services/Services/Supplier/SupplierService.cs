using BanHang.Data.Repository;
using BanHang.Data.Models;
using BanHang.Services.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Z.EntityFramework.Plus;

namespace BanHang.Services.Services
{
    public class SupplierService : ISupplierService
    {
        private readonly UnitOfWork work;
        public SupplierService()
        {
            work = UnitOfWork.GetDefaultInstance();
        }

        

        // create one supplier
        public int Create(SupplierViewModel model)
        {
            var newSupplier = new Supplier()
            {
                Name = model.Name,
                Address = model.Address,
                Email = model.Email,
                Phone = model.Phone
            };
            var id = work.SupplierRepository.Create(newSupplier);
            return id;
        }

        // update supplier
        public bool Update(SupplierViewModel model,int Id)
        {
            try
            {
                return work.SupplierRepository.Entities
                    .Where(o => o.Id == Id)
                    .Update(o => new Supplier
                    {
                        Name = model.Name,
                        Address = model.Address,
                        Phone = model.Phone,
                        Email = model.Email
                    }) >0 ? true : false;
                
            }
            catch (Exception)
            {

                return false;
            }
        }

        // delete supplier
        public bool Delete(int id)
        {
            try
            {
                return work.SupplierRepository.Entities
                    .Where(o => o.Id == id)
                    .Delete() >0 ? true : false;
                
            }
            catch (Exception)
            {

                return false;
            }
        }
        //getAll list Supplier
        public ApiResult<List<SupplierViewModel>> GetAll()
        {
            var suppliers = work.SupplierRepository.NoTrackingEntities
                            .ToArray();

            var supplierVMs = suppliers
                .Select(model => new SupplierViewModel(model))
                .ToList();
            return new ApiResult<List<SupplierViewModel>> { Result = supplierVMs };
        }
    }
}
