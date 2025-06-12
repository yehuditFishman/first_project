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
import "../css/Payment.css"; 


const Payment = () => {
  const { id } = useParams();
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlePayment = async (e) => {
    e.preventDefault();
    setError("");
    // בדיקות בסיסיות
    if (
      cardNumber.length !== 16 ||
      !/^\d+$/.test(cardNumber) ||
      cvv.length !== 3 ||
      !/^\d+$/.test(cvv) ||
      !expiry ||
      !name
    ) {
      setError("אנא מלא את כל הפרטים בצורה תקינה");
      return;
    }

    // עדכון סטטוס הכרטיס ב-DB
    try {
      const response = await fetch(`http://localhost:5137/api/Bookings/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        // אם צריך לשלוח גוף כלשהו, הוסף כאן. אם לא, השאר ריק.
      });
      if (!response.ok) throw new Error("שגיאה בעדכון סטטוס הכרטיס");
      setSuccess(true);
      setTimeout(() => {
        navigate("/finish");
      }, 1500);
    } catch {
      setError("אירעה שגיאה בעת עדכון סטטוס הכרטיס");
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
      <Container maxWidth="sm" className="payment-container">
        <Paper elevation={4} className="payment-paper">
          <Typography variant="h4" gutterBottom>
            תשלום עבור כרטיס {id}
          </Typography>
          <Box
            component="form"
            onSubmit={handlePayment}
            className="payment-form"
          >
            <TextField
              label="שם בעל הכרטיס"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              sx={{ minWidth: 250 }}
            />
            <TextField
              label="מספר אשראי"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
              inputProps={{ maxLength: 16 }}
              required
              sx={{ minWidth: 250 }}
            />
            <div className="payment-fields-row">
              <TextField
                label="תוקף (MM/YY)"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                placeholder="MM/YY"
                required
                sx={{ width: 120 }}
                inputProps={{ maxLength: 5 }}
              />
              <TextField
                label="CVV"
                value={cvv}
                onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                inputProps={{ maxLength: 3 }}
                required
                sx={{ width: 80 }}
              />
            </div>
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
              אשר תשלום
            </Button>
          </Box>
          {success && (
            <Typography className="payment-success">
              התשלום בוצע בהצלחה! מעבירים לעמוד סיום...
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

export default Payment;