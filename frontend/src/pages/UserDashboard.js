// pages/dashboard/UserDashboard.js
import React from 'react';
import { Typography, Box } from '@mui/material';
import DashboardHeader from '../../components/DashboardHeader';

const UserDashboard = () => {
  return (
    <>
      <DashboardHeader title="User Dashboard" />
      <Box p={3}>
        <Typography variant="h5">Welcome to your dashboard!</Typography>
        <Typography>Track your bookings and explore new venues.</Typography>
      </Box>
    </>
  );
};

export default UserDashboard;
