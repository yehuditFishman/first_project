using BL.Api;
using BL.Models;
using DAL.Api;
using DAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BL.Services
{
    public class BLFlightService : IBLFlight
    {
        IFlight flights;

        public BLFlightService(IDal dal)
        {
            flights = dal.Flight;
        }
        public List<BLFlight> FlightsByDestination(string destination)
        {
            List<BLFlight> blflight = 
            flights.Read().Where(flight => flight.Destination == destination)
            .Select(flight => new BLFlight
            {
                FlightNumber = flight.FlightNumber,
                Airline = flight.Airline,
                Destination = flight.Destination,
                DepartureDate = flight.DepartureDate,
                DepartureTime = flight.DepartureTime,
                ArrivalDate = flight.ArrivalDate,
                ArrivalTime = flight.ArrivalTime,
                Origin = flight.Origin
            })
        .ToList();
            return blflight;
        }

        public List<BLFlight> FlightsByOrigin(string origin)
        {
            List<BLFlight> blflight =
            flights.Read().Where(flight => flight.Origin == origin)
            .Select(flight => new BLFlight
            {
                FlightNumber = flight.FlightNumber,
                Airline = flight.Airline,
                Destination = flight.Destination,
                DepartureDate = flight.DepartureDate,
                DepartureTime = flight.DepartureTime,
                ArrivalDate = flight.ArrivalDate,
                ArrivalTime = flight.ArrivalTime,
                Origin = flight.Origin
            })
        .ToList();
            return blflight;
        }

        public List<BLFlight> FlightsByDepartureDate(DateOnly departureDate)
        {
            List<BLFlight> blflight =
            flights.Read().Where(flight => flight.DepartureDate == departureDate)
            .Select(flight => new BLFlight
            {
                FlightNumber = flight.FlightNumber,
                Airline = flight.Airline,
                Destination = flight.Destination,
                DepartureDate = flight.DepartureDate,
                DepartureTime = flight.DepartureTime,
                ArrivalDate = flight.ArrivalDate,
                ArrivalTime = flight.ArrivalTime,
                Origin = flight.Origin
            })
        .ToList();
            return blflight;
        }

        public List<BLFlight> getAllFlights()
        {
            return flights.Read()
                .Select(flight => new BLFlight
                {
                    FlightNumber = flight.FlightNumber,
                    Airline = flight.Airline,
                    Destination = flight.Destination,
                    DepartureDate = flight.DepartureDate,
                    DepartureTime = flight.DepartureTime,
                    ArrivalDate = flight.ArrivalDate,
                    ArrivalTime = flight.ArrivalTime,
                    Origin = flight.Origin
                })
                .ToList();
        }

        public bool AddFlight(Flight flight)
        {
            if (flight == null)
                return false;

            try
            {
                flights.Create(flight);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public BLFlight GetFlightById(int id)
        {
            var flight = flights.Read().FirstOrDefault(f => f.Id == id);
            if (flight == null)
                return null;

            return new BLFlight
            {
                FlightNumber = flight.FlightNumber,
                Airline = flight.Airline,
                Destination = flight.Destination,
                DepartureDate = flight.DepartureDate,
                DepartureTime = flight.DepartureTime,
                ArrivalDate = flight.ArrivalDate,
                ArrivalTime = flight.ArrivalTime,
                Origin = flight.Origin
            };
        }
    }
   }

