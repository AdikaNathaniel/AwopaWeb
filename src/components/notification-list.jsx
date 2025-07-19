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
    <div 
      className="relative w-full min-h-screen"
      style={{
        backgroundImage: `url(${pregnancyImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Optional overlay for better content readability */}
      <div className="absolute inset-0 bg-black bg-opacity-10 z-10"></div>
      
      <div className="relative z-20 p-6">
        {/* Header Section - Same style as UserListPage */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto mb-8"
        >
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-cyan-600 text-white p-4 flex justify-center items-center relative">
              <h1 className="text-xl font-bold text-center">All Notifications</h1>
            </div>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={fetchNotifications}
                className="flex items-center gap-2 bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition-colors duration-200"
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
                  className="bg-cyan-600 text-white px-6 py-2 rounded-lg hover:bg-cyan-700 transition-colors duration-200"
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
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className="border border-gray-200 p-6 rounded-xl shadow-sm bg-white hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center">
                          <FaKey className="text-gray-400 mr-2" />
                          <span className="text-sm font-medium text-gray-500">
                            ID: {notif._id || 'N/A'}
                          </span>
                        </div>
                        <motion.button 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => copyToClipboard(notif._id)}
                          className="text-gray-400 hover:text-cyan-600 transition-colors duration-200"
                        >
                          <FaCopy />
                        </motion.button>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-start">
                          <FaUserShield className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
                          <div className="flex-1">
                            <span className="text-sm font-medium text-gray-500 block">Role:</span>
                            <p className="text-gray-700 font-medium">{notif.role || 'N/A'}</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <FaEnvelope className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                          <div className="flex-1">
                            <span className="text-sm font-medium text-gray-500 block">Message:</span>
                            <p className="text-gray-700">{notif.message || 'No message'}</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <FaClock className="text-orange-500 mt-1 mr-3 flex-shrink-0" />
                          <div className="flex-1">
                            <span className="text-sm font-medium text-gray-500 block">Scheduled:</span>
                            <p className="text-gray-700">{formatDate(notif.scheduledAt)}</p>
                          </div>
                        </div>

                        <div className="flex items-start">
                          <FaCalendarAlt className="text-purple-500 mt-1 mr-3 flex-shrink-0" />
                          <div className="flex-1">
                            <span className="text-sm font-medium text-gray-500 block">Created:</span>
                            <p className="text-gray-700">{formatDate(notif.createdAt)}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-gray-100">
                        <motion.div
                          whileHover={{ scale: 1.03 }}
                          className={`px-3 py-2 rounded-full text-sm flex items-center font-medium ${
                            notif.isSent 
                              ? 'bg-green-100 text-green-700 border border-green-200' 
                              : 'bg-gray-100 text-gray-700 border border-gray-200'
                          }`}
                        >
                          <FaPaperPlane className="mr-2" />
                          {notif.isSent ? 'Sent' : 'Pending'}
                        </motion.div>

                        <motion.div
                          whileHover={{ scale: 1.03 }}
                          className={`px-3 py-2 rounded-full text-sm flex items-center font-medium ${
                            notif.isRead 
                              ? 'bg-teal-100 text-teal-700 border border-teal-200' 
                              : 'bg-gray-100 text-gray-700 border border-gray-200'
                          }`}
                        >
                          <FaCheck className="mr-2" />
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
      </div>
    </div>
  );
}