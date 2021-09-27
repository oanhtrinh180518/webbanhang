using BanHang.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BanHang.Services.ViewModel
{
    public class SupplierViewModel
    {
        public SupplierViewModel () { }

        public SupplierViewModel(Supplier model)
        {
            Id = model.Id;
            Name = model.Name;
            Address = model.Address;
            Email = model.Email;
            Phone = model.Phone;
        }
        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
    }
}
