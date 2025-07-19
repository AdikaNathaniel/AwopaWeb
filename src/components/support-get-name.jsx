import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import pregnancyImg from '../assets/pregnancy.png';

const SupportByNamePage = () => {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [showUserModal, setShowUserModal] = useState(false);
  const userEmail = 'admin@example.com';

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      const day = date.getDate();
      let daySuffix;
      
      if (day >= 11 && day <= 13) {
        daySuffix = 'th';
      } else {
        switch (day % 10) {
          case 1: daySuffix = 'st'; break;
          case 2: daySuffix = 'nd'; break;
          case 3: daySuffix = 'rd'; break;
          default: daySuffix = 'th';
        }
      }
      
      return format(date, `do MMMM, y 'at' h:mm a`).replace('o', daySuffix);
    } catch (e) {
      return dateString;
    }
  };

  const fetchSupportTickets = async () => {
    if (!name.trim()) {
      setError('Please enter a name');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:3100/api/v1/support/by-name/${name.trim()}`);
      const supportTickets = response.data?.result || [];
      
      if (supportTickets.length > 0) {
        setTickets(supportTickets);
      } else {
        setError('No support tickets found for this name');
        setTickets([]);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Error fetching support tickets');
      setTickets([]);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setName('');
    setError(null);
    setTickets([]);
  };

  const SupportTicketCard = ({ ticket }) => {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-6 bg-white rounded-lg shadow-md overflow-hidden"
      >
        <div className="p-4">
          <DetailRow label="Ticket ID:" value={ticket._id || 'N/A'} />
          <div className="border-t border-gray-200 my-2"></div>
          <DetailRow label="Name:" value={ticket.name || 'N/A'} />
          <div className="border-t border-gray-200 my-2"></div>
          <DetailRow label="Email:" value={ticket.email || 'N/A'} />
          <div className="border-t border-gray-200 my-2"></div>
          <DetailRow label="Phone:" value={ticket.phoneNumber || 'N/A'} />
          <div className="border-t border-gray-200 my-2"></div>
          <DetailRow label="Message:" value={ticket.message || 'No message'} />
          <div className="border-t border-gray-200 my-2"></div>
          <DetailRow label="Created:" value={formatDate(ticket.createdAt)} />
        </div>
      </motion.div>
    );
  };

  const DetailRow = ({ label, value }) => {
    return (
      <div className="flex py-1">
        <div className="w-24 font-semibold text-gray-500">{label}</div>
        <div className="flex-1 text-sm">{value}</div>
      </div>
    );
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-opacity-50"
      style={{ backgroundImage: `url(${pregnancyImg})` }}
    >
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto mb-8"
      >
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-cyan-600 text-white p-4 flex justify-center items-center relative">
            <h1 className="text-xl font-bold text-center">Find Support Ticket By Name</h1>
            <div className="absolute right-4">
              <button
                onClick={() => setShowUserModal(true)}
                className="w-10 h-10 bg-white text-blue-700 flex items-center justify-center rounded-full font-bold cursor-pointer"
                title={userEmail}
              >
                {userEmail?.[0]?.toUpperCase() || 'U'}
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto"
        >
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <motion.div 
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-center mb-4"
              >
                <div className="inline-block p-3 bg-purple-100 rounded-full">
                  <svg 
                    className="w-12 h-12 text-purple-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" 
                    />
                  </svg>
                </div>
              </motion.div>

              <h2 className="text-lg font-medium text-center mb-6">Customer Name</h2>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg 
                      className="h-5 w-5 text-gray-400" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
                    placeholder="Enter Customer Full Name"
                  />
                </div>
                {error && !tickets.length && (
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-1 text-sm text-red-600"
                  >
                    {error}
                  </motion.p>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={fetchSupportTickets}
                disabled={isLoading}
                className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 ${isLoading ? 'opacity-70' : ''}`}
              >
                {isLoading ? (
                  <div className="flex justify-center items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Searching...
                  </div>
                ) : 'Find Tickets'}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {tickets.length > 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto mt-8"
          >
            <div className="bg-white rounded-xl shadow-lg overflow-hidden p-6">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Support Tickets</h2>
                <p className="text-gray-600">
                  Found {tickets.length} ticket{tickets.length !== 1 ? 's' : ''} for {name.trim()}
                </p>
              </div>

              <div className="space-y-4">
                {tickets.map((ticket, index) => (
                  <SupportTicketCard key={index} ticket={ticket} />
                ))}
              </div>

              <div className="mt-6 text-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetForm}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                >
                  Search Again
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SupportByNamePage;