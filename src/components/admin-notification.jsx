import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import pregnancyImg from '../assets/pregnancy.png';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography
} from '@mui/material';
import {
  AdminPanelSettings as AdminIcon,
  Email as EmailIcon,
  AddCircle as AddCircleIcon,
  People as PeopleIcon,
  Notifications as NotificationsIcon,
  Edit as EditIcon,
  Badge as BadgeIcon,
  CheckCircle as CheckCircleIcon,
  Delete as DeleteIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';

const NotificationSettingsPage = ({ userEmail = 'admin@example.com' }) => {
  const navigate = useNavigate();
  const [showUserModal, setShowUserModal] = useState(false);

  const _onOptionSelected = (option) => {
    console.log(`${option} tapped`);
  };

  const handleLogout = async () => {
    try {
      // Add your logout API call here
      setShowUserModal(false);
      // Add navigation logic here if needed
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const notificationOptions = [
    {
      icon: <AddCircleIcon sx={{ color: '#ffffff' }} />,
      title: "Create Notification",
      iconBgColor: '#22c55e', // Green
      onClick: () => {
        _onOptionSelected("Create Notification");
        navigate('/create-notification');
      }
    },
    {
      icon: <PeopleIcon sx={{ color: '#ffffff' }} />,
      title: "Get Notifications by Role",
      iconBgColor: '#14b8a6', // Teal
      onClick: () => {
        _onOptionSelected("Get Notifications by Role");
        navigate('/notification-role');
      }
    },
    {
      icon: <NotificationsIcon sx={{ color: '#ffffff' }} />,
      title: "Get All Notifications",
      iconBgColor: '#f59e0b', // Amber
      onClick: () => {
        _onOptionSelected("Get All Notifications");
        navigate('/notification-list');
      }
    },
    {
      icon: <EditIcon sx={{ color: '#ffffff' }} />,
      title: "Update Notification",
      iconBgColor: '#3b82f6', // Blue
      onClick: () => {
        _onOptionSelected("Update Notification");
        navigate('/notification-update');
      }
    },
    {
      icon: <BadgeIcon sx={{ color: '#ffffff' }} />,
      title: "Get Notification by ID",
      iconBgColor: '#f97316', // Orange
      onClick: () => {
        _onOptionSelected("Get Notification by ID");
        navigate('/notification-id');
      }
    },
    {
      icon: <CheckCircleIcon sx={{ color: '#ffffff' }} />,
      title: "Mark Notification as Sent",
      iconBgColor: '#6366f1', // Indigo
      onClick: () => {
        _onOptionSelected("Mark Notification as Sent");
        navigate('/notification-sent');
      }
    },
    {
      icon: <DeleteIcon sx={{ color: '#ffffff' }} />,
      title: "Delete Notifications",
      iconBgColor: '#ef4444', // Red
      onClick: () => {
        _onOptionSelected("Delete Notifications");
        navigate('/delete-notification');
      }
    }
  ];

  const UserModal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={() => setShowUserModal(false)}
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="relative bg-white rounded-xl shadow-lg w-full max-w-md"
      >
        <div className="p-6">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center mr-4">
              <EmailIcon className="text-cyan-600 text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">User Profile</h3>
              <p className="text-gray-600">{userEmail}</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                <SettingsIcon className="text-gray-500" />
              </div>
              <span>Settings</span>
            </div>
          </div>
          
          <div className="mt-6 pt-4 border-t">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center p-3 text-red-600 hover:bg-red-50 rounded-lg"
            >
              <div className="w-5 h-5 mr-3">
                <LogoutIcon />
              </div>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );

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
        {/* Header Section */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto mb-8"
        >
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-cyan-600 text-white p-4 flex justify-center items-center relative">
              <h1 className="text-xl font-bold text-center">Notification Settings</h1>
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

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div style={{ 
              width: '100%', 
              maxWidth: 800, 
              margin: '0 auto',
              padding: 0
            }}>
              {notificationOptions.map((option, index) => (
                <motion.div
                  key={option.title}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="mb-4"
                >
                  <Card 
                    sx={{ 
                      borderRadius: 3,
                      overflow: 'hidden',
                      maxWidth: 800,
                      margin: '0 auto',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                      cursor: 'pointer'
                    }}
                    onClick={option.onClick}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ 
                          marginRight: '16px',
                          width: 48,
                          height: 48,
                          borderRadius: '50%',
                          backgroundColor: option.iconBgColor,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          {option.icon}
                        </div>
                        
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="h6" fontWeight="normal">
                            {option.title}
                          </Typography>
                        </Box>
                        
                        <motion.div
                          whileHover={{ x: 5 }}
                          className="text-gray-400"
                        >
                          <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                          </svg>
                        </motion.div>
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* User Modal */}
        <AnimatePresence>
          {showUserModal && <UserModal />}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NotificationSettingsPage;