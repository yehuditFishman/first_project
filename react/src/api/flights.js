export const searchFlights = async (searchBy, searchValue) => {
  let url = "";
  if (searchBy === "destination")
    url = `/api/Flights/FlightsByDestination?destination=${encodeURIComponent(searchValue)}`;
  if (searchBy === "origin")
    url = `/api/Flights/FlightsByOrigin?origin=${encodeURIComponent(searchValue)}`;
  if (searchBy === "date")
    url = `/api/Flights/FlightsByDepartureDate?departureDate=${encodeURIComponent(searchValue)}`;
  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("שגיאה בחיפוש טיסות");
  return await response.json();
};