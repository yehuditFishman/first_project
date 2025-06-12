import React from "react";
import { Button, Typography, Container, Paper, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ManagerPanel = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3, textAlign: "center", background: "linear-gradient(135deg,#f8fafc 0%,#e0e7ff 100%)" }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", mb: 3 }}>
          אזור מנהל
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, alignItems: "center", mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3, fontWeight: "bold", fontSize: 20, borderRadius: 3, px: 4, py: 1 }}
            onClick={() => navigate("/flights-list")}
          >
            הצג טיסות קיימות
          </Button>
          <Button
            variant="contained"
            color="secondary"
            sx={{ mt: 3, ml: 2, fontWeight: "bold", fontSize: 20, borderRadius: 3, px: 4, py: 1 }}
            onClick={() => navigate("/add-flight")}
          >
            הוסף טיסה
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ManagerPanel;
