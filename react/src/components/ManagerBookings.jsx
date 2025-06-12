import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Button
} from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ManagerBookings = () => {
  const { id } = useParams();
  // נחלץ את מזהה הטיסה בלבד (ללא המחרוזת 'manager')
  const flightId = id.replace(/^manager/i, '');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;
    const fetchBookings = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await fetch(`http://localhost:5137/api/Bookings/manager${flightId}`);
        if (!response.ok) throw new Error();
        const data = await response.json();
        if (!ignore) setBookings(data);
      } catch {
        if (!ignore) setError("אירעה שגיאה בטעינת נתוני ההזמנות");
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    fetchBookings();
    return () => { ignore = true; };
  }, [flightId]);

  return (
    <Container maxWidth="md" sx={{ mt: 10 }}>
      <Paper elevation={6} sx={{ p: 5, borderRadius: 4, background: "linear-gradient(135deg,#f8fafc 0%,#e0e7ff 100%)" }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Button onClick={() => navigate(-1)} startIcon={<ArrowBackIcon />} color="primary" sx={{ mr: 2 }}>
            חזור
          </Button>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            כל הכרטיסים לטיסה {flightId}
          </Typography>
        </Box>
        {loading && (
          <Box sx={{ mt: 4 }}>
            <CircularProgress />
          </Box>
        )}
        {error && (
          <Alert severity="error" sx={{ mt: 3 }}>{error}</Alert>
        )}
        {!loading && bookings.length === 0 && (
          <Typography sx={{ mt: 4 }}>לא נמצאו כרטיסים לטיסה זו</Typography>
        )}
        <Box sx={{ mt: 4, display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
          {bookings.map((b, idx) => (
            <Paper key={idx} elevation={4} sx={{
              p: 3,
              borderRadius: 4,
              background: 'linear-gradient(90deg,#e0e7ff 0%,#f8fafc 100%)',
              boxShadow: '0 4px 24px 0 rgba(99,102,241,0.10)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              border: b.status ? '2px solid #10b981' : '2px solid #6366f1',
              position: 'relative',
              minHeight: 120
            }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#6366f1', mb: 1 }}>
                מספר כרטיס: {b.id}
              </Typography>
              <Typography sx={{ fontSize: 18, mb: 1 }}>
                <b>מחלקה:</b> {b.class}
              </Typography>
              <Typography sx={{ fontSize: 18, fontWeight: 'bold', color: b.status === true || b.status === 1 ? '#10b981' : '#6366f1' }}>
                <b>סטטוס:</b> {(b.status === true || b.status === 1) ? 'תפוס' : 'זמין'}
              </Typography>
              {(b.status === true || b.status === 1) && (
                <Box sx={{ position: 'absolute', top: 12, left: 16, color: '#10b981', fontWeight: 'bold', fontSize: 16 }}>
                  ●
                </Box>
              )}
              {(b.status === false || b.status === 0) && (
                <Box sx={{ position: 'absolute', top: 12, left: 16, color: '#6366f1', fontWeight: 'bold', fontSize: 16 }}>
                  ○
                </Box>
              )}
            </Paper>
          ))}
        </Box>
      </Paper>
    </Container>
  );
};

export default ManagerBookings;
