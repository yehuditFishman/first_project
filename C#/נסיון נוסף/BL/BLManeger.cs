using BL.Api;
using BL.Models;
using BL.Services;
using DAL.Api;
using DAL.Models;
using DAL.Services;
using Microsoft.Extensions.DependencyInjection;

namespace BL
{
    public class BLManeger : IBL
    {

        public IBLUserFromManeger userFromManeger {  get; }

        public IBLFlight flight { get; }

        public IBLUser user { get; }

        public IBLBooking booking {  get; }

        public IBLUserPermission userPermission { get; }

        public BLManeger(IBLFlight flight, IBLUserPermission userpermission, IBLUserFromManeger userFromManeger, IBLBooking booking , IBLUser user)
            {
                this.flight = flight;
                this.user = user;
                this.userPermission = userpermission;
                this.userFromManeger = userFromManeger;
                this.booking = booking;
            }

            //ServiceCollection services = new ServiceCollection();
            //services.AddSingleton<IDal>();

            //services.AddSingleton<IBLFlight, BLFlightService>();
            //services.AddSingleton<IBLUserFromManeger, BLUserFromManegerService>();

            //ServiceProvider serviceProvider = services.BuildServiceProvider();

            //flight = serviceProvider.GetService<IBLFlight>();
            //userFromManeger = serviceProvider.GetService<IBLUserFromManeger>();
            //booking = serviceProvider.GetService<IBLBooking>();
            //user = serviceProvider.GetService<IBLUser>();



        }
    }


