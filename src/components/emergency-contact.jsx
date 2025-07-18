import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ContactEmergency, 
  ContactPage, 
  Edit, 
  DeleteForever, 
  ArrowForwardIos, 
  AccountCircle 
} from '@mui/icons-material';
import pregnancyImg from '../assets/pregnancy.png';

const EmergencyContactsPage = ({ userEmail }) => {
  const navigate = useNavigate();

  const settings = [
    {
      title: 'Add New Emergency Contact',
      icon: <ContactEmergency color="success" />, 
      route: '/create-emergency',
      color: 'bg-green-100'
    },
    {
      title: 'View All Emergency Contacts',
      icon: <ContactEmergency color="success" />, 
      route: '/emergency-list',
      color: 'bg-green-100'
    },
    {
      title: 'Find An Emergency Contact',
      icon: <ContactPage color="success" />, 
      route: '/emergency-search',
      color: 'bg-green-100'
    },
    {
      title: 'Edit Emergency Contact',
      icon: <Edit color="primary" />, 
      route: '/emergency-update',
      color: 'bg-blue-100'
    },
    {
      title: 'Remove Emergency Contact',
      icon: <DeleteForever color="error" />, 
      route: '/emergency-delete',
      color: 'bg-red-100'
    },
  ];

  return (
    <div 
      className="min-h-screen bg-cover bg-center p-4" 
      style={{ backgroundImage: `url(${pregnancyImg})` }}
    >
      <motion.div 
        className="max-w-2xl mx-auto bg-white bg-opacity-90 rounded-xl shadow-md p-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-2xl font-bold text-center text-red-600 mb-6">
          Emergency Contacts Management
        </h1>

        <div className="flex items-center mb-6">
          <AccountCircle fontSize="large" className="text-red-500" />
          <div className="ml-3">
            <p className="text-xs text-gray-600">Current User</p>
            <p className="text-sm font-medium text-gray-800">{userEmail}</p>
          </div>
        </div>

        {settings.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`flex items-center justify-between p-4 rounded-lg shadow mb-3 cursor-pointer transition ${item.color}`}
            onClick={() => navigate(item.route)}
          >
            <div className="flex items-center">
              <div className="mr-4">
                {item.icon}
              </div>
              <span className="font-medium text-gray-800">{item.title}</span>
            </div>
            <ArrowForwardIos fontSize="small" className="text-gray-400" />
          </motion.div>
        ))}

        <motion.div 
          className="bg-gray-50 border mt-6 p-4 rounded-md text-center text-xs text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Emergency contacts will be notified in case of urgent situations
        </motion.div>
      </motion.div>
    </div>
  );
};

export default EmergencyContactsPage;
