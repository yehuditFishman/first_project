import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert
} from "@mui/material";

const UpdateFlight = () => {
  const { id } = useParams();
  const [form, setForm] = useState({
    flightNumber: "",
    origin: "",
    destination: "",
    departure: "",
    arrival: "",
    airline: "",
    price: "",
    seats: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // טען את פרטי הטיסה הקיימים
    const fetchFlight = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5137/api/Flights/${id}`);
        if (!response.ok) throw new Error();
        const data = await response.json();
        setForm({
          flightNumber: data.flightNumber || "",
          origin: data.origin || "",
          destination: data.destination || "",
          departure: data.departureDate && data.departureTime ? `${data.departureDate}T${data.departureTime.slice(0,5)}` : "",
          arrival: data.arrivalDate && data.arrivalTime ? `${data.arrivalDate}T${data.arrivalTime.slice(0,5)}` : "",
          airline: data.airline || "",
          price: data.price || "",
          seats: data.seats || ""
        });
      } catch {
        setError("אירעה שגיאה בטעינת פרטי הטיסה");
      } finally {
        setLoading(false);
      }
    };
    fetchFlight();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      // TODO: Replace with real API call for updating flight
      // await fetch(...)
      setSuccess("הטיסה עודכנה בהצלחה!");
      setTimeout(() => navigate("/flights-list"), 1200);
    } catch {
      setError("אירעה שגיאה בעדכון הטיסה");
    }
  };

  if (loading) return <div>טוען...</div>;

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper elevation={5} sx={{ p: 5, borderRadius: 4, background: "linear-gradient(135deg,#f8fafc 0%,#e0e7ff 100%)" }}>
        <Typography variant="h4" align="center" gutterBottom>
          עדכון טיסה מספר {id}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="מספר טיסה"
            name="flightNumber"
            value={form.flightNumber}
            fullWidth
            required
            sx={{ mb: 2 }}
            disabled
          />
          <TextField
            label="מוצא"
            name="origin"
            value={form.origin}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="יעד"
            name="destination"
            value={form.destination}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="תאריך ושעת המראה"
            name="departure"
            type="datetime-local"
            value={form.departure}
            onChange={handleChange}
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />
          <TextField
            label="תאריך ושעת נחיתה"
            name="arrival"
            type="datetime-local"
            value={form.arrival}
            onChange={handleChange}
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />
          <TextField
            label="חברת תעופה"
            name="airline"
            value={form.airline}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="מחיר"
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <TextField
            label="מספר מושבים"
            name="seats"
            type="number"
            value={form.seats}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ px: 5, py: 1.5, fontWeight: "bold", fontSize: 18, borderRadius: 3 }}
            >
              עדכן טיסה
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default UpdateFlight;
