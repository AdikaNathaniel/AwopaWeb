import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import pregnancyImg from '../assets/pregnancy.png';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography
} from '@mui/material';
import {
  AccountCircle as AccountIcon,
  AdminPanelSettings as AdminIcon,
  Cancel as CancelIcon,
  CheckCircle as VerifiedIcon,
  Email as EmailIcon,
  FamilyRestroom as RelativeIcon,
  MedicalServices as DoctorIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';

const UserListPage = ({ userEmail = 'admin@example.com' }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [showUserModal, setShowUserModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3100/api/v1/users');
      setUsers(response.data.result.map(user => ({
        name: user.name,
        email: user.email,
        type: user.type,
        isVerified: user.isVerified
      })));
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to load users:', error);
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.put('http://localhost:3100/api/v1/users/logout');
      setShowUserModal(false);
      // Add navigation logic here if needed
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const getUserTypeIcon = (type) => {
    switch (type) {
      case 'doctor': return <DoctorIcon color="primary" />;
      case 'admin': return <AdminIcon color="primary" />;
      case 'relative': return <RelativeIcon color="primary" />;
      default: return <AccountIcon color="primary" />;
    }
  };

  const getUserTypeText = (type) => {
    switch (type) {
      case 'doctor': return 'Doctor';
      case 'admin': return 'Admin';
      case 'relative': return 'Relative';
      default: return 'User';
    }
  };

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
    <div className="relative w-full min-h-screen">
      <img
        src={pregnancyImg}
        alt="Background"
        className="absolute w-full h-full object-cover z-0"
      />
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
              <h1 className="text-xl font-bold text-center">Users</h1>
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

        {/* Main Content - Removed extra white background */}
        <div className="max-w-6xl mx-auto">
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
              <CircularProgress size={60} />
            </Box>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <List sx={{ 
                width: '100%', 
                maxWidth: 800, 
                margin: '0 auto',
                padding: 0 // Remove default padding
              }}>
                {users.map((user, index) => (
                  <motion.div
                    key={user.email}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="mb-4" // Added margin between cards
                  >
                    <Card sx={{ 
                      borderRadius: 3,
                      overflow: 'hidden',
                      maxWidth: 800,
                      margin: '0 auto',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <ListItemAvatar>
                            <Avatar sx={{ width: 40, height: 40 }}>
                              {getUserTypeIcon(user.type)}
                            </Avatar>
                          </ListItemAvatar>
                          
                          <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" fontWeight="bold">
                              {user.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {user.email}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {getUserTypeText(user.type)}
                            </Typography>
                          </Box>
                          
                          {user.isVerified ? (
                            <VerifiedIcon color="success" />
                          ) : (
                            <CancelIcon color="error" />
                          )}
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </List>
            </motion.div>
          )}
        </div>

        {/* User Modal */}
        <AnimatePresence>
          {showUserModal && <UserModal />}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UserListPage;