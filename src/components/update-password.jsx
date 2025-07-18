import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import pregnancyImg from '../assets/pregnancy.png';
import {
  TextField,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Icon,
  Box,
  Typography
} from '@mui/material';
import {
  Email as EmailIcon,
  Lock as LockIcon,
  LockOutlined as LockOutlinedIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';

const UpdatePasswordPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    oldPassword: '',
    newPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'error'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.patch(
        'http://localhost:3100/api/v1/users/update-password-or-name',
        {
          email: formData.email.trim(),
          oldPassword: formData.oldPassword.trim(),
          newPassword: formData.newPassword.trim()
        },
        { timeout: 10000 }
      );

      if (response.status === 200) {
        setFormData({
          email: '',
          oldPassword: '',
          newPassword: ''
        });
        setShowSuccessDialog(true);
      } else {
        throw new Error(response.data.message || 'Server error');
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || error.message,
        severity: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const BuildTextField = ({ name, label, icon, type = 'text', placeholder }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ mb: 2 }}>
          <Typography 
            variant="subtitle1" 
            component="label" 
            htmlFor={name}
            sx={{
              display: 'block',
              mb: 1,
              color: 'white',
              fontWeight: 'medium'
            }}
          >
            {label}
          </Typography>
          <TextField
            fullWidth
            id={name}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            type={type}
            variant="outlined"
            required
            placeholder={placeholder}
            InputProps={{
              startAdornment: (
                <Icon color="primary" sx={{ mr: 1 }}>
                  {icon}
                </Icon>
              ),
              sx: {
                backgroundColor: 'white',
                borderRadius: '10px',
                '& input': {
                  color: 'black',
                  '&::placeholder': {
                    color: '#666',
                    opacity: 1
                  }
                }
              }
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'transparent',
                },
                '&:hover fieldset': {
                  borderColor: '#1976d2',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#1976d2',
                },
              }
            }}
          />
        </Box>
      </motion.div>
    );
  };

  return (
    <div 
      style={{
        backgroundImage: `url(${pregnancyImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        minHeight: '100vh'
      }}
    >
      <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', minHeight: '100vh' }}>
        {/* AppBar */}
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: 'spring', stiffness: 300 }}
          style={{
            backgroundColor: '#1976d2',
            color: 'white',
            padding: '16px',
            textAlign: 'center',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}
        >
          <Typography variant="h5" component="h1">
            Update Password
          </Typography>
        </motion.div>

        {/* Form Content */}
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit}>
              <Box sx={{ mt: 3 }}>
                <BuildTextField 
                  name="email"
                  label="Email Address"
                  icon={<EmailIcon />}
                  placeholder="Enter your email"
                />
              </Box>

              <Box sx={{ mt: 2 }}>
                <BuildTextField 
                  name="oldPassword"
                  label="Current Password"
                  icon={<LockIcon />}
                  type="password"
                  placeholder="Enter your current password"
                />
              </Box>

              <Box sx={{ mt: 2 }}>
                <BuildTextField 
                  name="newPassword"
                  label="New Password"
                  icon={<LockOutlinedIcon />}
                  type="password"
                  placeholder="Create a new password"
                />
              </Box>

              <Box sx={{ mt: 4 }}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={isLoading}
                    sx={{
                      height: '50px',
                      backgroundColor: '#06b6d4',
                      '&:hover': { backgroundColor: '#0891b2' },
                      borderRadius: '10px',
                      fontSize: '16px',
                      fontWeight: 'bold'
                    }}
                  >
                    {isLoading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      'Update Password'
                    )}
                  </Button>
                </motion.div>
              </Box>
            </form>
          </motion.div>
        </div>

        {/* Success Dialog */}
        <Dialog
          open={showSuccessDialog}
          onClose={() => setShowSuccessDialog(false)}
          PaperProps={{
            sx: {
              borderRadius: '20px',
              padding: '24px',
              backgroundColor: 'white',
              maxWidth: '400px'
            }
          }}
        >
          <DialogContent>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              textAlign: 'center'
            }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(76, 175, 80, 0.2)',
                  mb: 3
                }}
              >
                <CheckCircleIcon sx={{ color: '#4CAF50', fontSize: '60px' }} />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#4CAF50', mb: 1 }}>
                Password Updated!
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                Your password has been successfully updated.
              </Typography>
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="contained"
                onClick={() => setShowSuccessDialog(false)}
                sx={{
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  width: '100%',
                  fontWeight: 'bold'
                }}
              >
                Continue
              </Button>
            </motion.div>
          </DialogActions>
        </Dialog>

        {/* Error Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            onClose={handleCloseSnackbar} 
            severity={snackbar.severity}
            sx={{ 
              width: '100%',
              borderRadius: '10px',
              fontWeight: 'medium'
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default UpdatePasswordPage;