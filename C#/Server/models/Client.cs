using System;
using System.Collections.Generic;

namespace Server.models;

public partial class Client
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string PhonNumber { get; set; } = null!;

    public string? Email { get; set; }

    public DateOnly DateOfBirth { get; set; }

    public string Password { get; set; } = null!;

    public string AccessPermission { get; set; } = null!;

    public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();
}
