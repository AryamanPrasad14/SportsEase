import { useState } from "react"
import {
  Box,
  TextField,
  Button,
  Grid,
  InputAdornment,
  Paper,
  Slider,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material"
import { Search, MapPin, Calendar, DollarSign } from "lucide-react"

export default function SearchFilters({ filters, onFilterChange, showPriceFilter = false }) {
  const [localFilters, setLocalFilters] = useState({
    sport: filters.sport || "",
    location: filters.location || "",
    date: filters.date || "",
    priceRange: filters.priceRange || [0, 200],
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setLocalFilters((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePriceChange = (_, newValue) => {
    setLocalFilters((prev) => ({
      ...prev,
      priceRange: newValue,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onFilterChange(localFilters)
  }

  const handleReset = () => {
    const resetFilters = {
      sport: "",
      location: "",
      date: "",
      priceRange: [0, 200],
    }
    setLocalFilters(resetFilters)
    onFilterChange(resetFilters)
  }

  return (
    <Paper sx={{ p: { xs: 2, sm: 3 }, mb: 4, borderRadius: 2 }}>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {/* Sport */}
          <Grid item xs={12} sm={showPriceFilter ? 6 : 4} md={3}>
            <FormControl fullWidth>
              <InputLabel id="sport-select-label">Sport</InputLabel>
              <Select
                labelId="sport-select-label"
                name="sport"
                value={localFilters.sport}
                label="Sport"
                onChange={handleInputChange}
              >
                <MenuItem value="">All Sports</MenuItem>
                <MenuItem value="cricket">Cricket</MenuItem>
                <MenuItem value="basketball">Basketball</MenuItem>
                <MenuItem value="tennis">Tennis</MenuItem>
                <MenuItem value="soccer">Soccer</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Location */}
          <Grid item xs={12} sm={showPriceFilter ? 6 : 4} md={3}>
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={localFilters.location}
              onChange={handleInputChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MapPin size={20} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Date */}
          <Grid item xs={12} sm={showPriceFilter ? 6 : 4} md={3}>
            <TextField
              fullWidth
              label="Date"
              name="date"
              type="date"
              value={localFilters.date}
              onChange={handleInputChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Calendar size={20} />
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>

          {/* Price Filter */}
          {showPriceFilter && (
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ px: 1 }}>
                <Typography gutterBottom>Price Range</Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <DollarSign size={16} />
                  <Slider
                    value={localFilters.priceRange}
                    onChange={handlePriceChange}
                    valueLabelDisplay="auto"
                    min={0}
                    max={200}
                    sx={{ ml: 1 }}
                  />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                  ₹{localFilters.priceRange[0]}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                  ₹{localFilters.priceRange[1]}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          )}

          {/* Search & Reset Buttons */}
          <Grid item xs={12} sm={6} md={showPriceFilter ? 6 : 3}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              startIcon={<Search />}
              sx={{ height: "100%", minHeight: "56px" }}
            >
              Search
            </Button>
          </Grid>

          <Grid item xs={12} sm={6} md={showPriceFilter ? 6 : 3}>
            <Button
              type="button"
              variant="outlined"
              fullWidth
              onClick={handleReset}
              sx={{ height: "100%", minHeight: "56px" }}
            >
              Reset Filters
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}
