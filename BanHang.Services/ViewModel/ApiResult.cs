using System;
using System.Collections.Generic;
using System.Text;

namespace BanHang.Services.ViewModel
{
    public class ApiResult<T>
    {
        public bool IsOk { get; set; }
        public string Message { get; set; }
        public T Result { get; set; }
    }
    
    public class ApiSuccess<T> : ApiResult<T>
    {
        public ApiSuccess()
        {
            IsOk = true;
        }
        public ApiSuccess(string message)
        {
            IsOk = true;
            Message = message;
        }
    }
    public class ApiError<T> : ApiResult<T>
    {
        public ApiError()
        {
            IsOk = false;
        }
        public ApiError(string message)
        {
            IsOk = false;
            Message = message;
        }
    }
}
