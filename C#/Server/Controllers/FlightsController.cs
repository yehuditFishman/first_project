using BL.Api;
using BL.Models;
using DAL.Api;
using DAL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.models;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FlightsController : ControllerBase
    {
       
        IBLFlight BLFlight;
        IBLBooking BLBooking;

        public FlightsController(IBL bl)
        {
            this.BLFlight = bl.flight;
            this.BLBooking = bl.booking;
        }

        [HttpGet]

        public ActionResult<List<BLFlight>> getAllFlights()
        {
            return BLFlight.getAllFlights();
        }

        [HttpGet("{id}")]
        public ActionResult<BLFlight> GetFlightById(int id)
        {
            var flight = BLFlight.GetFlightById(id);
            if (flight == null)
                return NotFound($"Flight with id {id} not found.");

            return Ok(flight);
        }

        [HttpGet("FlightsByDestination")]
        public ActionResult<List<BLFlight>> getFlightsByDestination([FromQuery] string destination)
        {
            return BLFlight.FlightsByDestination(destination);
        }


        [HttpGet("FlightsByOrigin")]
        public ActionResult<List<BLFlight>> getFlightsByOrigin([FromQuery] string origin)
        {
            return BLFlight.FlightsByOrigin(origin);
        }

        [HttpGet("FlightsByDepartureDate")]
        public ActionResult<List<BLFlight>> getFlightsByDepartureDate([FromQuery] DateOnly departureDate)
        {
            return BLFlight.FlightsByDepartureDate(departureDate);
        }
        [HttpPost]
        public ActionResult<bool> AddFlight([FromBody] DAL.Models.Flight flight)
        {
            if (flight == null)
            {
                return BadRequest("Flight cannot be null.");
            }
            BLFlight.AddFlight(flight);
            BLBooking booking = new BLBooking
            {
                
                
                 FlightId = flight.Id,
                // BookingDate = blBooking.BookingDate,
                Status = false,
                Class = "a"
            };
            BLBooking.AddBooking(booking);
            return Ok(true);
        }
    }
}