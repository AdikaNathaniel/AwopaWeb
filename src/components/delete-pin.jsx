import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import pregnancyImg from '../assets/pregnancy.png';

const PinDeletePage = () => {
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId.trim()) {
      alert('Please enter a username');
      return;
    }

    const confirmed = window.confirm(`Are you sure you want to delete PIN for user: ${userId}?`);
    if (!confirmed) return;

    try {
      setLoading(true);
      const response = await axios.delete(`http://localhost:3100/api/v1/pin/${userId.trim()}`);

      if (response.status === 200) {
        alert(response.data.message || 'PIN deleted successfully!');
        setUserId('');
      } else {
        alert(`Failed to delete PIN (Status: ${response.status})`);
      }
    } catch (err) {
      if (err.code === 'ECONNABORTED') {
        alert('Request timed out. Please try again.');
      } else if (!err.response) {
        alert('Network error. Please check your connection.');
      } else {
        alert(err.response.data.message || 'An error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${pregnancyImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/80 p-8 rounded-xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Delete PIN
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <label className="block font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
              placeholder="Enter the username"
              required
            />
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-cyan-600 text-white py-3 rounded-md font-semibold flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <div className="loader ease-linear rounded-full border-4 border-t-4 border-white h-5 w-5 animate-spin" />
            ) : (
              <>
                {/* <span className="material-icons mr-2">lock_open</span> */}
                Delete PIN
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default PinDeletePage;
