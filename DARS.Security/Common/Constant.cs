using System;
using System.Collections.Generic;
using System.Text;

namespace BanHang.Security.Common
{
    public static class Constant
    {
        public const string SecretKey = "3EF52696-9142-48A8-9CE0-3312B08D7909";
        public const string SecretSercurityKey = "473B2693-89A8-4822-8209-8FFB97729615";
    }

    public struct LogFormat
    {
        // Constants Log Formats
        public const string ControllerStart = "Start {0} - WebAPI";
        public const string ControllerEnd = "End {0} - WebAPI";

        public const string ServiceStart = "Start {0} - DAL";
        public const string ServiceEnd = "End {0} - DAL";
    }
}
