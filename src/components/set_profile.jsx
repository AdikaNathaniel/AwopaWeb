import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import pregnancyImg from '../assets/pregnancy.png';

const SetProfilePage = ({ userEmail = "admin@example.com" }) => {
  const navigate = useNavigate();

  const onOptionSelected = (option) => {
    // You can navigate or trigger modals here
    alert(`${option} tapped`);
  };

  const buildSettingTile = ({ icon, title, iconColor, onClick }) => {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="w-full">
          <div 
            className="flex items-center p-4 cursor-pointer"
            onClick={onClick}
          >
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
              style={{ backgroundColor: `${iconColor}20` }}
            >
              {icon}
            </div>
            <div className="flex-1">
              <p className="text-base font-medium">{title}</p>
            </div>
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 text-gray-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
          <div className="border-b border-gray-100 mx-4"></div>
        </div>
      </motion.div>
    );
  };

  // Icons as React components
  const icons = {
    person: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    lock: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    edit: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    delete: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    ),
    lockReset: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    )
  };

  return (
    <div 
      className="min-h-screen"
      style={{
        backgroundImage: `url(${pregnancyImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-blue-600 py-4 shadow-lg"
      >
        <h1 className="text-white text-center text-xl font-bold">Settings</h1>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-white bg-opacity-90 rounded-xl mx-4 my-6 shadow-lg overflow-hidden"
      >
        {/* User email section */}
        <motion.div 
          className="flex items-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="text-te-500 mr-3">
            {icons.person}
          </div>
          <p className="text-base font-medium">
            User: {userEmail}
          </p>
        </motion.div>
        <div className="border-b border-gray-200"></div>

        {/* Settings options */}
        <div className="divide-y divide-gray-100">
          {buildSettingTile({
            icon: icons.lock,
            title: 'Create PIN',
            iconColor: '#10B981', // green-500
            onClick: () => navigate('/create-pin')
          })}

          {buildSettingTile({
            icon: icons.edit,
            title: 'Update PIN',
            iconColor: '#3B82F6', // blue-500
            onClick: () => navigate('/update-pin')
          })}

          {buildSettingTile({
            icon: icons.delete,
            title: 'Delete PIN',
            iconColor: '#EF4444', // red-500
            onClick: () => navigate('/delete-pin')
          })}

          {buildSettingTile({
            icon: icons.lockReset,
            title: 'Update Password',
            iconColor: '#F97316', // orange-500
            onClick: () => navigate('/update-password')
          })}
        </div>
      </motion.div>

      {/* Cyan-600 button example */}
      <motion.div 
        className="flex justify-center mt-6"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* <button 
          className="bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2 px-6 rounded-lg shadow-md"
          onClick={() => onOptionSelected('Special Action')}
        >
          Special Action Button
        </button> */}
      </motion.div>
    </div>
  );
};

export default SetProfilePage;