using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace BanHang.Services.ViewModel
{
    public class Pagination<T>
    {
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public int TotalRecords { get; set; }
        public List<T> Items { get; set; }

        public Pagination() { }
        public Pagination(List<T> records, int index, int size)
        {
            TotalRecords = records.Count;
            Items = records.Skip(size * (index - 1)).Take(size).ToList();
            PageIndex = index;
            PageSize = size;
        }
    }
}
