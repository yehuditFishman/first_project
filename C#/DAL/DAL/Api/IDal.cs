using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Api
{
    public interface IDal
    {
        IUser User { get; }

        IFlight Flight { get; }

        IBooking Booking { get; }
    }
}
