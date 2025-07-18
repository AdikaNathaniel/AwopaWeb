import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import pregnancyImg from '../assets/pregnancy.png';

const NotificationSentPage = () => {
  const [id, setId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState(null);

  const markNotificationAsSent = async () => {
    if (!id.trim()) {
      setError('Please enter an ID');
      return;
    }

    setIsLoading(true);
    setShowSuccess(false);
    setError(null);

    try {
      const response = await axios.put(
        `http://localhost:3100/api/v1/notifications/${id.trim()}/mark-as-sent`,
        {},
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.status === 200) {
        setShowSuccess(true);
        setIsLoading(false);
        
        // Clear the field after successful operation
        setTimeout(() => {
          setId('');
          setShowSuccess(false);
        }, 2000);
      } else {
        setIsLoading(false);
        setError(`Failed to mark notification as sent (Status: ${response.status})`);
      }
    } catch (e) {
      setIsLoading(false);
      setError(`Error marking notification as sent: ${e.message}`);
    }
  };

  const showErrorDialog = () => {
    if (!error) return null;
    
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full"
          >
            <h2 className="text-xl font-bold text-red-600 mb-4">Error</h2>
            <p className="text-gray-700 mb-6">{error}</p>
            <div className="flex justify-end">
              <button
                onClick={() => setError(null)}
                className="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 transition"
              >
                OK
              </button>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div 
      className="min-h-screen bg-gray-50"
      style={{
        backgroundImage: `url(${pregnancyImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="bg-black bg-opacity-60 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-md overflow-hidden mb-8"
          >
            <div className="bg-cyan-600 text-white p-4">
              <h1 className="text-xl font-bold text-center">Mark Notification as Sent</h1>
            </div>
          </motion.div>

          <div className="flex justify-center items-center py-12">
            <AnimatePresence mode="wait">
              {!showSuccess ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-w-md"
                >
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="p-6">
                      <div className="flex justify-center mb-6">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-10 w-10 text-purple-600"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                              />
                            </svg>
                          </div>
                        </motion.div>
                      </div>

                      <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">
                        Enter Notification ID to Mark as Sent
                      </h2>

                      <div className="mb-6">
                        <label htmlFor="notificationId" className="block text-sm font-medium text-gray-700 mb-1">
                          Notification ID
                        </label>
                        <motion.div whileHover={{ scale: 1.01 }}>
                          <input
                            id="notificationId"
                            type="text"
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                            placeholder="Enter Notification ID"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition"
                          />
                        </motion.div>
                        {error && !showSuccess && (
                          <motion.p 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-1 text-sm text-red-600"
                          >
                            {error}
                          </motion.p>
                        )}
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={markNotificationAsSent}
                        disabled={isLoading}
                        className={`w-full py-3 px-4 rounded-lg font-medium text-white transition ${isLoading ? 'bg-cyan-400 cursor-not-allowed' : 'bg-cyan-600 hover:bg-cyan-700'}`}
                      >
                        {isLoading ? (
                          <div className="flex justify-center items-center">
                            <svg
                              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Processing...
                          </div>
                        ) : (
                          'Mark As Sent'
                        )}
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="w-full max-w-md"
                >
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-xl overflow-hidden">
                    <div className="p-8">
                      <div className="flex justify-center mb-6">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 10,
                          }}
                        >
                          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-200">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-12 w-12 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                        </motion.div>
                      </div>

                      <motion.h2
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl font-bold text-center text-green-600 mb-2"
                      >
                        Success!
                      </motion.h2>

                      <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-center text-gray-500"
                      >
                        Notification Marked as Sent
                      </motion.p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {showErrorDialog()}
    </div>
  );
};

export default NotificationSentPage;