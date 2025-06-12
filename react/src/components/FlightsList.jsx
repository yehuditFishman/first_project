import React, { useEffect, useState } from "react";
import { Container, Paper, Typography, Box, CircularProgress, Alert, List, ListItem, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const FlightsList = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch("http://localhost:5137/api/Flights");
        if (!response.ok) throw new Error("שגיאה בטעינת הטיסות");
        const data = await response.json();
        setFlights(data);
      } catch {
        setError("אירעה שגיאה בעת טעינת רשימת הטיסות");
      } finally {
        setLoading(false);
      }
    };
    fetchFlights();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3, textAlign: "center", background: "linear-gradient(135deg,#f8fafc 0%,#e0e7ff 100%)" }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", mb: 3 }}>
          רשימת טיסות קיימות
        </Typography>
        {loading && (
          <Box sx={{ mt: 4 }}>
            <CircularProgress />
          </Box>
        )}
        {error && (
          <Alert severity="error" sx={{ mt: 3 }}>{error}</Alert>
        )}
        {!loading && !error && flights.length === 0 && (
          <Typography>לא נמצאו טיסות</Typography>
        )}
        {!loading && flights.length > 0 && (
          <List sx={{ mt: 3 }}>
            {flights.map((flight, idx) => (
              <ListItem key={idx} sx={{ background: "#fff", borderRadius: 2, mb: 2, boxShadow: 1, flexDirection: 'column', alignItems: 'flex-end' }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#6366f1' }}>
                  טיסה {flight.flightNumber} - {flight.airline}
                </Typography>
                <Typography>
                  <b>מוצא:</b> {flight.origin} | <b>יעד:</b> {flight.destination}
                </Typography>
                <Typography>
                  <b>תאריך יציאה:</b> {flight.departureDate} בשעה {flight.departureTime}
                </Typography>
                <Typography>
                  <b>תאריך נחיתה:</b> {flight.arrivalDate} בשעה {flight.arrivalTime}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => navigate(`/update-flight/${flight.id ?? flight.flightNumber}`)}
                  >
                    עדכן טיסה
                  </Button>
                  <Button
                    variant="outlined"
                    color="info"
                    sx={{ mt: 2, ml: 2, fontWeight: "bold", borderRadius: 3, px: 2, py: 1, fontSize: 16 }}
                    onClick={() => {
                      // בנה את ה-URL לפי הדוגמה: /api/Bookings/manager{id}
                      const flightId = flight.id ?? flight.flightNumber;
                      if (flightId !== undefined && flightId !== null && !isNaN(Number(flightId))) {
                        navigate(`/manager-bookings/manager${flightId}`);
                      } else {
                        alert('שגיאה: מזהה טיסה לא קיים');
                      }
                    }}
                  >
                    הצג כרטיסים
                  </Button>
                </Box>
              </ListItem>
            ))}
          </List>
        )}
      </Paper>
    </Container>
  );
};

export default FlightsList;
