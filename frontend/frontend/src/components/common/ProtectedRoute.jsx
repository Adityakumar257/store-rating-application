import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken, getUser } from '../../utils/auth';

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const token = getToken();
  const user = getUser();
  const userRole = user?.role?.toLowerCase();

  // ✅ If not logged in
  if (!token || !userRole) {
    return <Navigate to="/login" replace />;
  }

  // ✅ If user role is not permitted
  if (!allowedRoles.map(role => role.toLowerCase()).includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  // ✅ Authorized
  return children;
};

export default ProtectedRoute;
