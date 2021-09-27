using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace BanHang.Services.Define
{
    public class EnumDefine
    {
    }
    public enum eStatus
    {
        [Description("Chờ xử lý")]
        prepare = 1,
        [Description("Đang xử lý")]
        process = 2,
        [Description("Đang giao hàng")]
        delivery = 3,
        [Description("Hoàn thành")]
        success = 4,
        [Description("Bị hủy")]
        cancel = 0,

    }

    public enum eGender
    {
        [Description("Male")]
        male = 1,
        [Description("Female")]
        female = 2,
        [Description("Other")]
        other = 3,
    }
}
