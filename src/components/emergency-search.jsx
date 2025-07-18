import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import pregnancyImg from '../assets/pregnancy.png';

const EmergencyContactSearch = () => {
  const [searchName, setSearchName] = useState('');
  const [contact, setContact] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = async () => {
    if (!searchName.trim()) return;

    setIsLoading(true);
    setErrorMessage('');
    setContact(null);

    try {
      const response = await axios.get(
        `http://localhost:3100/api/v1/emergency/contacts/${searchName.trim()}`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200 && response.data.success && response.data.result) {
        setContact(response.data.result);
      } else {
        setErrorMessage(response.data.message || 'Contact not found');
      }
    } catch (error) {
      setErrorMessage(`Network error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const InfoRow = ({ icon, label, value }) => (
    <motion.div
      className="flex items-start gap-4 mb-4"
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="text-red-500 text-xl">
        <i className={`fas ${icon}`}></i>
      </div>
      <div>
        <div className="text-sm text-gray-500">{label}</div>
        <div className="text-lg font-medium text-gray-800">{value}</div>
      </div>
    </motion.div>
  );

  return (
    <div
      className="min-h-screen bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${pregnancyImg})` }}
    >
      <motion.div
        className="bg-white/90 max-w-xl mx-auto rounded-xl shadow-lg p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <motion.h1
          className="text-2xl font-bold text-red-600 text-center mb-6"
          initial={{ y: -30 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Search Emergency Contact
        </motion.h1>

        {/* Search Bar */}
        <div className="flex items-center gap-2 mb-6">
          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Enter Contact Name"
            className="flex-grow px-4 py-3 rounded-full bg-gray-200 border-none focus:outline-none"
          />
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="bg-cyan-600 hover:bg-cyan-700 text-white p-3 rounded-full transition-all"
          >
            <i className="fas fa-search"></i>
          </button>
        </div>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex justify-center py-6">
            <motion.div
              className="w-8 h-8 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1 }}
            />
          </div>
        )}

        {/* Error Message */}
        {errorMessage && !isLoading && (
          <motion.div
            className="text-red-600 text-center mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {errorMessage}
          </motion.div>
        )}

        {/* Contact Card */}
        {contact && !isLoading && (
          <motion.div
            className="bg-white rounded-xl shadow-md p-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <InfoRow icon="fa-user" label="Name" value={contact.name || 'No name provided'} />
            <hr className="my-2" />
            <InfoRow icon="fa-phone" label="Phone" value={contact.phoneNumber || 'No phone'} />
            <hr className="my-2" />
            <InfoRow icon="fa-envelope" label="Email" value={contact.email || 'No email'} />
            <hr className="my-2" />
            <InfoRow
              icon="fa-users"
              label="Relationship"
              value={contact.relationship || 'Not specified'}
            />
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default EmergencyContactSearch;
