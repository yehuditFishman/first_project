using BL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Api
{
    public interface IBLBooking
    {
        List<BLBooking> getBookingsToBuy(int idFlight);
        List<BLBooking> getBookingsToManager(int idFlight);

        void buyBooking(int idBooking, int userId);

        void AddBooking(BLBooking booking);
    }
}
