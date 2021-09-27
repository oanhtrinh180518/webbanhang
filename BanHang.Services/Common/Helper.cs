using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Text;

namespace BanHang.Services.Common
{
    public static class Helper
    {
        public static string ConvertImageToBase64(string imgPath)
        {
            Image image = Image.FromFile(imgPath);
            var ms = new MemoryStream();
            image.Save(ms, image.RawFormat);
            byte[] imgBytes = ms.ToArray();
            string base64String = Convert.ToBase64String(imgBytes);
            return base64String;
        }
    }
}
