// HomeScreen.jsx
import React, { useEffect, useState } from 'react';
import pregnancyImg from '../assets/pregnancy.png';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, BellOff } from 'lucide-react';

// Simulated Firebase Messaging Listener (You'd replace this with real Firebase logic)
const useFakeNotificationListener = (setNotification) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setNotification({
        title: 'New Alert from PregMama',
        body: 'Your doctor has sent a new message.',
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, [setNotification]);
};

export default function HomeScreen() {
  const [notification, setNotification] = useState(null);
  const [showDialog, setShowDialog] = useState(false);

  useFakeNotificationListener(setNotification);

  useEffect(() => {
    if (notification) {
      setShowDialog(true);
    }
  }, [notification]);

  const handleDialogClose = () => {
    setShowDialog(false);
    setTimeout(() => setNotification(null), 300);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-4"
      style={{ backgroundImage: `url(${pregnancyImg})` }}
    >
      <motion.header
        className="w-full py-4 bg-pink-600 text-white text-xl font-bold text-center shadow-md"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        Notifications
      </motion.header>

      <div className="flex flex-col items-center justify-center mt-20">
        <BellOff size={90} className="text-gray-400 mb-4" />
        <p className="text-lg text-gray-600">No new notifications</p>
        <motion.button
          onClick={() => alert('No new notifications.')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 px-6 py-3 bg-cyan-600 text-white rounded-xl shadow-lg"
        >
          Check Again
        </motion.button>
      </div>

      <AnimatePresence>
        {showDialog && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-2xl w-[90%] max-w-md"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <div className="flex items-center mb-4">
                <Bell className="text-blue-600 mr-2" size={24} />
                <h2 className="text-lg font-bold text-gray-800">
                  {notification?.title || 'No Title'}
                </h2>
              </div>
              <p className="text-gray-700 mb-4">
                {notification?.body || 'No Body'}
              </p>
              <div className="flex justify-end">
                <button
                  onClick={handleDialogClose}
                  className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700"
                >
                  OK
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
