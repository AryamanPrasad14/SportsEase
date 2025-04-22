import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
//abcd
import HomePage from "./pages/HomePage";
import VenuesPage from "./pages/VenuesPage";
import VenueDetailPage from "./pages/VenueDetailPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";

// Dashboards
import UserDashboard from "./pages/dashboard/UserDashboard";
import VenueOwnerDashboard from "./pages/dashboard/VenueOwnerDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";

import { useAuth } from "./contexts/auth-context";

// Minimal ProtectedRoute logic
const ProtectedRoute = ({ element, allowedRoles, userRole }) => {
  if (!userRole || !allowedRoles.includes(userRole)) {
    return <NotFoundPage />;
  }
  return element;
};

function App() {
  const { currentUser } = useAuth();
  const currentUserRole = currentUser?.role || null;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <Box component="main" sx={{ flex: 1 }}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/venues" element={<VenuesPage />} />
          <Route path="/venues/:id" element={<VenueDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Dashboard Routes */}
          <Route
            path="/dashboard/user"
            element={
              <ProtectedRoute
                element={<UserDashboard />}
                allowedRoles={["user"]}
                userRole={currentUserRole}
              />
            }
          />
          <Route
            path="/dashboard/venue-owner"
            element={
              <ProtectedRoute
                element={<VenueOwnerDashboard />}
                allowedRoles={["venueOwner"]}
                userRole={currentUserRole}
              />
            }
          />
          <Route
            path="/dashboard/admin"
            element={
              <ProtectedRoute
                element={<AdminDashboard />}
                allowedRoles={["admin"]}
                userRole={currentUserRole}
              />
            }
          />

          {/* Fallback */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
