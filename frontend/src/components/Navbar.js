import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getGreetingName = () => {
    if (!currentUser) return "User";

    switch (currentUser.role) {
      case "admin":
        return "Admin";
      case "venueOwner":
        return "Owner";
      default:
        return currentUser.name || "User";
    }
  };

  const handleDashboardRedirect = () => {
    if (!currentUser) return;

    switch (currentUser.role) {
      case "admin":
        navigate("/dashboard/AdminDashboard");
        break;
      case "venueOwner":
        navigate("/dashboard/VenueOwnerDashboard");
        break;
      default:
        navigate("/dashboard/UserDashboard");
    }
  };

  return (
    <AppBar position="static" color="white" sx={{ px: 2 }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{ textDecoration: "none", color: "inherit", fontWeight: "bold" }}
        >
          SportEase
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button component={RouterLink} to="/" color="inherit">
            Home
          </Button>
          <Button component={RouterLink} to="/venues" color="inherit">
            Venues
          </Button>
          <Button component={RouterLink} to="/about" color="inherit">
            About Us
          </Button>
          <Button component={RouterLink} to="/contact" color="inherit">
            Contact Us
          </Button>

          {currentUser ? (
            <>
              <Button
                onClick={handleDashboardRedirect}
                color="inherit"
                sx={{ fontWeight: 600 }}
              >
                Hi, {getGreetingName()}
              </Button>
              <Button onClick={handleLogout} color="inherit">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button component={RouterLink} to="/login" color="inherit">
                Login
              </Button>
              <Button component={RouterLink} to="/register" color="inherit">
                Register
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
