using BL.Models;
using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Api
{
    public interface IBLFlight
    {
        List<BLFlight> FlightsByDestination(string destination);
        List<BLFlight> FlightsByOrigin(string origin);
        List<BLFlight> FlightsByDepartureDate(DateOnly departureDate);
        List<BLFlight> getAllFlights();
        bool AddFlight(Flight flight);
        BLFlight GetFlightById(int id);

    }
}
