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
import { Link } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
    id: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // כאן אפשר להוסיף לוגיקה של התחברות
    alert(
      `שלום ${form.username}! `
    );
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
            >
              התחבר
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Login;