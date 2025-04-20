import { Link as RouterLink } from "react-router-dom"
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider
} from "@mui/material"
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from "lucide-react"

export default function Footer() {
  return (
    <Box sx={{ bgcolor: "background.paper", py: 6, borderTop: 1, borderColor: "divider" }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" component="h6" gutterBottom>
              SportEase
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              The easiest way to find and book sports venues in your area. Join thousands of sports enthusiasts who
              trust SportEase for their venue booking needs.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton
                component="a"
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </IconButton>
              <IconButton
                component="a"
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </IconButton>
              <IconButton
                component="a"
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </IconButton>
              <IconButton
                component="a"
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </IconButton>
            </Box>
          </Grid>

          <Grid item xs={6} sm={2}>
            <Typography variant="h6" component="h6" gutterBottom fontWeight="bold">
              Quick Links
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Link component={RouterLink} to="/" underline="hover" color="inherit" sx={{ mb: 1 }}>
                Home
              </Link>
              <Link component={RouterLink} to="/venues" underline="hover" color="inherit" sx={{ mb: 1 }}>
                Venues
              </Link>
              <Link component={RouterLink} to="/how-it-works" underline="hover" color="inherit" sx={{ mb: 1 }}>
                About Us
              </Link>
              <Link component={RouterLink} to="/contact" underline="hover" color="inherit" sx={{ mb: 1 }}>
                Contact Us
              </Link>
            </Box>
          </Grid>

          <Grid item xs={6} sm={2}>
            <Typography variant="h6" component="h6" gutterBottom fontWeight="bold">
              Sports
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Link component={RouterLink} to="/venues?sport=soccer" underline="hover" color="inherit" sx={{ mb: 1 }}>
                Cricket
              </Link>
              <Link component={RouterLink} to="/venues?sport=basketball" underline="hover" color="inherit" sx={{ mb: 1 }}>
                Basketball
              </Link>
              <Link component={RouterLink} to="/venues?sport=tennis" underline="hover" color="inherit" sx={{ mb: 1 }}>
                Tennis
              </Link>
              <Link component={RouterLink} to="/venues?sport=football" underline="hover" color="inherit" sx={{ mb: 1 }}>
                Football
              </Link>
            </Box>
          </Grid>

          <Grid item xs={6} sm={2}>
            <Typography variant="h6" component="h6" gutterBottom fontWeight="bold">
              Support
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Link component={RouterLink} to="/faq" underline="hover" color="inherit" sx={{ mb: 1 }}>
                FAQ
              </Link>
              <Link component={RouterLink} to="/terms" underline="hover" color="inherit" sx={{ mb: 1 }}>
                Terms of Service
              </Link>
              <Link component={RouterLink} to="/privacy" underline="hover" color="inherit" sx={{ mb: 1 }}>
                Privacy Policy
              </Link>
              <Link component={RouterLink} to="/help" underline="hover" color="inherit" sx={{ mb: 1 }}>
                Help Center
              </Link>
            </Box>
          </Grid>

          <Grid item xs={6} sm={2}>
            <Typography variant="h6" component="h6" gutterBottom fontWeight="bold">
              Contact
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Aryaman
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Guwahati
              </Typography>
              <Link href="mailto:info@sportspot.com" underline="hover" color="inherit" sx={{ mb: 1 }}>
                info@sportease.com
              </Link>
              <Link href="tel:+11234567890" underline="hover" color="inherit" sx={{ mb: 1 }}>
                (91) 123456789
              </Link>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ mt: 6, mb: 3 }} />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} SportEase. All rights reserved.
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mt: { xs: 2, sm: 0 } }}>
            <Link component={RouterLink} to="/terms" underline="hover" color="inherit" variant="body2">
              Terms
            </Link>
            <Link component={RouterLink} to="/privacy" underline="hover" color="inherit" variant="body2">
              Privacy
            </Link>
            <Link component={RouterLink} to="/cookies" underline="hover" color="inherit" variant="body2">
              Cookies
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
