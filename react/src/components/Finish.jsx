import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography, Container, Paper } from "@mui/material";

const Finish = () => (
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
        <Typography variant="h3" gutterBottom color="success.main">
          תודה!
        </Typography>
        <Typography variant="h5" gutterBottom>
          ההזמנה והתשלום בוצעו בהצלחה.
        </Typography>
        <Typography sx={{ mt: 3 }}>
          אישור ההזמנה נשלח אליך למייל.<br />
          נשמח לראותך בטיסות הבאות!
        </Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          color="primary"
          sx={{ mt: 4, px: 6, py: 2, fontSize: 18, borderRadius: 3 }}
        >
          חזרה לדף הבית
        </Button>
      </Paper>
    </Container>
  </>
);

export default Finish;