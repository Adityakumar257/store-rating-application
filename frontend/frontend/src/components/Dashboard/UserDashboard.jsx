import React, { useEffect, useState } from 'react';
import axios from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const [stores, setStores] = useState([]);
  const [filteredStores, setFilteredStores] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await axios.get('/user/stores');
        const sorted = res.data.sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0));
        setStores(sorted);
        setFilteredStores(sorted);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stores:', error);
        setLoading(false);
      }
    };
    fetchStores();
  }, []);

  const handleRate = async (storeId, rating) => {
    try {
      await axios.post(`/user/rate/${storeId}`, { rating });
      const updated = stores.map(s =>
        s.id === storeId ? { ...s, userRating: rating } : s
      );
      setStores(updated);
      setFilteredStores(updated);
      setMessage(`Rated store ${storeId} with ${rating} stars.`);
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('Rating failed:', err);
      alert('Failed to rate store.');
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = stores.filter(store =>
      store.name.toLowerCase().includes(value)
    );
    setFilteredStores(filtered);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">User Dashboard</h2>
        <div className="space-x-3">
          <button
            onClick={() => navigate('/UpdatePassword')}
            className="bg-yellow-500 text-white px-3 py-1 rounded"
          >
            Update Password
          </button>
        </div>
      </div>

      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search store by name..."
        className="w-full p-2 border rounded mb-4"
      />

      {message && (
        <div className="bg-green-100 text-green-800 p-2 rounded mb-4">{message}</div>
      )}

      {loading ? (
        <p>Loading stores...</p>
      ) : filteredStores.length === 0 ? (
        <p>No stores found.</p>
      ) : (
        filteredStores.map(store => (
          <div key={store.id} className="border p-4 mb-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold">{store.name}</h3>
            <p>{store.address}</p>
            <p>Overall Rating: {store.averageRating || 'Not rated'}</p>
            <p>Your Rating: {store.userRating || 'Not rated'}</p>
            <div className="flex space-x-2 mt-2">
              {[1, 2, 3, 4, 5].map(num => (
                <button
                  key={num}
                  onClick={() => handleRate(store.id, num)}
                  className={`px-2 py-1 rounded ${
                    store.userRating === num
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-400 text-white'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default UserDashboard;
