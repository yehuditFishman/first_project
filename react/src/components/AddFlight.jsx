import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  MenuItem,
  Alert
} from "@mui/material";

const AddFlight = () => {
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
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const response = await fetch("http://localhost:5137/api/Flights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          flightNumber: form.flightNumber,
          origin: form.origin,
          destination: form.destination,
          departure: form.departure,
          arrival: form.arrival,
          airline: form.airline,
          price: Number(form.price),
          seats: Number(form.seats)
        })
      });
      if (!response.ok) throw new Error();
      const result = await response.json();
      if (result === true) {
        navigate("/add-flight-success");
        return;
      } else {
        setError("אירעה שגיאה בהוספת הטיסה");
      }
    } catch {
      setError("אירעה שגיאה בהוספת הטיסה");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper elevation={5} sx={{ p: 5, borderRadius: 4, background: "linear-gradient(135deg,#f8fafc 0%,#e0e7ff 100%)" }}>
        <Typography variant="h4" align="center" gutterBottom>
          הוספת טיסה חדשה
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="מספר טיסה"
            name="flightNumber"
            value={form.flightNumber}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 2 }}
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
              הוסף טיסה
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default AddFlight;
