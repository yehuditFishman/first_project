using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Models
{
    public class BLBooking
    {
        public int Id { get; set; }

        public int? UserId { get; set; }

        public int FlightId { get; set; }

        //public DateTime? BookingDate { get; set; }

        public bool Status { get; set; }

        public string Class { get; set; } = null!;

        //public virtual Flight Flight { get; set; } = null!;

        public virtual Client? User { get; set; }
    }
}
