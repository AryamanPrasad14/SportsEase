import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Chip,
  Rating,
  Divider,
  CircularProgress,
  Tab,
  Tabs,
} from "@mui/material"
import {
  MapPin,
  Clock,
  DollarSign,
  Users,
  CheckCircle,
  Star,
} from "lucide-react"
import BookingForm from "../components/BookingForm"

export default function VenueDetailPage() {
  const { id } = useParams()
  const [venue, setVenue] = useState(null)
  const [loading, setLoading] = useState(true)
  const [tabValue, setTabValue] = useState(0)
  const [selectedDate, setSelectedDate] = useState(null)

  useEffect(() => {
    const fetchVenue = async () => {
      try {
        setTimeout(() => {
          const mockVenue = {
            id,
            name: "Football Field",
            description:
              "A premium soccer field located in the heart of downtown. Perfect for friendly matches, team practice, or tournaments. Features high-quality artificial turf, floodlights for evening games, and changing facilities.",
            location: "Azara, Guwahati",
            sport: "Football",
            price: 75,
            rating: 4.5,
            image: "https://placehold.co/800x400?text=Football+Field",
            amenities: [
              "Changing Rooms",
              "Showers",
              "Parking",
              "Floodlights",
              "Equipment Rental",
            ],
            capacity: 22,
            availableDates: [
              {
                date: "2025-04-02",
                times: ["9:00 AM", "11:00 AM", "3:00 PM", "5:00 PM"],
              },
              {
                date: "2025-04-03",
                times: ["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM"],
              },
              {
                date: "2025-04-04",
                times: ["9:00 AM", "11:00 AM", "1:00 PM", "3:00 PM", "5:00 PM"],
              },
            ],
            reviews: [
              {
                id: 1,
                user: "John D.",
                rating: 5,
                date: "March 15, 2025",
                comment:
                  "Excellent field! The turf is well-maintained and the facilities are clean.",
              },
              {
                id: 2,
                user: "Sarah M.",
                rating: 4,
                date: "March 10, 2025",
                comment:
                  "Great location and good amenities. Booking was easy and staff were helpful.",
              },
              {
                id: 3,
                user: "Michael T.",
                rating: 4.5,
                date: "March 5, 2025",
                comment:
                  "Perfect for our weekly games. The floodlights are great for evening matches.",
              },
            ],
          }

          setVenue(mockVenue)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching venue:", error)
        setLoading(false)
      }
    }

    if (id) {
      fetchVenue()
    }
  }, [id])

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleDateSelect = (date) => {
    setSelectedDate(date)
  }

  if (loading) {
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <CircularProgress />
      </Container>
    )
  }

  if (!venue) {
    return (
      <Container sx={{ py: 8, textAlign: "center" }}>
        <Typography variant="h4">Venue not found</Typography>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              height: 400,
              mb: 3,
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <img
              src={venue.image || "/placeholder.svg"}
              alt={venue.name}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </Box>

          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Chip
                label={venue.sport.charAt(0).toUpperCase() + venue.sport.slice(1)}
                color="primary"
                size="small"
                sx={{ mr: 2 }}
              />
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Rating value={venue.rating} precision={0.5} readOnly size="small" />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  ({venue.reviews.length} reviews)
                </Typography>
              </Box>
            </Box>
            <Typography variant="h3" component="h1" gutterBottom>
              {venue.name}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <MapPin size={18} />
              <Typography variant="body1" sx={{ ml: 1 }}>
                {venue.location}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 2 }}>
              <Tab label="Details" />
              <Tab label="Amenities" />
              <Tab label="Reviews" />
            </Tabs>

            <Divider sx={{ mb: 3 }} />

            {tabValue === 0 && (
              <Box>
                <Typography variant="h5" gutterBottom>
                  About this venue
                </Typography>
                <Typography variant="body1" paragraph>
                  {venue.description}
                </Typography>

                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={6} sm={3}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <DollarSign size={24} />
                      <Typography variant="body2" sx={{ mt: 1 }}>
                      ₹{venue.price}/hour
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Users size={24} />
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        Capacity: {venue.capacity}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Clock size={24} />
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        2 hour slots
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sm={3}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <CheckCircle size={24} />
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        Instant booking
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            )}

            {tabValue === 1 && (
              <Box>
                <Typography variant="h5" gutterBottom>
                  Amenities
                </Typography>
                <Grid container spacing={2}>
                  {venue.amenities.map((amenity) => (
                    <Grid item xs={12} sm={6} key={amenity}>
                      <Paper sx={{ p: 2, display: "flex", alignItems: "center" }}>
                        <CheckCircle size={20} color="#4CAF50" />
                        <Typography variant="body1" sx={{ ml: 2 }}>
                          {amenity}
                        </Typography>
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            )}

            {tabValue === 2 && (
              <Box>
                <Typography variant="h5" gutterBottom>
                  Reviews
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Star size={24} color="#FFB400" />
                    <Typography variant="h4" sx={{ ml: 1, mr: 2 }}>
                      {venue.rating}
                    </Typography>
                    <Typography variant="body1">
                      {venue.reviews.length} reviews
                    </Typography>
                  </Box>
                </Box>

                {venue.reviews.map((review) => (
                  <Paper key={review.id} sx={{ p: 3, mb: 2 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {review.user}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {review.date}
                      </Typography>
                    </Box>
                    <Rating
                      value={review.rating}
                      precision={0.5}
                      readOnly
                      size="small"
                      sx={{ mb: 1 }}
                    />
                    <Typography variant="body1">{review.comment}</Typography>
                  </Paper>
                ))}
              </Box>
            )}
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 2, position: "sticky", top: 20 }}>
            <Typography variant="h5" gutterBottom>
              Book this venue
            </Typography>
            <Typography variant="h4" sx={{ mb: 3 }}>
            ₹{venue.price}
              <Typography variant="body1" component="span" color="text.secondary">
                /hour
              </Typography>
            </Typography>

            <BookingForm
              venue={venue}
              onDateSelect={handleDateSelect}
              selectedDate={selectedDate}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}
