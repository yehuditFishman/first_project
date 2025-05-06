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

        [HttpGet]
        
        public ActionResult<List<BLBooking>> getAllBookings([FromBody]int id)
        {
            return booking.getBookingsToBuy(id);
        }
    }
}
