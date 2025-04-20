// routes/DashboardRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import UserDashboard from '../pages/dashboard/UserDashboard';
import AdminDashboard from '../pages/dashboard/AdminDashboard';
import OwnerDashboard from '../pages/dashboard/VenueOwnerDashboard';

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard/user" element={
        <ProtectedRoute role="user">
          <UserDashboard />
        </ProtectedRoute>
      } />
      <Route path="/dashboard/owner" element={
        <ProtectedRoute role="owner">
          <OwnerDashboard />
        </ProtectedRoute>
      } />
      <Route path="/dashboard/admin" element={
        <ProtectedRoute role="admin">
          <AdminDashboard />
        </ProtectedRoute>
      } />
    </Routes>
  );
};

export default DashboardRoutes;
