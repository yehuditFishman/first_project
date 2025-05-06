using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Api
{
    public interface IBL
    {
        IBLFlight flight { get; }
        IBLUser user { get; }
        IBLUserFromManeger userFromManeger { get; }
        IBLBooking booking { get; }
    }
}


