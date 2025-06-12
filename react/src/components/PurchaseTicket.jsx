import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";

const PurchaseTicket = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [tz, setTz] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // בדיקת תקינות: תעודת זהות רק מספרים
    if (!/^\d+$/.test(tz)) {
      setError("תעודת הזהות חייבת להכיל ספרות בלבד");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5137/api/Users/${tz}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("שגיאה בבדיקת המשתמש");
      const exists = await response.json();
      if (exists === true) {
        navigate(`/payment/${id}`);
      } else {
        const params = new URLSearchParams({
          name,
          tz,
          password,
          ticket: id,
        }).toString();
        navigate(`/register?${params}`);
      }
    } catch {
      setError("אירעה שגיאה בעת בדיקת המשתמש");
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
          <Typography variant="h4" gutterBottom>
            רכישת כרטיס מספר {id}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              alignItems: "center",
              mt: 2,
            }}
          >
            <TextField
              label="שם מלא"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              sx={{ minWidth: 250 }}
            />
            <TextField
              label="תעודת זהות"
              value={tz}
              onChange={(e) => setTz(e.target.value)}
              required
              sx={{ minWidth: 250 }}
            />
            <TextField
              label="סיסמה"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{ minWidth: 250 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="success"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: 20,
                fontWeight: "bold",
                borderRadius: 3,
                boxShadow: 3,
                background: "linear-gradient(90deg,#10b981 30%,#6366f1 90%)",
                color: "#fff",
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.07)",
                  background: "linear-gradient(90deg,#6366f1 30%,#10b981 90%)",
                  color: "#fff",
                },
              }}
            >
              המשך
            </Button>
          </Box>
          {error && (
            <Alert severity="error" sx={{ mt: 3 }}>
              {error}
            </Alert>
          )}
        </Paper>
      </Container>
    </>
  );
};

export default PurchaseTicket;