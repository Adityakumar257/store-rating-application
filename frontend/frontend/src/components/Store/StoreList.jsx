// 📁 src/components/Store/StoreList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import StoreRating from './StoreRating';

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const res = await axios.get('/api/stores'); // adjust backend endpoint
        setStores(res.data);
      } catch (err) {
        console.error('Failed to fetch stores', err);
      }
    };
    fetchStores();
  }, []);

  const filteredStores = stores.filter((store) =>
    store.name.toLowerCase().includes(search.toLowerCase()) ||
    store.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">All Stores</h2>

      <input
        type="text"
        placeholder="Search by name or address"
        className="border px-3 py-2 rounded w-full mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="w-full border rounded shadow">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-2">Name</th>
            <th className="p-2">Address</th>
            <th className="p-2">Average Rating</th>
            <th className="p-2">Your Rating</th>
          </tr>
        </thead>
        <tbody>
          {filteredStores.map((store) => (
            <tr key={store.id} className="border-t">
              <td className="p-2">{store.name}</td>
              <td className="p-2">{store.address}</td>
              <td className="p-2">{store.averageRating || 'N/A'}</td>
              <td className="p-2">
                <StoreRating storeId={store.id} userRating={store.userRating} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StoreList;

// 📝 Note: <StoreRating /> is used inside this.

