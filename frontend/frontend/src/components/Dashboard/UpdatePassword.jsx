import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { getToken } from '../../utils/auth';

const UpdatePassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const { oldPassword, newPassword, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!oldPassword || !newPassword || !confirmPassword) {
      return toast.error('All fields are required');
    }

    if (newPassword !== confirmPassword) {
      return toast.error('New passwords do not match');
    }

    try {
      const response = await axios.put(
        '/api/users/update-password',
        { oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      toast.success(response.data.message || 'Password updated successfully');
      setFormData({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      const message =
        err.response?.data?.message || 'Failed to update password';
      toast.error(message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Update Password</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          name="oldPassword"
          placeholder="Old Password"
          value={oldPassword}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-xl"
        />
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={newPassword}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-xl"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-xl"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;
