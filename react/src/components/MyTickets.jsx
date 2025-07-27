import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  Box,
  Chip,
  Divider,
} from "@mui/material";

const MyTickets = () => {
  const { id } = useParams();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`http://localhost:5137/api/Bookings/user${id}`);
        if (!response.ok) throw new Error("שגיאה בטעינת הכרטיסים");
        const data = await response.json();
        setTickets(data);
      } catch {
        setError("אירעה שגיאה בעת טעינת הכרטיסים");
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, [id]);

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom align="center" fontWeight="bold">
        הכרטיסים שלי
      </Typography>
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {error}
        </Alert>
      )}
      {!loading && !error && tickets.length === 0 && (
        <Alert severity="info" sx={{ mt: 3 }}>
          לא נמצאו כרטיסים עבור משתמש זה.
        </Alert>
      )}
      {!loading && !error && tickets.map((ticket) => (
        <Card key={ticket.id} sx={{ mb: 3, boxShadow: 4, borderRadius: 3 }}>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6" fontWeight="bold">
                כרטיס מספר {ticket.id}
              </Typography>
              <Chip
                label={ticket.status ? "פעיל" : "לא פעיל"}
                color={ticket.status ? "success" : "default"}
                sx={{ fontWeight: "bold" }}
              />
            </Box>
            <Divider sx={{ my: 2 }} />
            <Typography>
              <b>מזהה טיסה:</b> {ticket.flightId}
            </Typography>
            <Typography>
              <b>מחלקה:</b> {ticket.class}
            </Typography>
            <Divider sx={{ my: 2 }} />
            
            
            
          </CardContent>
        </Card>
      ))}
    </Container>
  );
};

export default MyTickets;