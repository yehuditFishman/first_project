import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";

const OrderTicket = () => (
  <>
    <AppBar position="fixed" color="primary" elevation={2}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My App
        </Typography>
        <Button color="inherit" component={Link} to="/login" sx={{ ml: 2 }}>
          התחברות
        </Button>
        <Button color="inherit" component={Link} to="/">
          דף הבית
        </Button>
      </Toolbar>
    </AppBar>
    <Toolbar /> {/* spacer for fixed AppBar */}
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          הזמנת כרטיס
        </Typography>
        <Box component="form" sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField label="שם מלא" variant="outlined" fullWidth />
          <TextField label="אימייל" variant="outlined" type="email" fullWidth />
          <Button variant="contained" color="primary" size="large" type="submit">
            הזמן כרטיס
          </Button>
        </Box>
      </Paper>
    </Container>
  </>
);

export default OrderTicket;