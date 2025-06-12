using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Models
{
    public class BLUser
    {
        public int Id { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public string Name { get; set; } = null!;

        public string PhonNumber { get; set; } = null!;

        public string? Email { get; set; }
        public string Password { get; set; } = null!;
    }
}
