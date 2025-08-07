import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Wishlist = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
        <p className="text-gray-600">Please login to view your wishlist</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600">Wishlist functionality will be implemented here.</p>
      </div>
    </div>
  );
};

export default Wishlist;
