import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaSearch, FaBell, FaCheckCircle, FaEnvelope, FaEnvelopeOpen } from 'react-icons/fa';
import pregnancyImg from '../assets/pregnancy.png';
import { format } from 'date-fns';

export default function NotificationByIdPage() {
  const [id, setId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [notification, setNotification] = useState(null);
  const [error, setError] = useState(null);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(dateString), 'MMM d, yyyy \'at\' h:mm a');
    } catch (e) {
      return dateString;
    }
  };

  const fetchNotification = async () => {
    if (!id.trim()) {
      setError('Please enter a notification ID');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:3100/api/v1/notifications/${id.trim()}`);
      setNotification(response.data.result || response.data);
      setShowDialog(true);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Error fetching notification');
    } finally {
      setIsLoading(false);
    }
  };

  const DetailRow = ({ label, value }) => (
    <div className="flex py-2">
      <div className="w-1/3 font-medium text-gray-500">{label}</div>
      <div className="w-2/3">{value || 'N/A'}</div>
    </div>
  );

  const StatusRow = ({ label, value, isPositive }) => (
    <div className="flex items-center py-2">
      <div className="w-1/3 font-medium text-gray-500">{label}</div>
      <div className="w-2/3 flex items-center">
        {isPositive ? (
          <FaCheckCircle className="text-green-500 mr-2" />
        ) : value === 'Read' ? (
          <FaEnvelopeOpen className="text-blue-500 mr-2" />
        ) : (
          <FaEnvelope className="text-orange-500 mr-2" />
        )}
        <span className={isPositive ? 'text-green-500' : value === 'Read' ? 'text-blue-500' : 'text-orange-500'}>
          {value}
        </span>
      </div>
    </div>
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
          <h1 className="text-center text-2xl font-bold text-cyan-600 mb-6">Find Notification by ID</h1>

          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="mb-6 text-center"
          >
            <div className="inline-block p-4 bg-cyan-100 rounded-full">
              <FaSearch className="text-cyan-600 text-3xl" />
            </div>
          </motion.div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Notification ID</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaBell className="text-gray-400" />
              </div>
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="Please Enter A Notification ID"
                className="w-full pl-10 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-600"
              />
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
            onClick={fetchNotification}
            disabled={isLoading}
            className="w-full bg-cyan-600 text-white py-3 rounded-lg font-bold hover:bg-cyan-700 flex justify-center items-center"
          >
            {isLoading ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : null}
            {isLoading ? 'Searching...' : 'Find Notification'}
          </motion.button>
        </motion.div>

        {showDialog && notification && (
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
                <h2 className="text-xl font-bold text-cyan-600">Notification Details</h2>
                <button 
                  onClick={() => setShowDialog(false)} 
                  className="text-gray-500 hover:text-red-600 text-2xl"
                >
                  &times;
                </button>
              </div>

              <div className="space-y-2">
                <DetailRow label="ID:" value={notification._id || notification.id} />
                <hr className="my-2" />
                <DetailRow label="Role:" value={notification.role} />
                <hr className="my-2" />
                <DetailRow label="Message:" value={notification.message || 'No message'} />
                <hr className="my-2" />
                <DetailRow label="Scheduled At:" value={formatDate(notification.scheduledAt)} />
                <hr className="my-2" />
                <DetailRow label="Sent At:" value={formatDate(notification.sentAt)} />
                <hr className="my-2" />
                <StatusRow 
                  label="Status:" 
                  value={notification.isSent ? 'Sent' : 'Not Sent'} 
                  isPositive={notification.isSent} 
                />
                <hr className="my-2" />
                <StatusRow 
                  label="Read Status:" 
                  value={notification.isRead ? 'Read' : 'Unread'} 
                  isPositive={notification.isRead} 
                />
              </div>

              <div className="mt-6 flex justify-end">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setShowDialog(false);
                    setId('');
                  }}
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