import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // קבלת ערכים מה-query string אם קיימים
  const params = new URLSearchParams(location.search);
  const ticketId = params.get("ticket");
  const [name, setName] = useState(params.get("name") || "");
  const [id, setId] = useState(params.get("tz") || "");
  const [password, setPassword] = useState(params.get("password") || "");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // בדיקת תקינות: תעודת זהות רק מספרים
    if (!/^\d+$/.test(id)) {
      setError("תעודת הזהות חייבת להכיל ספרות בלבד");
      return;
    }

    if (!name || !id || !password || !phone || !email || !dateOfBirth) {
      setError("אנא מלא את כל השדות");
      return;
    }

    try {
      const response = await fetch("http://localhost:5137/api/Users/createUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Name: name,
          Id: id,
          PhonNumber: phone,
          Email: email,
          DateOfBirth: dateOfBirth,
          Password: password,
        }),
      });
      if (!response.ok) throw new Error("שגיאה ביצירת משתמש");
      setSuccess(true);
      setTimeout(() => {
        if (ticketId) {
          navigate(`/payment/${ticketId}`);
        } else {
          navigate("/payment");
        }
      }, 1500);
    } catch {
      setError("אירעה שגיאה בעת יצירת המשתמש");
    }
  };

  return (
    <>
      <AppBar position="fixed" color="primary" elevation={2}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My App
          </Typography>
          <Button color="inherit" onClick={() => navigate("/")} sx={{ ml: 2 }}>
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
            הרשמה למערכת
          </Typography>
          <Typography sx={{ mb: 3 }}>
            לא נמצאת במערכת, אנא מלא את פרטיך:
          </Typography>
          <Box
            component="form"
            onSubmit={handleRegister}
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
              value={id}
              onChange={(e) => setId(e.target.value)}
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
            <TextField
              label="טלפון"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              sx={{ minWidth: 250 }}
            />
            <TextField
              label="אימייל"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              sx={{ minWidth: 250 }}
            />
            <TextField
              label="תאריך לידה"
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
              sx={{ minWidth: 250 }}
              InputLabelProps={{ shrink: true }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
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
              הרשמה
            </Button>
          </Box>
          {success && (
            <Typography sx={{ mt: 3 }} color="success.main">
              נרשמת בהצלחה! מעבר לדף הבית...
            </Typography>
          )}
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

export default Register;