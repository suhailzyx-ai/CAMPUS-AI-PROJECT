import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getCurrentUser } from '../../services/authService';

/**
 * Route protection component enforcing role boundaries.
 * Prevents Faculty from being redirected to Student views,
 * and blocks Students from Faculty-only or Admin functionality.
 */
export const ProtectedRoute = ({ allowedRoles, children }) => {
  const location = useLocation();
  const user = getCurrentUser();

  if (!user || !user.role) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect unauthorized user to their role-appropriate dashboard
    if (user.role === 'faculty') {
      return <Navigate to="/faculty" replace />;
    }
    if (user.role === 'admin') {
      return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/student" replace />;
  }

  return children;
};
