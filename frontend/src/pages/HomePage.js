import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Container, Typography, Box, Grid, Button } from "@mui/material"
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import VenueCard from "../components/VenueCard"
import SearchFilters from "../components/SearchFilters"

export default function HomePage() {
  const [venues, setVenues] = useState([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({ sport: "", location: "", date: "" })

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        setTimeout(() => {
          setVenues([
            {
              id: "1",
              name: "Football Ground",
              location: "Azara, Guwahati",
              sport: "football",
              price: 75,
              rating: 4.5,
              image: "https://placehold.co/300x200?text=Football+Ground",
              availableTimes: ["9:00 AM", "11:00 AM", "3:00 PM", "5:00 PM"],
            },
            {
              id: "2",
              name: "Basketball Court",
              location: "Dharapur, Guwahati",
              sport: "basketball",
              price: 60,
              rating: 4.2,
              image: "https://placehold.co/300x200?text=Basketball+Court",
              availableTimes: ["10:00 AM", "12:00 PM", "2:00 PM", "6:00 PM"],
            },
            {
              id: "3",
              name: "Tennis Club",
              location: "Jalukbari, Guwahati",
              sport: "tennis",
              price: 45,
              rating: 4.8,
              image: "https://placehold.co/300x200?text=Tennis+Club",
              availableTimes: ["8:00 AM", "10:00 AM", "1:00 PM", "4:00 PM"],
            },
            {
              id: "4",
              name: "Cricket Stadium",
              location: "Maligaon, Guwahati",
              sport: "cricket",
              price: 120,
              rating: 4.6,
              image: "https://placehold.co/300x200?text=Cricket+Stadium",
              availableTimes: ["11:00 AM", "2:00 PM", "5:00 PM", "7:00 PM"],
            },
          ])
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching venues:", error)
        setLoading(false)
      }
    }

    fetchVenues()
  }, [])

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters })
  }

  const filteredVenues = venues.filter((venue) => {
    if (filters.sport && venue.sport !== filters.sport.toLowerCase()) return false
    if (filters.location && !venue.location.toLowerCase().includes(filters.location.toLowerCase())) return false
    return true
  })

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 6, textAlign: "center" }}>
        <Typography variant="h2" gutterBottom sx={{ fontWeight: "bold" }}>
          Book Your Perfect Sports Venue
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
          Find and reserve the best sports facilities in your area
        </Typography>
        <Button
          variant="contained"
          size="large"
          component={Link}
          to="/venues"
          sx={{ borderRadius: 2, px: 4, py: 1.5, fontSize: "1.1rem", textTransform: "none" }}
        >
          Browse All Venues
        </Button>
      </Box>

      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
          Popular Sports
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {[
            { name: "Cricket", icon: <SportsCricketIcon size={40} />, value: "cricket" },
            { name: "Basketball", icon: <SportsBasketballIcon size={40} />, value: "basketball" },
            { name: "Tennis", icon: <SportsTennisIcon size={40} />, value: "tennis" },
            { name: "Football", icon: <SportsSoccerIcon size={40} />, value: "football" },
          ].map((sport) => (
            <Grid item xs={6} sm={3} key={sport.name}>
              <Box
                onClick={() => handleFilterChange({ sport: sport.value })}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  p: 2,
                  borderRadius: 2,
                  cursor: "pointer",
                  transition: "all 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 3,
                  },
                  bgcolor: filters.sport === sport.value ? "primary.light" : "background.paper",
                }}
              >
                {sport.icon}
                <Typography variant="subtitle1" sx={{ mt: 1 }}>
                  {sport.name}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" gutterBottom>Find Your Venue</Typography>
        <SearchFilters filters={filters} onFilterChange={handleFilterChange} />
      </Box>

      <Box>
        <Typography variant="h4" gutterBottom>Featured Venues</Typography>
        {loading ? (
          <Typography>Loading venues...</Typography>
        ) : (
          <Grid container spacing={3}>
            {filteredVenues.map((venue) => (
              <Grid item xs={12} sm={6} md={4} key={venue.id}>
                <VenueCard venue={venue} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Container>
  )
}
