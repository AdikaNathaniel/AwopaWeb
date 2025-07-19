import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBell, 
  FaKey, 
  FaUserShield, 
  FaEnvelope, 
  FaClock, 
  FaCalendarAlt,
  FaPaperPlane,
  FaCheck,
  FaCopy,
  FaSync
} from 'react-icons/fa';
import pregnancyImg from '../assets/pregnancy.png';
import { format } from 'date-fns';

export default function NotificationListPage() {
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNotifications = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:3100/api/v1/notifications');
      setNotifications(response.data.result || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load notifications');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(dateString), "do MMMM, y 'at' h:mm a");
    } catch (e) {
      return 'Invalid date';
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${pregnancyImg})`, padding: '20px 0' }}>
      {/* All Notifications Header - Wider than the card */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{
          width: '94%', // Wider than the card
          maxWidth: '1000px', // Wider max-width
          margin: '0 auto 10px',
          position: 'relative',
          zIndex: 2
        }}
      >
        <div className="bg-cyan-600 text-white p-4 rounded-lg shadow-md">
          <h1 className="text-xl font-bold text-center">All Notifications</h1>
        </div>
      </motion.div>

      {/* Notifications Card - Slightly narrower */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto p-6 rounded-2xl shadow-xl bg-white bg-opacity-90"
        style={{
          width: '90%',
          maxWidth: '900px'
        }}
      >
        <div className="flex justify-between items-center mb-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={fetchNotifications}
            className="flex items-center gap-2 bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700"
          >
            <FaSync className={isLoading ? 'animate-spin' : ''} />
            Refresh
          </motion.button>
        </div>

        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center py-12"
          >
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-600"></div>
          </motion.div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 bg-red-100 text-red-700 rounded-lg mb-4"
          >
            {error}
          </motion.div>
        ) : notifications.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="inline-block p-6 bg-gray-100 rounded-full mb-4">
              <FaBell className="text-gray-400 text-4xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-4">No notifications found</h3>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={fetchNotifications}
              className="bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700"
            >
              Try Again
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
            className="space-y-4"
          >
            <AnimatePresence>
              {notifications.map((notif, index) => (
                <motion.div
                  key={notif._id || index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border p-6 rounded-xl shadow-sm bg-white"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <FaKey className="text-gray-400 mr-2" />
                      <span className="text-sm font-medium text-gray-500">
                        ID: {notif._id || 'N/A'}
                      </span>
                    </div>
                    <button 
                      onClick={() => copyToClipboard(notif._id)}
                      className="text-gray-400 hover:text-cyan-600"
                    >
                      <FaCopy />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start">
                      <FaUserShield className="text-blue-500 mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <span className="text-sm font-medium text-gray-500">Role:</span>
                        <p className="text-gray-700">{notif.role || 'N/A'}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <FaEnvelope className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <span className="text-sm font-medium text-gray-500">Message:</span>
                        <p className="text-gray-700">{notif.message || 'No message'}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <FaClock className="text-orange-500 mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <span className="text-sm font-medium text-gray-500">Scheduled:</span>
                        <p className="text-gray-700">{formatDate(notif.scheduledAt)}</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <FaCalendarAlt className="text-purple-500 mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <span className="text-sm font-medium text-gray-500">Created:</span>
                        <p className="text-gray-700">{formatDate(notif.createdAt)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-4">
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      className={`px-3 py-1 rounded-full text-sm flex items-center ${
                        notif.isSent ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      <FaPaperPlane className="mr-1" />
                      {notif.isSent ? 'Sent' : 'Pending'}
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      className={`px-3 py-1 rounded-full text-sm flex items-center ${
                        notif.isRead ? 'bg-teal-100 text-teal-700' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      <FaCheck className="mr-1" />
                      {notif.isRead ? 'Read' : 'Unread'}
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}