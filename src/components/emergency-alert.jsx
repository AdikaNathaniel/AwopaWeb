import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import pregnancyImg from '../assets/pregnancy.png';

const EmergencyAlertPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState('');

  const emergencyMessages = [
    "I'm pregnant and need help now.",
    "I feel dizzy",
    "I need to go to the hospital urgently.",
    "I'm bleeding",
    "My water just broke, I need assistance.",
  ];

  const sendEmergencyAlert = async (message) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post(
        'http://localhost:3100/api/v1/emergency/contacts/send',
        { message },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 201) {
        if (response.data?.success) {
          setSuccess("Emergency alert sent successfully!");
        } else {
          throw new Error(response.data?.message || 'Failed to send alert');
        }
      } else {
        throw new Error('Server error');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
      setShowDialog(false);
    }
  };

  const handleSendAlert = () => {
    if (selectedMessage) {
      sendEmergencyAlert(selectedMessage);
    } else {
      setError("Please select an emergency message");
    }
  };

  return (
    <div 
      className="min-h-screen"
      style={{
        backgroundImage: `url(${pregnancyImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        padding: '20px 0'
      }}
    >
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-md overflow-hidden mb-8"
        >
          <div className="bg-red-600 text-white p-4">
            <h1 className="text-xl font-bold text-center">Emergency Alert</h1>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-md mx-auto bg-white bg-opacity-90 rounded-xl shadow-md overflow-hidden p-6"
        >
          <p className="text-gray-700 mb-6 text-center">
            In case of emergency, send an alert to your contacts immediately.
          </p>

          <div className="space-y-4">
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-100 text-red-700 rounded-lg text-sm"
              >
                {error}
              </motion.div>
            )}

            {success && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-green-100 text-green-700 rounded-lg text-sm"
              >
                {success}
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowDialog(true)}
              className="w-full py-3 px-4 rounded-lg font-medium text-white bg-red-600 hover:bg-red-700 transition"
            >
              <div className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Send Emergency Alert
              </div>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Emergency Alert Dialog */}
      <AnimatePresence>
        {showDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full"
            >
              <div className="flex items-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h2 className="text-xl font-bold">Emergency Alert</h2>
              </div>
              <p className="text-gray-600 mb-4">Select an emergency message:</p>
              
              <select
                value={selectedMessage}
                onChange={(e) => setSelectedMessage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none transition mb-6"
              >
                <option value="">Select a message</option>
                {emergencyMessages.map((message, index) => (
                  <option key={index} value={message}>{message}</option>
                ))}
              </select>

              <div className="flex justify-end space-x-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setShowDialog(false);
                    setError(null);
                  }}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendAlert}
                  disabled={isLoading}
                  className={`px-4 py-2 text-white rounded-lg transition ${isLoading ? 'bg-red-400' : 'bg-red-600 hover:bg-red-700'}`}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                      Sending...
                    </div>
                  ) : (
                    'Send Alert'
                  )}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EmergencyAlertPage;