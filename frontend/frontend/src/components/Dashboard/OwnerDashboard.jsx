// 📁 src/components/Dashboard/OwnerDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { removeToken } from '../../utils/auth';

const OwnerDashboard = () => {
  const [ratings, setRatings] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const res = await axios.get('/owner/ratings');
        setRatings(res.data.ratings);
        setAvgRating(res.data.average);
      } catch (error) {
        console.error('Error fetching ratings:', error);
      }
    };

    fetchRatings();
  }, []);

  const handleLogout = () => {
    removeToken();
    localStorage.removeItem('role');
    navigate('/login');
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/owner/update-password', {
        currentPassword,
        newPassword,
      });
      setMessage('✅ Password updated successfully!');
      setCurrentPassword('');
      setNewPassword('');
    } catch (error) {
      setMessage('❌ Error updating password');
      console.error(error);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Store Owner Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">
          Logout
        </button>
      </div>

      <p className="mb-4 font-medium">📈 Average Rating: <span className="text-blue-600">{avgRating.toFixed(1)}</span></p>

      <h2 className="text-lg font-semibold mb-2">👥 Users Who Rated Your Store</h2>
      {ratings.length > 0 ? (
        <table className="w-full mt-2 border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Email</th>
              <th className="border px-4 py-2 text-left">Rating</th>
            </tr>
          </thead>
          <tbody>
            {ratings.map(r => (
              <tr key={r.id} className="border-t">
                <td className="border px-4 py-2">{r.user.name}</td>
                <td className="border px-4 py-2">{r.user.email}</td>
                <td className="border px-4 py-2">{r.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-600">No ratings available.</p>
      )}

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">🔐 Update Password</h2>
        <form onSubmit={handlePasswordUpdate} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Update Password
          </button>
        </form>
        {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
      </div>
    </div>
  );
};

export default OwnerDashboard;
