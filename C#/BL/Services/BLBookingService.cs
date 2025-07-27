using BL.Api;
using BL.Models;
using DAL.Api;
using DAL.Models;
using Microsoft.EntityFrameworkCore;
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

        public void buyBooking(int idBooking, int userId)
        {
            var bookingToUpdate = booking.Read().FirstOrDefault(b => b.Id == idBooking);

            if (bookingToUpdate != null)
            {
                bookingToUpdate.Status = true;
                bookingToUpdate.UserId = userId;
                booking.Update(bookingToUpdate);
            }
            else
            {
                throw new Exception("Booking not found."); // טיפול במקרה שהכרטיס לא נמצא
            }
        }


        public List<BLBooking> getBookingsToBuy(int idFlight)
        {

            List<BLBooking> blBooking =
             booking.Read().Where(booking => booking.FlightId == idFlight)
             .Where(b => b.Status == false).Select(b => new BLBooking
             {
                 Id = b.Id,

                 UserId = b.UserId,

                  FlightId = b.FlightId,
                 //BookingDate = b.BookingDate,

                 Status = b.Status,

                 Class = b.Class,

                 //Flight = b.Flight,
                 User = b.User
             })
             .ToList();
            return blBooking;
        }

        //public List<BLBooking> getBookingsToBuy(int idFlight, int userId)
        //{
        //    //throw new NotImplementedException();
        //    //=======
        //    return booking.Read()
        //        .Where(b => b.FlightId == idFlight && !b.Status)
        //        .Select(b => new BLBooking
        //        {
        //            Id = b.Id,
        //            UserId = b.UserId,
        //            FlightId = b.FlightId,
        //            BookingDate = b.BookingDate,
        //            Status = b.Status,
        //            Class = b.Class,
        //            Flight = b.Flight,
        //            User = b.User
        //        })
        //        .ToList();
        //}

        public void AddBooking(BLBooking blBooking)
        {
            if (blBooking == null)
                throw new ArgumentNullException(nameof(blBooking));

            var booking = new Booking
            {
                Id = blBooking.Id,
                UserId = blBooking.UserId,
               // FlightId = blBooking.FlightId,
               // BookingDate = blBooking.BookingDate,
                Status = blBooking.Status,
                Class = blBooking.Class
            };

            this.booking.Create(booking);

        }

        public List<BLBooking> getBookingsToManager(int idFlight)
        {
            List<BLBooking> blBooking =
            booking.Read().Where(booking => booking.FlightId == idFlight)
            .Select(b => new BLBooking
            {
                Id = b.Id,

                UserId = b.UserId,

                FlightId = b.FlightId,
                //BookingDate = b.BookingDate,

                Status = b.Status,

                Class = b.Class,

                //Flight = b.Flight,
                User = b.User
            })
            .ToList();
            return blBooking;
        }

        //    public List<BLBooking> getBookingsToUser(int userId)
        //    {
        //        List<BLBooking> blBooking =
        //          booking.Read().Where(booking => booking.UserId == userId)
        //          .Select(b => new BLBooking
        //          {
        //              Id = b.Id,

        //              //UserId = b.UserId,

        //              FlightId = b.FlightId,
        //              //BookingDate = b.BookingDate,

        //              Status = b.Status,

        //              Class = b.Class,

        //              //Flight = b.Flight,
        //              //User = b.User
        //          })
        //          .ToList();
        //        return blBooking;

        //}

        public List<BLBooking> getBookingsToUser(int userId)
        {
            var blBooking = booking.Read()
                .Include(b => b.Flight) // טען את פרטי הטיסה
                .Where(booking => booking.UserId == userId)
                .Select(b => new BLBooking
                {
                    Id = b.Id,
                    FlightId = b.FlightId,
                    Status = b.Status,
                    Class = b.Class,
                    FlightNumber = b.Flight.FlightNumber, // הנחת שמספר הטיסה נמצא כאן
                    Destination = b.Flight.Destination // הנחת שהיעד נמצא כאן
                })
                .ToList();
            return blBooking;
        }
    }
}


