import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, role }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  if (!token) {
    // Not logged in, redirect to appropriate login page
    return <Navigate to={role === 'admin' ? '/admin-login' : '/student-login'} replace />;
  }

  if (role && role !== userRole) {
    // Wrong role, redirect to appropriate dashboard
    return <Navigate to={userRole === 'admin' ? '/admin' : '/dashboard'} replace />;
  }

  // Logged in with correct role, render the child component
  return children;
};

export default PrivateRoute;
