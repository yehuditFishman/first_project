using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Models
{
    public class BLFlight
    {
        public string FlightNumber { get; set; } = null!;

        public string Airline { get; set; } = null!;

        public string Destination { get; set; } = null!;

        public DateOnly DepartureDate { get; set; }

        public TimeOnly DepartureTime { get; set; }

        public DateOnly ArrivalDate { get; set; }

        public TimeOnly ArrivalTime { get; set; }

        public string Origin { get; set; } = null!;

    }
}
