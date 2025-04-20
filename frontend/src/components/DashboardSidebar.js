// components/DashboardSidebar.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const DashboardSidebar = () => {
  const { role } = useContext(AuthContext);

  return (
    <nav>
      {role === 'user' && <Link to="/dashboard/user">User Home</Link>}
      {role === 'owner' && <Link to="/dashboard/owner">Owner Panel</Link>}
      {role === 'admin' && <Link to="/dashboard/admin">Admin Control</Link>}
    </nav>
  );
};

export default DashboardSidebar;
