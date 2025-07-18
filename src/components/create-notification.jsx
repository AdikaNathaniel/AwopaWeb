import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import pregnancyImg from '../assets/pregnancy.png';

export default function CreateNotificationPage() {
  const [message, setMessage] = useState('');
  const [scheduledAt, setScheduledAt] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const isFormValid = message.trim() !== '' && scheduledAt !== '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:3100/api/v1/notifications', {
        role: 'Admin',
        message: message.trim(),
        scheduledAt: new Date(scheduledAt).toISOString(),
      });

      if (res.status === 201) {
        setSuccess(true);
        setMessage('');
        setScheduledAt('');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create notification');
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${pregnancyImg})` }}
    >
      <motion.div
        className="bg-white bg-opacity-90 p-8 rounded-xl shadow-xl w-full max-w-lg"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-cyan-600">
          Create Notification
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="4"
              className="mt-1 w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
              placeholder="Enter your notification message"
              required
            ></textarea>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block text-sm font-medium text-gray-700">
              Schedule Date & Time
            </label>
            <input
              type="datetime-local"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
              className="mt-1 w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600"
              required
            />
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-md bg-cyan-600 text-white font-semibold hover:bg-cyan-700 transition"
              disabled={!isFormValid}
            >
              Send Notification
            </button>
          </motion.div>

          {success && (
            <motion.div
              className="text-green-600 text-center font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Notification sent successfully!
            </motion.div>
          )}

          {error && (
            <motion.div
              className="text-red-600 text-center font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {error}
            </motion.div>
          )}
        </form>
      </motion.div>
    </div>
  );
}
