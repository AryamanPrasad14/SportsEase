import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Box, Button, Typography, Paper, Divider, Grid, Alert, CircularProgress } from "@mui/material"
import { Calendar, Clock, CheckCircle } from "lucide-react"
import { useAuth } from "../contexts/auth-context"

export default function BookingForm({ venue, onDateSelect, selectedDate }) {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [selectedTime, setSelectedTime] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [bookingError, setBookingError] = useState("")

  const handleDateClick = (date) => {
    onDateSelect(date)
    setSelectedTime(null)
  }

  const handleTimeClick = (time) => {
    setSelectedTime(time)
  }

  const handleBooking = async () => {
    if (!user) {
      navigate(`/login?redirect=/venues/${venue.id}`)
      return
    }

    if (!selectedDate || !selectedTime) {
      setBookingError("Please select both a date and time")
      return
    }

    setIsSubmitting(true)
    setBookingError("")

    try {
      // In a real app, this would call your API
      await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate API call

      setBookingSuccess(true)

      // Redirect to confirmation page after a delay
      setTimeout(() => {
        navigate("/booking-confirmation?id=123")
      }, 2000)
    } catch (error) {
      console.error("Booking error:", error)
      setBookingError("An error occurred while booking. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const getAvailableTimesForDate = (date) => {
    const dateObj = venue.availableDates.find((d) => d.date === date)
    return dateObj ? dateObj.times : []
  }

  return (
    <Box>
      {bookingSuccess ? (
        <Alert icon={<CheckCircle />} severity="success" sx={{ mb: 2 }}>
          Booking successful! Redirecting to confirmation page...
        </Alert>
      ) : bookingError ? (
        <Alert severity="error" sx={{ mb: 2 }}>
          {bookingError}
        </Alert>
      ) : null}

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" fontWeight="medium" sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Calendar size={18} style={{ marginRight: 8 }} />
          Select Date
        </Typography>
        <Grid container spacing={1}>
          {venue.availableDates.map((dateObj) => (
            <Grid item xs={4} key={dateObj.date}>
              <Paper
                elevation={0}
                sx={{
                  p: 1,
                  textAlign: "center",
                  cursor: "pointer",
                  bgcolor: selectedDate === dateObj.date ? "primary.light" : "background.paper",
                  border: 1,
                  borderColor: selectedDate === dateObj.date ? "primary.main" : "divider",
                  "&:hover": {
                    borderColor: "primary.main",
                  },
                }}
                onClick={() => handleDateClick(dateObj.date)}
              >
                <Typography variant="body2">
                  {new Date(dateObj.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {selectedDate && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" fontWeight="medium" sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Clock size={18} style={{ marginRight: 8 }} />
            Select Time
          </Typography>
          <Grid container spacing={1}>
            {getAvailableTimesForDate(selectedDate).map((time) => (
              <Grid item xs={6} key={time}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 1,
                    textAlign: "center",
                    cursor: "pointer",
                    bgcolor: selectedTime === time ? "primary.light" : "background.paper",
                    border: 1,
                    borderColor: selectedTime === time ? "primary.main" : "divider",
                    "&:hover": {
                      borderColor: "primary.main",
                    },
                  }}
                  onClick={() => handleTimeClick(time)}
                >
                  <Typography variant="body2">{time}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      <Divider sx={{ my: 3 }} />

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
          Booking Summary
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Venue
          </Typography>
          <Typography variant="body2">{venue.name}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Date
          </Typography>
          <Typography variant="body2">
            {selectedDate ? new Date(selectedDate).toLocaleDateString() : "Not selected"}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Time
          </Typography>
          <Typography variant="body2">{selectedTime || "Not selected"}</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Duration
          </Typography>
          <Typography variant="body2">2 hours</Typography>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="subtitle1" fontWeight="medium">
            Total
          </Typography>
          <Typography variant="subtitle1" fontWeight="medium">
            ${venue.price * 2}
          </Typography>
        </Box>
      </Box>

      <Button
        variant="contained"
        fullWidth
        size="large"
        onClick={handleBooking}
        disabled={!selectedDate || !selectedTime || isSubmitting}
        sx={{ py: 1.5 }}
      >
        {isSubmitting ? <CircularProgress size={24} color="inherit" /> : user ? "Book Now" : "Login to Book"}
      </Button>
    </Box>
  )
}

