import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const AvailableTickets = () => {
  const { id } = useParams();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const didFetch = React.useRef(false);

  useEffect(() => {
    if (didFetch.current) return;
    didFetch.current = true;
    const fetchTickets = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`http://localhost:5137/api/Bookings/${id}`);
        if (!response.ok) throw new Error("שגיאה בטעינת כרטיסים");
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
            כרטיסים פנויים לטיסה {id}
          </Typography>
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
          {tickets.length > 0 ? (
            <Box sx={{ mt: 4 }}>
              {tickets.map((ticket, idx) => (
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
                    <b>מספר כרטיס:</b> {ticket.id}
                  </Typography>
                  <Typography>
                    <b>מחלקה:</b> {ticket.class}
                  </Typography>
                  <Typography>
                    <b>מחיר:</b> {ticket.price}
                  </Typography>
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<ShoppingCartIcon />}
                    sx={{
                      mt: 2,
                      fontWeight: "bold",
                      borderRadius: 3,
                      px: 3,
                      py: 1,
                      fontSize: 18,
                      background: "linear-gradient(90deg,#10b981 30%,#6366f1 90%)",
                      color: "#fff",
                      boxShadow: 2,
                      transition: "transform 0.2s",
                      "&:hover": {
                        transform: "scale(1.07)",
                        background: "linear-gradient(90deg,#6366f1 30%,#10b981 90%)",
                        color: "#fff",
                      },
                    }}
                    onClick={() => navigate(`/purchase/${ticket.id}`)}
                  >
                    לרכישה
                  </Button>
                </Paper>
              ))}
            </Box>
          ) : (
            !loading && <Typography>לא נמצאו כרטיסים פנויים</Typography>
          )}
        </Paper>
      </Container>
    </>
  );
};

export default AvailableTickets;