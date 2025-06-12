using DAL.Api;
using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Services
{
    public class BookingService : IBooking
    {

            DatabaseManager DatabaseManager;

            public BookingService(DatabaseManager databaseManager)
            {
                DatabaseManager = databaseManager;
            }
            public void Create(Booking booking)
            {
                if (booking == null)
                    throw new ArgumentNullException("not defind");
                DatabaseManager.Bookings.Add(booking);
                DatabaseManager.SaveChanges();
            }

            public void Delete(Booking booking)
            {
                if (booking == null)
                    throw new ArgumentNullException("booking is empty");
                var bookingToDelete = DatabaseManager.Bookings.FirstOrDefault(b => b.Id == booking.Id);
                if (bookingToDelete == null)
                    throw new ArgumentNullException("booking not found");

                DatabaseManager.Bookings.Remove(bookingToDelete);
                DatabaseManager.SaveChanges();
            }

            public List<Booking> Read()
            {
            List <Booking> bookings = DatabaseManager.Bookings.ToList();
            return bookings;
            }

            public void Update(Booking item)
            {

                if (item == null)
                {
                    throw new ArgumentNullException("booking not found");
                }

                var bookingToUpdate = DatabaseManager.Bookings.FirstOrDefault(p => p.Id == item.Id);
                if (bookingToUpdate != null)
                {
                    bookingToUpdate.BookingDate = item.BookingDate;
                    bookingToUpdate.Status = item.Status;
                    bookingToUpdate.Class = item.Class;
                    bookingToUpdate.Flight = item.Flight;
                    bookingToUpdate.FlightId=item.FlightId;
                    bookingToUpdate.UserId = item.UserId;
                    bookingToUpdate.User = item.User;
                    DatabaseManager.SaveChanges();
                }
            }
        }

    }


