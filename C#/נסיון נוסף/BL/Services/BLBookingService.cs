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
            List<BLBooking> blBooking =
             booking.Read().Where(booking => booking.FlightId == idFlight)
             .Where(b => b.Status == false).Select(b => new BLBooking())
             .ToList();
            return blBooking;
        }
        //    public List<BLBooking> getBookingsToBuy(int idFlight)
        //    {
        //        // בדיקה אם booking מאותחל
        //        if (booking == null)
        //        {
        //            Console.WriteLine("The 'booking' instance is null.");
        //            return new List<BLBooking>();
        //        }

        //        // בדיקה אם Read מחזירה נתונים
        //        var bookings = booking.Read();
        //        if (bookings == null)
        //        {
        //            Console.WriteLine("The 'Read' method returned null.");
        //            return new List<BLBooking>();
        //        }
        //        if (!bookings.Any())
        //        {
        //            Console.WriteLine("The 'Read' method returned an empty list.");
        //            return new List<BLBooking>();
        //        }

        //        // הדפסת הנתונים
        //        foreach (var b in bookings)
        //        {
        //            Console.WriteLine($"BookingId: {b.Id}, FlightId: {b.FlightId}, Status: {b.Status}");
        //        }

        //        // סינון ומיפוי ל-BLBooking
        //        List<BLBooking> blBooking = bookings
        //            .Where(b => b.FlightId == idFlight && b.Status == false)
        //            .Select(b => new BLBooking
        //            {
        //                Id = b.Id,
        //                FlightId = b.FlightId,
        //                Status = b.Status
        //            })
        //            .ToList();

        //        return blBooking;
        //    }
        }
    }

