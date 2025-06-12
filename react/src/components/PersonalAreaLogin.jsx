import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";
import Alert from "@mui/material/Alert";
import { Link, useNavigate } from "react-router-dom";

const PersonalAreaLogin = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    id: "",
  });
  const [error, setError] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult("");
    if (!form.username || !form.password || !form.id) {
      setError("אנא מלא את כל השדות");
      return;
    }
    if (!/^[0-9]+$/.test(form.id)) {
      setError("תעודת זהות חייבת להכיל ספרות בלבד");
      return;
    }
    // המרה ל-int
    const idInt = parseInt(form.id, 10);
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5137/api/AccessPermissions/${idInt}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("שגיאה בשליפת ההרשאות");
      const data = await response.text(); // קבל את התשובה כמחרוזת
      setResult(data);
      if (data === "Maneger") {
        navigate("/manager-panel");
      }
    } catch {
      setError("אירעה שגיאה בעת שליפת ההרשאות");
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
            התחברות לאזור האישי
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <TextField
              label="שם משתמש"
              variant="outlined"
              fullWidth
              name="username"
              value={form.username}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <PersonIcon position="start" color="action" />
                ),
              }}
            />
            <TextField
              label="סיסמה"
              variant="outlined"
              type="password"
              fullWidth
              name="password"
              value={form.password}
              onChange={handleChange}
              InputProps={{
                startAdornment: <LockIcon position="start" color="action" />,
              }}
            />
            <TextField
              label="תעודת זהות"
              variant="outlined"
              fullWidth
              name="id"
              value={form.id}
              onChange={handleChange}
              InputProps={{
                startAdornment: <BadgeIcon position="start" color="action" />,
              }}
            />
            <Button
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              sx={{ mt: 2 }}
              disabled={loading}
            >
              {loading ? "טוען..." : "התחבר"}
            </Button>
          </Box>
          {error && (
            <Alert severity="error" sx={{ mt: 3 }}>
              {error}
            </Alert>
          )}
          {result && (
            <Alert severity="success" sx={{ mt: 3, direction: 'ltr', wordBreak: 'break-all' }}>
              {result}
            </Alert>
          )}
        </Paper>
      </Container>
    </>
  );
};

export default PersonalAreaLogin;