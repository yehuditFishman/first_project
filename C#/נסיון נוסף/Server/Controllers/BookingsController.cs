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
    public class BookingsController : ControllerBase
    {
        IBLBooking booking;

        public BookingsController(IBL bl)
        {
            this.booking = bl.booking;
        }

        [HttpGet("{id}")]
        public ActionResult<List<BLBooking>> getAllBookings(int id)
        {
            return booking.getBookingsToBuy(id);
        }

        [HttpPost]
        public IActionResult AddBooking([FromBody] BLBooking booking)
        {
            if (booking == null)
                return BadRequest("Booking cannot be null.");

            this.booking.AddBooking(booking);
            return Ok("Booking added successfully.");
        }
    }
}
