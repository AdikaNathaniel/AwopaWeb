import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import pregnancyImg from '../assets/pregnancy.png';

const DeleteNotificationPage = () => {
  const [notificationId, setNotificationId] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:3100/api/v1/notifications/${notificationId}`);
      if (response.status === 200) {
        setFeedback({ type: 'success', message: 'Notification successfully deleted!' });
        setNotificationId('');
      } else {
        setFeedback({ type: 'error', message: `Failed to delete notification. Status: ${response.status}` });
      }
    } catch (err) {
      setFeedback({ type: 'error', message: 'Network error. Please try again.' });
    } finally {
      setShowConfirmDialog(false);
    }
  };

  const handleSubmit = () => {
    if (!notificationId.trim()) {
      setFeedback({ type: 'error', message: 'Please enter a Notification ID.' });
      return;
    }
    setShowConfirmDialog(true);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${pregnancyImg})`,
        backgroundSize: 'cover',
        minHeight: '100vh',
        padding: '2rem',
        backdropFilter: 'brightness(0.7)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/80 p-6 max-w-xl mx-auto rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center text-red-700 mb-6">
          Delete Notification
        </h2>

        <p className="text-gray-700 mb-2 font-medium">Enter Notification ID to Delete:</p>
        <input
          type="text"
          value={notificationId}
          onChange={(e) => setNotificationId(e.target.value)}
          placeholder="Notification ID"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-600 mb-4"
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          className="w-full bg-cyan-600 text-white py-3 rounded-md font-semibold"
        >
          Delete Notification
        </motion.button>

        {feedback.message && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`mt-4 text-center font-medium ${
              feedback.type === 'success' ? 'text-green-700' : 'text-red-600'
            }`}
          >
            {feedback.message}
          </motion.div>
        )}

        <AnimatePresence>
          {showConfirmDialog && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Are you sure?</h3>
                <p className="text-sm text-gray-600 mb-6">Do you really want to delete this notification?</p>
                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setShowConfirmDialog(false)}
                    className="px-4 py-2 rounded-md bg-gray-200 text-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 rounded-md bg-red-600 text-white"
                  >
                    Yes, Delete
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default DeleteNotificationPage;
