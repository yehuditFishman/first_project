﻿using Microsoft.Identity.Client;
using System;
using System.Collections.Generic;

namespace DAL.Models;

public partial class Client
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string PhonNumber { get; set; } = null!;

    public string? Email { get; set; }

    public DateOnly DateOfBirth { get; set; }

    public string Password { get; set; } = null!;

    public string AccessPermission { get; set; } = "User";

    public virtual ICollection<Booking> Bookings { get; set; } = new List<Booking>();
}
