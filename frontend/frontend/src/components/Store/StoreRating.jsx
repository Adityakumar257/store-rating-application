// 📁 src/components/Store/StoreRating.jsx
import React, { useState } from 'react';
import axios from 'axios';

const StoreRating = ({ storeId, userRating }) => {
  const [rating, setRating] = useState(userRating || 0);
  const [loading, setLoading] = useState(false);

  const handleRatingChange = async (e) => {
    const newRating = parseInt(e.target.value);
    setRating(newRating);
    setLoading(true);

    try {
      await axios.post('/api/ratings', {
        storeId,
        rating: newRating,
      });
    } catch (err) {
      console.error('Rating submission failed', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <select
      className="border px-2 py-1 rounded"
      value={rating}
      onChange={handleRatingChange}
      disabled={loading}
    >
      <option value="0" disabled>Select</option>
      {[1, 2, 3, 4, 5].map((num) => (
        <option key={num} value={num}>{num}</option>
      ))}
    </select>
  );
};

export default StoreRating;
