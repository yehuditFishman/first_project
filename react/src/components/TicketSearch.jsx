import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

const searchOptions = [
  { value: "destination", label: "יעד", icon: <FlightLandIcon /> },
  { value: "origin", label: "מוצא", icon: <FlightTakeoffIcon /> },
  { value: "date", label: "תאריך יציאה", icon: <CalendarMonthIcon /> },
];

const TicketSearch = () => {
  const [searchBy, setSearchBy] = useState("destination");
  const [searchValue, setSearchValue] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    setResults([]);
    setError("");
    if (!searchValue) {
      setError("יש להזין ערך לחיפוש");
      return;
    }
    setLoading(true);
    try {
      let url = "";
      if (searchBy === "destination") {
        url = `http://localhost:5137/api/Flights/FlightsByDestination?destination=${encodeURIComponent(
          searchValue
        )}`;
      } else if (searchBy === "origin") {
        url = `http://localhost:5137/api/Flights/FlightsByOrigin?origin=${encodeURIComponent(
          searchValue
        )}`;
      } else if (searchBy === "date") {
        url = `http://localhost:5137/api/Flights/FlightsByDepartureDate?departureDate=${encodeURIComponent(
          searchValue
        )}`;
      }
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("שגיאה בחיפוש טיסות");
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError("אירעה שגיאה בעת החיפוש");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AppBar position="fixed" color="primary" elevation={2}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My App
          </Typography>
          <Button color="inherit" component={Link} to="/" sx={{ ml: 2 }}>
            דף הבית
          </Button>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Paper
          elevation={4}
          sx={{
            p: 4,
            borderRadius: 3,
            textAlign: "center",
            background: "linear-gradient(135deg,#f8fafc 0%,#e0e7ff 100%)",
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: "bold",
              letterSpacing: 2,
              mb: 3,
              fontFamily: "'Heebo', 'Segoe UI', Arial, sans-serif",
            }}
          >
            חיפוש כרטיסים
          </Typography>
          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              alignItems: "center",
              mt: 2,
            }}
          >
            <TextField
              select
              label="חפש לפי"
              value={searchBy}
              onChange={(e) => {
                setSearchBy(e.target.value);
                setSearchValue("");
                setResults([]);
                setError("");
              }}
              sx={{ minWidth: 180 }}
            >
              {searchOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {option.icon}
                    {option.label}
                  </Box>
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label={
                searchBy === "date"
                  ? "תאריך יציאה"
                  : searchBy === "origin"
                  ? "מוצא"
                  : "יעד"
              }
              type={searchBy === "date" ? "date" : "text"}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              InputLabelProps={searchBy === "date" ? { shrink: true } : {}}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {searchBy === "destination" && <FlightLandIcon color="primary" />}
                    {searchBy === "origin" && <FlightTakeoffIcon color="primary" />}
                    {searchBy === "date" && <CalendarMonthIcon color="primary" />}
                  </InputAdornment>
                ),
              }}
              sx={{ minWidth: 250 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              startIcon={<SearchIcon />}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: 20,
                fontWeight: "bold",
                borderRadius: 3,
                boxShadow: 3,
                background: "linear-gradient(90deg,#6366f1 30%,#10b981 90%)",
                color: "#fff",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.07)",
                  background: "linear-gradient(90deg,#10b981 30%,#6366f1 90%)",
                  color: "#fff",
                },
              }}
            >
              חפש
            </Button>
          </Box>
          {loading && (
            <Box sx={{ mt: 4 }}>
              <CircularProgress />
            </Box>
          )}
          {error && (
            <Alert severity="error" sx={{ mt: 3 }}>
              {error}
            </Alert>
          )}
          {results.length > 0 && (
            <Box sx={{ mt: 4, textAlign: "right" }}>
              <Typography variant="h6" gutterBottom>
                תוצאות חיפוש:
              </Typography>
              {results.map((flight, idx) => (
                <Paper
                  key={idx}
                  elevation={2}
                  sx={{
                    p: 2,
                    mb: 2,
                    background: "#fff",
                    borderRadius: 2,
                    textAlign: "right",
                  }}
                >
                  <Typography>
                    <b>מספר טיסה:</b> {flight.flightNumber}
                  </Typography>
                  <Typography>
                    <b>יעד:</b> {flight.destination}
                  </Typography>
                  <Typography>
                    <b>מוצא:</b> {flight.origin}
                  </Typography>
                  <Typography>
                    <b>תאריך יציאה:</b> {flight.departureDate}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={() => navigate(`/flight/${flight.flightNumber}`)}
                  >
                    הצג כרטיסים פנויים
                  </Button>
                </Paper>
              ))}
            </Box>
          )}
        </Paper>
      </Container>
    </>
  );
};

export default TicketSearch;