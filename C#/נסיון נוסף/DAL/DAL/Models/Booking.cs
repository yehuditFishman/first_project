using System;
using System.Collections.Generic;

namespace DAL.Models;

public partial class Booking
{
    public int Id { get; set; }

    public int? UserId { get; set; }

    public int FlightId { get; set; }

    public DateTime? BookingDate { get; set; }

    public bool Status { get; set; }

    public string Class { get; set; } = null!;

    public virtual Flight Flight { get; set; } = null!;

    public virtual Client? User { get; set; }
}
