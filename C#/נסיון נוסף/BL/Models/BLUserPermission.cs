using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Models
{
    public class BLUserPermission
    {
        public int Id { get; set; }
        public string Password { get; set; } = null!;
        public string AccessPermission { get; set; } = null!;

    }
}
