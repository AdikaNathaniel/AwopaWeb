import React, { useState } from 'react';
import { motion } from 'framer-motion';
import pregnancyImg from '../assets/pregnancy.png';
import axios from 'axios';

export default function CreateEmergencyContact() {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    relationship: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3100/api/v1/emergency/contacts',
        formData
      );
      if (response.status === 201) {
        setShowSuccess(true);
        setFormData({ name: '', phoneNumber: '', email: '', relationship: '' });
      } else {
        alert('Failed to create contact');
      }
    } catch (error) {
      alert('Network error');
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${pregnancyImg})` }}
    >
      <div className="bg-white bg-opacity-90 shadow-2xl rounded-xl p-8 w-full max-w-lg">
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-bold text-center text-cyan-700 mb-4"
        >
          Create Emergency Contact
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {['name', 'phoneNumber', 'email', 'relationship'].map((field, i) => (
            <motion.div
              key={field}
              initial={{ x: i % 2 === 0 ? -100 : 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.2 }}
            >
              <label className="block text-cyan-800 font-semibold mb-1 capitalize">
                {field === 'phoneNumber' ? 'Phone Number' : field}
              </label>
              <input
                type={field === 'email' ? 'email' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600"
              />
            </motion.div>
          ))}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-cyan-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md"
            type="submit"
          >
            Create Emergency Contact
          </motion.button>
        </form>

        {showSuccess && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mt-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
          >
            <strong className="font-bold">Success! </strong>
            <span className="block sm:inline">
              Emergency contact created successfully.
            </span>
            <button
              onClick={() => setShowSuccess(false)}
              className="absolute top-1 right-2 text-green-700"
            >
              &times;
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
