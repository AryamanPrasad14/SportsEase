// components/DashboardHeader.js
import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { AuthContext } from '../contexts/AuthContext';

const DashboardHeader = ({ title }) => {
  const { user } = useContext(AuthContext);

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center">
          <IconButton color="inherit" edge="start" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            {title || 'Dashboard'}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Typography variant="body1" sx={{ mr: 2 }}>
            {user?.email}
          </Typography>
          <Avatar alt={user?.displayName || 'User'} src={user?.photoURL || ''} />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardHeader;
