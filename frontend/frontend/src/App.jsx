// 📁 src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/common/Navbar';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import UserDashboard from './components/Dashboard/UserDashboard';
import OwnerDashboard from './components/Dashboard/OwnerDashboard';
import ProtectedRoute from './components/common/ProtectedRoute';
import { getToken, getRole } from './utils/auth';

const RedirectToRoleDashboard = () => {
  const token = getToken();
  const role = getRole();

  if (!token) return <Navigate to="/login" />;
  if (role === 'admin') return <Navigate to="/dashboard/admin" />;
  if (role === 'owner') return <Navigate to="/dashboard/owner" />;
  if (role === 'user') return <Navigate to="/dashboard/user" />;

  return <Navigate to="/login" />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Redirect based on role */}
        <Route path="/" element={<RedirectToRoleDashboard />} />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/user"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/owner"
          element={
            <ProtectedRoute allowedRoles={['owner']}>
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </BrowserRouter>
  );
};

export default App;
