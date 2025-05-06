using DAL.Api;
using DAL.Models;
using DAL.Services;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class DalManeger : IDal
    {
        public IUser User { get; }

        public IFlight Flight { get; }

        public IBooking Booking { get; }

        public DalManeger()
        {

            ServiceCollection services = new ServiceCollection();
            services.AddSingleton<DatabaseManager>();

            services.AddSingleton<IUser, UserService>();
            services.AddSingleton<IFlight, FlightService>();
            services.AddSingleton<IBooking, BookingService>();


            ServiceProvider serviceProvider = services.BuildServiceProvider();

            User = serviceProvider.GetService<IUser>();
            Flight = serviceProvider.GetService<IFlight>();
            Booking = serviceProvider.GetService<IBooking>();

        }
    }
}
