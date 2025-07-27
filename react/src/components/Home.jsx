import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import { keyframes } from "@emotion/react";
import Box from "@mui/material/Box";
import TicketIcon from "@mui/icons-material/ConfirmationNumber";
import PersonIcon from "@mui/icons-material/Person";

// ייבוא התמונה
import airportBg from "../assets/PikiWiki_Israel_49657_bgn_airport_-_tlv.jpg";

const bounce = keyframes`
  0%   { transform: scale(1)   rotate(0deg);   color: #6366f1;}
  20%  { transform: scale(1.1) rotate(-2deg); color: #a21caf;}
  40%  { transform: scale(0.95) rotate(2deg); color: #f59e42;}
  60%  { transform: scale(1.05) rotate(-1deg); color: #10b981;}
  80%  { transform: scale(1.02) rotate(1deg); color: #6366f1;}
  100% { transform: scale(1)   rotate(0deg);   color: #6366f1;}
`;

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(99,102,241,0.7); }
  70% { box-shadow: 0 0 0 16px rgba(99,102,241,0); }
  100% { box-shadow: 0 0 0 0 rgba(99,102,241,0); }
`;

const Home = () => (
  <Box sx={{ position: "relative", minHeight: "100vh", width: "100vw", overflow: "hidden" }}>
    {/* רקע תמונה פרוס על כל המסך */}
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${airportBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        zIndex: 0,
      }}
    />
    {/* כל התוכן מעל הרקע */}
    <Box sx={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
      <AppBar position="fixed" color="primary" elevation={2}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Flight
          </Typography>
          <Button color="inherit" component={Link} to="/personal-area-login" sx={{ ml: 2 }}>
            התחברות לאזור האישי
          </Button>
          <Button color="inherit" component={Link} to="/order">
            הזמנת כרטיס
          </Button>
          <Button color="inherit" component={Link} to="/login">
            התחברות
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
            variant="h2"
            gutterBottom
            sx={{
              fontWeight: "bold",
              letterSpacing: 2,
              animation: `${bounce} 2.5s infinite`,
              fontFamily: "'Heebo', 'Segoe UI', Arial, sans-serif",
              mb: 4,
            }}
          >
            Welcome!!!
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 4,
              mt: 4,
            }}
          >
            <Button
              component={Link}
              to="/order"
              variant="contained"
              color="secondary"
              size="large"
              startIcon={
                <TicketIcon sx={{ fontSize: 60 }} />
              }
              sx={{
                px: 4,
                py: 2,
                fontSize: 22,
                fontWeight: "bold",
                borderRadius: 3,
                boxShadow: 3,
                animation: `${pulse} 1.5s infinite`,
                transition: "transform 0.2s",
                "&:hover": {
                  transform: "scale(1.07) rotate(-2deg)",
                  background: "linear-gradient(90deg,#a21caf 30%,#6366f1 90%)",
                  color: "#fff",
                },
              }}
            >
              הזמנת כרטיס
            </Button>
            <Button
              component={Link}
              to="/personal-area-login"
              variant="contained"
              color="primary"
              size="large"
              startIcon={
                <PersonIcon sx={{ fontSize: 60 }} />
              }
              sx={{
                px: 4,
                py: 2,
                fontSize: 22,
                fontWeight: "bold",
                borderRadius: 3,
                boxShadow: 3,
                animation: `${pulse} 1.5s 0.7s infinite`,
                transition: "transform 0.2s",
                background: "linear-gradient(90deg,#6366f1 30%,#10b981 90%)",
                color: "#fff",
                "&:hover": {
                  transform: "scale(1.07) rotate(2deg)",
                  background: "linear-gradient(90deg,#10b981 30%,#6366f1 90%)",
                  color: "#fff",
                },
              }}
            >
              התחברות לאזור האישי
            </Button>
          </Box>
          <Typography variant="h6" color="text.secondary" sx={{ mt: 5 }}>
            היכנסו או הזמינו כרטיס בקלות
          </Typography>
        </Paper>
      </Container>
    </Box>
  </Box>
);

export default Home;