import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import pregnancyImg from '../assets/pregnancy.png';

const EmergencyContactsList = () => {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchContacts = async () => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const response = await axios.get('http://localhost:3100/api/v1/emergency/contacts', {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.status === 200 && response.data.success) {
        setContacts(response.data.result);
      } else {
        setErrorMessage(response.data.message || 'Failed to load contacts');
      }
    } catch (error) {
      setErrorMessage(`Network error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const ContactCard = ({ contact }) => (
    <motion.div
      className="bg-white rounded-xl shadow-md p-6 mx-4 my-4"
      whileHover={{ scale: 1.03 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-3 flex items-center gap-3">
        <span className="text-blue-500">
          <i className="fas fa-user"></i>
        </span>
        <span className="text-lg">{contact.name || 'No name provided'}</span>
      </div>

      <div className="mb-3 flex items-center gap-3">
        <span className="text-blue-500">
          <i className="fas fa-phone-alt"></i>
        </span>
        <span>{contact.phoneNumber || 'No phone provided'}</span>
      </div>

      <div className="mb-3 flex items-center gap-3">
        <span className="text-blue-500">
          <i className="fas fa-envelope"></i>
        </span>
        <span>{contact.email || 'No email provided'}</span>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-blue-500">
          <i className="fas fa-users"></i>
        </span>
        <span>{contact.relationship || 'No relationship specified'}</span>
      </div>
    </motion.div>
  );

  return (
    <div
      className="min-h-screen bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${pregnancyImg})` }}
    >
      <motion.div
        className="bg-white/90 rounded-xl shadow-lg p-6 max-w-3xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="flex justify-between items-center mb-4"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold text-red-600">Emergency Contacts</h1>
          <button
            onClick={fetchContacts}
            className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2 rounded-lg shadow"
          >
            Refresh
          </button>
        </motion.div>

        {isLoading ? (
          <div className="text-center py-10">
            <motion.div
              className="w-10 h-10 border-4 border-cyan-600 border-t-transparent rounded-full animate-spin mx-auto"
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1 }}
            />
            <p className="mt-2 text-cyan-700">Loading...</p>
          </div>
        ) : errorMessage ? (
          <motion.div
            className="text-red-600 text-center py-4"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {errorMessage}
          </motion.div>
        ) : contacts.length === 0 ? (
          <motion.div
            className="text-gray-700 text-center py-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            No emergency contacts found.
          </motion.div>
        ) : (
          <div className="overflow-y-auto max-h-[65vh]">
            {contacts.map((contact, index) => (
              <ContactCard key={index} contact={contact} />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default EmergencyContactsList;
