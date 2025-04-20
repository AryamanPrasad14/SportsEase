import { Link as RouterLink } from "react-router-dom"
import { Container, Typography, Box, Button } from "@mui/material"

export default function NotFoundPage() {
  return (
    <Container maxWidth="md" sx={{ py: 8, textAlign: "center" }}>
      <Typography variant="h1" component="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h4" component="h2" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        The page you are looking for doesn't exist or has been moved.
      </Typography>
      <Box>
        <Button variant="contained" component={RouterLink} to="/" size="large">
          Back to Home
        </Button>
      </Box>
    </Container>
  )
}

