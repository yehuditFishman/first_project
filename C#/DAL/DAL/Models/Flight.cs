using System;
using System.Collections.Generic;

namespace DAL.Models;

public partial class Flight
{
    public int Id { get; set; }

    public string FlightNumber { get; set; } = null!;

    public string Airline { get; set; } = null!;

    public string Destination { get; set; } = null!;

    public DateOnly DepartureDate { get; set; }

    public TimeOnly DepartureTime { get; set; }

    public DateOnly ArrivalDate { get; set; }

    public TimeOnly ArrivalTime { get; set; }

    public decimal Price { get; set; }

    public string Origin { get; set; } = null!;

    public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();
}
