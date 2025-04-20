import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Rating,
  Button,
  CardActionArea,
  CardActions,
} from "@mui/material";
import { MapPin, Clock } from "lucide-react";

export default function VenueCard({ venue }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.3s ease-in-out",
        transform: isHovered ? "translateY(-8px)" : "none",
        "&:hover": {
          boxShadow: 6,
        },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardActionArea component={RouterLink} to={`/venues/${venue.id}`}>
        <CardMedia
          component="img"
          height="160"
          image={venue.image || "/placeholder.jpg"}
          alt={venue.name}
        />

        <CardContent sx={{ flexGrow: 1 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 1,
            }}
          >
            <Chip
              label={venue.sport?.charAt(0).toUpperCase() + venue.sport?.slice(1)}
              color="primary"
              size="small"
            />
            <Typography
              variant="h6"
              color="primary.main"
              fontWeight="bold"
              component="span"
            >
              ₹{venue.price}/hr
            </Typography>
          </Box>

          <Typography variant="h6" component="h2" gutterBottom>
            {venue.name}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
            <MapPin size={16} />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
              {venue.location}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Rating
              value={venue.rating || 0}
              precision={0.5}
              readOnly
              size="small"
            />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
              ({venue.rating})
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Clock size={16} />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 0.5 }}>
              {venue.availableTimes?.length || 0} available time slots
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          variant="contained"
          fullWidth
          component={RouterLink}
          to={`/venues/${venue.id}`}
        >
          Book Now
        </Button>
      </CardActions>
    </Card>
  );
}
