import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../utils/api';
import { setToken, setUser, getRole, logoutUser } from '../../utils/auth';

const LoginForm = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', formData);
      const { token, user } = res.data;

      // ✅ Store token and user in localStorage
      setToken(token);
      setUser(user);

      // ✅ Redirect user to respective dashboard (case-sensitive route paths)
      const role = user.role.toLowerCase();
      if (role === 'admin') {
        navigate('/dashboard/admin');
      } else if (role === 'owner') {
        navigate('/dashboard/owner');
      } else if (role === 'user') {
        navigate('/dashboard/user');
      } else {
        alert('Unknown user role. Please contact support.');
      }

    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md w-96 space-y-4 mx-auto mt-20"
    >
      <h2 className="text-2xl font-semibold text-center">Login</h2>

      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full p-2 border rounded"
        value={formData.email}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full p-2 border rounded"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Login
      </button>

      <p className="text-sm text-center">
        Not registered?{' '}
        <Link to="/register" className="text-blue-500 hover:underline">
          Register here
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
