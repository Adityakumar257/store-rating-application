import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUser, logoutUser } from '../../utils/auth';

const Navbar = () => {
  const navigate = useNavigate();
  const user = getUser();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  // Get the dashboard route based on user role
  const getDashboardLink = () => {
    if (!user?.role) return '/';
    const role = user.role.toLowerCase();
    return `/dashboard/${role}`;
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-2xl font-bold">
        StoreRating
      </Link>

      <div className="space-x-4 flex items-center">
        {!user ? (
          <>
            <Link to="/login" className="hover:text-gray-300">
              Login
            </Link>
            <Link to="/register" className="hover:text-gray-300">
              Register
            </Link>
          </>
        ) : (
          <>
            <Link
              to={getDashboardLink()}
              className="hover:text-gray-300 underline"
            >
              Dashboard
            </Link>
            <span className="text-gray-300">
              Hello, {user.name || user.email}
            </span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
