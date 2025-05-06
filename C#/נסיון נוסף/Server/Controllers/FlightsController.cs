using BL.Api;
using BL.Models;
using DAL.Api;
using DAL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlightsController : ControllerBase
    {
       
        IBLFlight BLFlight;

        public FlightsController(IBL bl)
        {
            this.BLFlight = bl.flight;
        }

        //[HttpGet]

        //public ActionResult<List<Flight>> getAllFlights()
        //{
        //    return flight.Read();
        //}

        [HttpGet("FlightsByDestination")]
        public ActionResult<List<BLFlight>> getFlightsByDestination([FromBody] string destination)
        {
            return BLFlight.FlightsByDestination(destination);
        }


        [HttpGet("FlightsByOrigin")]
        public ActionResult<List<BLFlight>> getFlightsByOrigin([FromBody] string origin)
        {
            return BLFlight.FlightsByOrigin(origin);
        }

        [HttpGet("FlightsByDepartureDate")]
        public ActionResult<List<BLFlight>> getFlightsByDepartureDate([FromBody] DateOnly departureDate)
        {
            return BLFlight.FlightsByDepartureDate(departureDate);
        }
    }
}