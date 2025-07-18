import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUsers, 
  FaBell, 
  FaCalendarAlt, 
  FaCheckCircle, 
  FaExclamationCircle,
  FaEnvelopeOpen,
  FaEnvelope
} from 'react-icons/fa';
import pregnancyImg from '../assets/pregnancy.png';
import { format } from 'date-fns';

export default function NotificationsByRolePage() {
  const roles = ['Admin', 'Doctor', 'Relative', 'Pregnant Woman'];
  const [selectedRole, setSelectedRole] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [error, setError] = useState(null);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(dateString), 'MMM d, yyyy \'at\' h:mm a');
    } catch (e) {
      return dateString;
    }
  };

  const fetchNotificationsByRole = async () => {
    if (!selectedRole) {
      setError('Please select a role');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:3100/api/v1/notifications/role/${selectedRole}`);
      setNotifications(response.data.result || []);
      setShowDialog(true);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Error fetching notifications');
    } finally {
      setIsLoading(false);
    }
  };

  const NotificationCard = ({ notification }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="border p-4 rounded-xl shadow-sm mb-4 bg-white"
    >
      <p className="font-semibold text-gray-800 mb-2">
        {notification.message || 'No message'}
      </p>
      
      <div className="flex items-center text-sm text-gray-600 mb-2">
        <FaCalendarAlt className="mr-2 text-cyan-600" />
        <span>{formatDate(notification.scheduledAt)}</span>
      </div>
      
      <div className="flex justify-between">
        <div className="flex items-center">
          {notification.isSent ? (
            <FaCheckCircle className="text-green-500 mr-1" />
          ) : (
            <FaExclamationCircle className="text-orange-500 mr-1" />
          )}
          <span className={notification.isSent ? 'text-green-500' : 'text-orange-500'}>
            {notification.isSent ? 'Sent' : 'Pending'}
          </span>
        </div>
        
        <div className="flex items-center">
          {notification.isRead ? (
            <FaEnvelopeOpen className="text-blue-500 mr-1" />
          ) : (
            <FaEnvelope className="text-gray-500 mr-1" />
          )}
          <span className={notification.isRead ? 'text-blue-500' : 'text-gray-500'}>
            {notification.isRead ? 'Read' : 'Unread'}
          </span>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${pregnancyImg})` }}>
      <div className="bg-white bg-opacity-90 min-h-screen p-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-xl"
        >
          <h1 className="text-center text-2xl font-bold text-cyan-600 mb-6">Notifications by Role</h1>

          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-6 text-center"
          >
            <div className="inline-block p-4 bg-cyan-100 rounded-full">
              <FaUsers className="text-cyan-600 text-3xl" />
            </div>
          </motion.div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Role</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUsers className="text-gray-400" />
              </div>
              <select
                value={selectedRole || ''}
                onChange={(e) => setSelectedRole(e.target.value || null)}
                className="w-full pl-10 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600 appearance-none"
              >
                <option value="">Select a role...</option>
                {roles.map((role) => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg"
            >
              {error}
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={fetchNotificationsByRole}
            disabled={!selectedRole || isLoading}
            className={`w-full py-3 rounded-lg font-bold flex justify-center items-center ${
              !selectedRole || isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-cyan-600 hover:bg-cyan-700 text-white'
            }`}
          >
            {isLoading ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : null}
            {isLoading ? 'Loading...' : 'View Notifications'}
          </motion.button>
        </motion.div>

        {showDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white p-6 rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-cyan-600">
                  {selectedRole} Notifications ({notifications.length})
                </h2>
                <button 
                  onClick={() => setShowDialog(false)} 
                  className="text-gray-500 hover:text-red-600 text-2xl"
                >
                  &times;
                </button>
              </div>

              {notifications.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <FaBell className="text-4xl mx-auto mb-4 text-gray-300" />
                  <p>No notifications found for this role</p>
                </div>
              ) : (
                <div className="space-y-3">
                  <AnimatePresence>
                    {notifications.map((notification, index) => (
                      <NotificationCard key={index} notification={notification} />
                    ))}
                  </AnimatePresence>
                </div>
              )}

              <div className="mt-6 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowDialog(false)}
                  className="bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}