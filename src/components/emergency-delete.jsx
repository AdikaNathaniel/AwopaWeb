import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import pregnancyImg from '../assets/pregnancy.png';

export default function DeleteEmergencyContact() {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);

  const handleDelete = async () => {
    if (!name.trim()) {
      alert('Please enter a contact name');
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.delete(`http://localhost:3100/api/v1/emergency/contacts/${name.trim()}`);

      if (response.status === 200) {
        setName('');
        setSuccessVisible(true);

        // Hide after 2 seconds
        setTimeout(() => setSuccessVisible(false), 2000);
      } else {
        alert('Failed to delete contact');
      }
    } catch (error) {
      console.error(error);
      alert('Error deleting contact');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4"
      style={{ backgroundImage: `url(${pregnancyImg})` }}
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white bg-opacity-90 p-8 rounded-xl shadow-lg w-full max-w-xl"
      >
        <motion.h2
          className="text-2xl font-bold text-red-600 text-center mb-6"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
        >
          Delete Emergency Contact
        </motion.h2>

        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Enter Contact Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600"
          />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isLoading}
            onClick={handleDelete}
            className="bg-cyan-600 text-white p-3 rounded-lg shadow-md hover:bg-cyan-700 transition-all duration-200"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <i className="fas fa-trash-alt"></i>
            )}
          </motion.button>
        </div>

        <AnimatePresence>
          {successVisible && (
            <motion.div
              className="mt-6 text-center p-4 bg-green-100 text-green-700 rounded-lg flex flex-col items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <i className="fas fa-check-circle text-4xl mb-2 text-green-500"></i>
              <p className="font-semibold">Contact Successfully Deleted</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
