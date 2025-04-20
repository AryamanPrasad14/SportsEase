import { useState, useEffect } from "react"
import { Container, Typography, Box, Grid, Pagination, CircularProgress } from "@mui/material"
import VenueCard from "../components/VenueCard"
import SearchFilters from "../components/SearchFilters"

export default function VenuesPage() {
  const [venues, setVenues] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState({
    sport: "",
    location: "",
    date: "",
    priceRange: [0, 200],
  })

  const venuesPerPage = 6

  useEffect(() => {
    // In a real app, this would fetch from your API with pagination //
    const fetchVenues = async () => {
      try {
        // Simulating API call //
        setTimeout(() => {
          const mockVenues = [
            {
              id: "1",
              name: "Football Ground",
              location: "Azara, Guwahati",
              sport: "Football",
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
              sport: "Cricket",
              price: 120,
              rating: 4.6,
              image: "https://placehold.co/300x200?text=Cricket+Stadium",
              availableTimes: ["11:00 AM", "2:00 PM", "5:00 PM", "7:00 PM"],
            },
            {
              id: "5",
              name: "Football Arena",
              location: "ABC, Guwahati",
              sport: "Football",
              price: 90,
              rating: 4.3,
              image: "https://placehold.co/300x200?text=Football+Arena",
              availableTimes: ["9:00 AM", "12:00 PM", "3:00 PM", "6:00 PM"],
            },
            {
              id: "6",
              name: "Basketball Center",
              location: "Ganeshguri, Guwahati",
              sport: "basketball",
              price: 55,
              rating: 4.1,
              image: "https://placehold.co/300x200?text=Basketball+Center",
              availableTimes: ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM"],
            },
            {
              id: "7",
              name: "Tennis Courts",
              location: "Beltola, Guwahati",
              sport: "tennis",
              price: 40,
              rating: 4.7,
              image: "https://placehold.co/300x200?text=Tennis+Courts",
              availableTimes: ["8:00 AM", "11:00 AM", "2:00 PM", "5:00 PM"],
            },
            {
              id: "8",
              name: "Cricket Ground",
              location: "Khanapara, Guwahati",
              sport: "cricket",
              price: 110,
              rating: 4.4,
              image: "https://placehold.co/300x200?text=Cricket+Ground",
              availableTimes: ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM"],
            },
          ]
          setVenues(mockVenues)
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
    setPage(1) // Reset to first page when filters change //
  }

  const handlePageChange = (event, value) => {
    setPage(value)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const filteredVenues = venues.filter((venue) => {
    if (filters.sport && venue.sport !== filters.sport.toLowerCase()) {
      return false
    }
    if (filters.location && !venue.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false
    }
    if (venue.price < filters.priceRange[0] || venue.price > filters.priceRange[1]) {
      return false
    }
    return true
  })

  // Calculate pagination
  const totalPages = Math.ceil(filteredVenues.length / venuesPerPage)
  const displayedVenues = filteredVenues.slice((page - 1) * venuesPerPage, page * venuesPerPage)

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        All Sports Venues
      </Typography>

      <Box sx={{ mb: 4 }}>
        <SearchFilters filters={filters} onFilterChange={handleFilterChange} showPriceFilter={true} />
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1">{filteredVenues.length} venues found</Typography>
          </Box>

          <Grid container spacing={3}>
            {displayedVenues.map((venue) => (
              <Grid item xs={12} sm={6} md={4} key={venue.id}>
                <VenueCard venue={venue} />
              </Grid>
            ))}
          </Grid>

          {totalPages > 1 && (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Pagination count={totalPages} page={page} onChange={handlePageChange} color="primary" size="large" />
            </Box>
          )}

          {filteredVenues.length === 0 && (
            <Box sx={{ textAlign: "center", my: 8 }}>
              <Typography variant="h5">No venues match your search criteria</Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                Try adjusting your filters to find more venues
              </Typography>
            </Box>
          )}
        </>
      )}
    </Container>
  )
}

