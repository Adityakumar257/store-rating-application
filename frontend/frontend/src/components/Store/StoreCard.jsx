import React from 'react';
import { Link } from 'react-router-dom';

const StoreCard = ({ store, userRole }) => {
  return (
    <div className="border rounded-lg shadow-md p-4 bg-white hover:shadow-lg transition">
      <h2 className="text-xl font-semibold text-blue-600 mb-2">{store.name}</h2>
      <p className="text-gray-700 mb-2">{store.description}</p>
      <p className="text-sm text-gray-500">Location: {store.location}</p>
      <p className="text-sm text-gray-600 mt-1">
        Average Rating:{' '}
        <span className="font-bold text-yellow-500">
          {store.averageRating ? store.averageRating.toFixed(1) : 'No ratings yet'}
        </span>
      </p>

      {/* Show rate link for normal users */}
      {userRole === 'user' && (
        <div className="mt-4">
          <Link
            to={`/rate/${store.id}`}
            className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-sm"
          >
            Rate Now
          </Link>
        </div>
      )}
    </div>
  );
};

export default StoreCard;
