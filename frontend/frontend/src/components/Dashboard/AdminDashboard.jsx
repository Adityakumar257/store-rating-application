// 📁 src/components/Dashboard/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from '../../utils/api';

const AdminDashboard = () => {
  const [summary, setSummary] = useState({});
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [searchUser, setSearchUser] = useState('');
  const [searchStore, setSearchStore] = useState('');
  const [sortUserField, setSortUserField] = useState('');
  const [sortStoreField, setSortStoreField] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [res1, res2, res3] = await Promise.all([
          axios.get('/admin/summary'),
          axios.get('/admin/users'),
          axios.get('/admin/stores'),
        ]);
        setSummary(res1.data);
        setUsers(res2.data);
        setStores(res3.data);
      } catch (err) {
        console.error('Failed to fetch admin data:', err);
      }
    };
    fetchData();
  }, []);

  const filterAndSort = (items, searchTerm, sortField) => {
    return [...items]
      .filter((item) =>
        Object.values(item)
          .join(' ')
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => (sortField ? (a[sortField] > b[sortField] ? 1 : -1) : 0));
  };

  const filteredUsers = filterAndSort(users, searchUser, sortUserField);
  const filteredStores = filterAndSort(stores, searchStore, sortStoreField);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">🧑‍💼 Admin Dashboard</h2>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-100 p-4 rounded shadow">Total Users: <strong>{summary.totalUsers}</strong></div>
        <div className="bg-green-100 p-4 rounded shadow">Total Stores: <strong>{summary.totalStores}</strong></div>
        <div className="bg-yellow-100 p-4 rounded shadow">Total Ratings: <strong>{summary.totalRatings}</strong></div>
      </div>

      {/* USERS */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">🧑‍🔧 Manage Users</h3>
        <input
          type="text"
          placeholder="Search by name, email, address, role"
          value={searchUser}
          onChange={(e) => setSearchUser(e.target.value)}
          className="mb-3 p-2 border rounded w-full md:w-1/2"
        />
        <select
          onChange={(e) => setSortUserField(e.target.value)}
          className="ml-2 p-2 border rounded"
        >
          <option value="">Sort by</option>
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="role">Role</option>
          <option value="address">Address</option>
        </select>

        <table className="w-full mt-2 border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th>Name</th><th>Email</th><th>Role</th><th>Address</th><th>Avg Rating (if Owner)</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => (
              <tr key={u.id} className="border-t text-center">
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>{u.address}</td>
                <td>{u.role === 'StoreOwner' ? u.avgRating?.toFixed(1) || '0.0' : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* STORES */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">🏬 Manage Stores</h3>
        <input
          type="text"
          placeholder="Search by name, email, address"
          value={searchStore}
          onChange={(e) => setSearchStore(e.target.value)}
          className="mb-3 p-2 border rounded w-full md:w-1/2"
        />
        <select
          onChange={(e) => setSortStoreField(e.target.value)}
          className="ml-2 p-2 border rounded"
        >
          <option value="">Sort by</option>
          <option value="name">Name</option>
          <option value="email">Owner Email</option>
          <option value="address">Address</option>
        </select>

        <table className="w-full mt-2 border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th>Name</th><th>Owner Email</th><th>Address</th><th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {filteredStores.map((s) => (
              <tr key={s.id} className="border-t text-center">
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.address}</td>
                <td>{s.rating?.toFixed(1) || '0.0'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
