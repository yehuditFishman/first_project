import React from "react";
import { Button, Typography, Container, Paper, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const FlightAddedSuccess = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper elevation={6} sx={{
        p: 6,
        borderRadius: 5,
        background: "linear-gradient(135deg,#d1fae5 0%,#a7f3d0 100%)",
        textAlign: "center",
        boxShadow: "0 8px 32px 0 rgba(16,185,129,0.2)"
      }}>
        <CheckCircleIcon sx={{ fontSize: 80, color: '#10b981', mb: 2 }} />
        <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2, color: '#047857' }}>
          הטיסה נוספה בהצלחה!
        </Typography>
        <Typography variant="h6" sx={{ mb: 4, color: '#047857' }}>
          ניתן כעת לצפות בטיסה ברשימת הטיסות או להוסיף טיסה נוספת.
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ px: 4, py: 1.5, fontWeight: "bold", fontSize: 18, borderRadius: 3 }}
            onClick={() => navigate("/flights-list")}
          >
            מעבר לרשימת טיסות
          </Button>
          <Button
            variant="outlined"
            color="success"
            sx={{ px: 4, py: 1.5, fontWeight: "bold", fontSize: 18, borderRadius: 3 }}
            onClick={() => navigate("/add-flight")}
          >
            הוסף טיסה נוספת
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default FlightAddedSuccess;
