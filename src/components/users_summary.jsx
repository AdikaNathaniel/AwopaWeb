import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import pregnancyImg from '../assets/pregnancy.png';
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Snackbar,
  TextField,
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
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    color: 'success'
  });
  const [userDialogOpen, setUserDialogOpen] = useState(false);

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
      showSnackbar('Failed to load users', 'error');
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, color: severity });
    setTimeout(() => setSnackbar(prev => ({ ...prev, open: false })), 2000);
  };

  const handleLogout = async () => {
    try {
      const response = await axios.put('http://localhost:3100/api/v1/users/logout');
      if (response.data.success) {
        showSnackbar('Logged out successfully', 'success');
        setUserDialogOpen(false);
        // Add navigation logic here if needed
      } else {
        showSnackbar(`Logout failed: ${response.data.message}`, 'error');
      }
    } catch (error) {
      showSnackbar('Logout failed: Server error', 'error');
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

  return (
    <div style={{
      backgroundImage: `url(${pregnancyImg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh'
    }}>
      <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', minHeight: '100vh' }}>
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <AppBar
            position="static"
            sx={{
              backgroundColor: 'rgba(33, 150, 243, 0.8)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Typography variant="h6" component="div" sx={{ color: 'white' }}>
                  Users
                </Typography>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <IconButton onClick={() => setUserDialogOpen(true)}>
                  <Avatar sx={{ bgcolor: 'white' }}>
                    <Typography sx={{ color: '#2196F3' }}>
                      {userEmail?.[0]?.toUpperCase() || 'U'}
                    </Typography>
                  </Avatar>
                </IconButton>
              </motion.div>
            </Box>
          </AppBar>
        </motion.div>

        <Box sx={{ p: 3 }}>
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
              <CircularProgress size={60} />
            </Box>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <List sx={{ width: '100%', maxWidth: 800, margin: '0 auto' }}>
                {users.map((user, index) => (
                  <motion.div
                    key={user.email}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Card sx={{ mb: 2, borderRadius: 3, overflow: 'hidden' }}>
                      <motion.div whileTap={{ scale: 0.98 }}>
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
                      </motion.div>
                    </Card>
                  </motion.div>
                ))}
              </List>
            </motion.div>
          )}
        </Box>

        {/* User Profile Dialog */}
        <Dialog
          open={userDialogOpen}
          onClose={() => setUserDialogOpen(false)}
          PaperProps={{
            sx: {
              borderRadius: 3,
              background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
              minWidth: 300
            }
          }}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
              Profile
            </DialogTitle>
            
            <DialogContent>
              <List>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'rgba(33, 150, 243, 0.1)' }}>
                      <EmailIcon color="primary" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={userEmail} />
                </ListItem>
                
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: 'rgba(33, 150, 243, 0.1)' }}>
                      <SettingsIcon color="primary" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary="Settings" />
                </ListItem>
              </List>
            </DialogContent>
            
            <DialogActions sx={{ justifyContent: 'center', p: 2 }}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={handleLogout}
                  startIcon={<LogoutIcon />}
                  sx={{
                    backgroundColor: '#00ACC1',
                    color: 'white',
                    borderRadius: 2,
                    px: 3,
                    py: 1,
                    '&:hover': {
                      backgroundColor: '#00838F'
                    }
                  }}
                >
                  Logout
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => setUserDialogOpen(false)}
                  sx={{
                    color: '#00ACC1',
                    borderRadius: 2,
                    px: 3,
                    py: 1,
                    border: '1px solid #00ACC1',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 172, 193, 0.1)'
                    }
                  }}
                >
                  Close
                </Button>
              </motion.div>
            </DialogActions>
          </motion.div>
        </Dialog>

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          message={snackbar.message}
          autoHideDuration={2000}
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          ContentProps={{
            sx: {
              backgroundColor: snackbar.color === 'error' ? '#f44336' : '#4CAF50',
              color: 'white',
              borderRadius: 2,
              fontWeight: 'bold'
            }
          }}
        />
      </div>
    </div>
  );
};

export default UserListPage;