using DAL.Api;
using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Services
{
    public class FlightService : IFlight
    {

        DatabaseManager DatabaseManager;

        public FlightService(DatabaseManager databaseManager)
        {
            DatabaseManager = databaseManager;
        }
        public void Create(Flight flight)
        {
            if (flight == null)
                throw new ArgumentNullException("not defind");
            DatabaseManager.Flights.Add(flight);
            DatabaseManager.SaveChanges();
        }

        public void Delete(Flight flight)
        {
            if (flight == null)
                throw new ArgumentNullException("flight is empty");
            var flightToDelete = DatabaseManager.Flights.FirstOrDefault(f => f.Id == flight.Id);
            if (flightToDelete == null)
                throw new ArgumentNullException("flight not found");

            DatabaseManager.Flights.Remove(flightToDelete);
            DatabaseManager.SaveChanges();
        }

        public List<Flight> Read()
        {
            return DatabaseManager.Flights.ToList();
        }

        public void Update(Flight item)
        {

            if (item == null)
            {
                throw new ArgumentNullException("flight not found");
            }

            var flightToUpdate = DatabaseManager.Flights.FirstOrDefault(p => p.Id == item.Id);
            if (flightToUpdate != null)
            {
                flightToUpdate.DepartureTime = item.DepartureTime;
                flightToUpdate.ArrivalTime = item.ArrivalTime;
                flightToUpdate.Price = item.Price;
                DatabaseManager.SaveChanges();
            }
        }
    }

}

