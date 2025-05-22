using BL.Api;
using BL.Models;
using DAL.Api;
using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace BL.Services
{
    public class BLBookingService : IBLBooking
    {
        IBooking booking;
        public BLBookingService(IDal dal)
        {
            booking = dal.Booking;
        }
        public List<BLBooking> getBookingsToBuy(int idFlight)
        {
            return booking.Read()
                .Where(b => b.FlightId == idFlight && !b.Status)
                .Select(b => new BLBooking
                {
                    Id = b.Id,
                    UserId = b.UserId,
                    FlightId = b.FlightId,
                    BookingDate = b.BookingDate,
                    Status = b.Status,
                    Class = b.Class,
                    Flight = b.Flight,
                    User = b.User
                })
                .ToList();
        }

        public void AddBooking(BLBooking blBooking)
        {
            if (blBooking == null)
                throw new ArgumentNullException(nameof(blBooking));

            var booking = new Booking
            {
                Id = blBooking.Id,
                UserId = blBooking.UserId,
                FlightId = blBooking.FlightId,
                BookingDate = blBooking.BookingDate,
                Status = blBooking.Status,
                Class = blBooking.Class
            };

            this.booking.Create(booking);
        }

    }
}

