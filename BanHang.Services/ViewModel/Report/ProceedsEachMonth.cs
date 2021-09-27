using System;
using System.Collections.Generic;
using System.Text;

namespace BanHang.Services.ViewModel.Report
{
    public class ProceedsEachMonth
    {
        public int Month { get; set; }
        public double TotalProceeds { get; set; }
    }

    public class ProceedsEachMonthList
    {
        public ProceedsEachMonth Jan { get; set; }
        public ProceedsEachMonth Feb { get; set; }
        public ProceedsEachMonth Mar { get; set; }
        public ProceedsEachMonth Apr { get; set; }
        public ProceedsEachMonth May { get; set; }
        public ProceedsEachMonth June { get; set; }
        public ProceedsEachMonth July { get; set; }
        public ProceedsEachMonth Aug { get; set; }
        public ProceedsEachMonth Sep { get; set; }
        public ProceedsEachMonth Oct { get; set; }
        public ProceedsEachMonth Nov { get; set; }
        public ProceedsEachMonth Dec { get; set; }
    }
}
