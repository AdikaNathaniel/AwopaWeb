import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import pregnancyImg from '../assets/pregnancy.png';
import {
  TextField,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
  Box,
  Typography,
  FormControl
} from '@mui/material';
import {
  PersonOutline as PersonIcon,
  LockOutlined as LockIcon,
  LockOpen as LockOpenIcon,
  PhoneOutlined as PhoneIcon,
  CheckCircle as CheckCircleIcon,
  Error as ErrorIcon
} from '@mui/icons-material';

const PinUpdateScreen = () => {
  const [formData, setFormData] = useState({
    userId: '',
    oldPin: ['', '', '', '', '', ''],
    newPin: '',
    phone: ''
  });
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePinChange = (index, value) => {
    const newPin = [...formData.oldPin];
    newPin[index] = value;
    setFormData(prev => ({ ...prev, oldPin: newPin }));
    
    if (value && index < 5) {
      document.getElementById(`pin-${index + 1}`)?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const oldPin = formData.oldPin.join('');
    if (oldPin.length !== 6) {
      setError('Please enter complete 6-digit old PIN');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.patch(
        'http://localhost:3100/api/v1/pin',
        {
          userId: formData.userId.trim(),
          oldPin: oldPin,
          newPin: formData.newPin.trim(),
          phone: formData.phone.trim()
        },
        {
          headers: { 'Content-Type': 'application/json' },
          timeout: 30000
        }
      );

      if (response.status === 200) {
        setDialogMessage(response.data.message || 'PIN updated successfully');
        setShowSuccessDialog(true);
        resetForm();
      } else {
        throw new Error(response.data.message || 'Failed to update PIN');
      }
    } catch (err) {
      let errorMessage = 'Error occurred';
      if (err.response) {
        errorMessage = err.response.data.message || `Failed to update PIN (${err.response.status})`;
      } else if (err.message.includes('timeout')) {
        errorMessage = 'Request timed out';
      } else if (err.message.includes('Network Error')) {
        errorMessage = 'Network error';
      } else {
        errorMessage = err.message;
      }
      setDialogMessage(errorMessage);
      setShowErrorDialog(true);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      userId: '',
      oldPin: ['', '', '', '', '', ''],
      newPin: '',
      phone: ''
    });
  };

  const PinInputField = ({ index }) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <TextField
        id={`pin-${index}`}
        value={formData.oldPin[index]}
        onChange={(e) => handlePinChange(index, e.target.value)}
        onFocus={() => setFocusedIndex(index)}
        onBlur={() => setFocusedIndex(-1)}
        inputProps={{
          maxLength: 1,
          style: {
            fontSize: '20px',
            fontWeight: 'bold',
            textAlign: 'center'
          }
        }}
        type="password"
        variant="outlined"
        sx={{
          width: '45px',
          '& .MuiOutlinedInput-root': {
            backgroundColor: focusedIndex === index ? '#e0f7fa' : '#f5f5f5',
            '& fieldset': {
              borderColor: focusedIndex === index ? '#00acc1' : '#9e9e9e',
              borderWidth: focusedIndex === index ? '2px' : '1.5px'
            },
            '&:hover fieldset': {
              borderColor: '#00acc1'
            }
          }
        }}
      />
    </motion.div>
  );

  // Calculate the width of the PIN input container (6 fields with 10px gap)
  const pinContainerWidth = 6 * 45 + 5 * 10; // 6 fields * 45px + 5 gaps * 10px

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
            Update PIN
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
              {/* User ID Field */}
              <FormControl fullWidth sx={{ mb: 3 }}>
                <Typography 
                  variant="subtitle1" 
                  component="label" 
                  htmlFor="userId"
                  sx={{
                    display: 'block',
                    mb: 1,
                    color: 'white',
                    fontWeight: 'medium'
                  }}
                >
                  User Name
                </Typography>
                <motion.div
                  initial={{ x: -20 }}
                  animate={{ x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <TextField
                    id="userId"
                    name="userId"
                    value={formData.userId}
                    onChange={handleChange}
                    variant="outlined"
                    required
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon color="primary" />
                        </InputAdornment>
                      ),
                      sx: {
                        backgroundColor: 'white',
                        borderRadius: '12px',
                      }
                    }}
                    sx={{
                      width: `${pinContainerWidth}px`,
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'transparent',
                        },
                        '&:hover fieldset': {
                          borderColor: '#00acc1',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#00acc1',
                        },
                      }
                    }}
                  />
                </motion.div>
              </FormControl>

              {/* PIN Field */}
              <FormControl fullWidth sx={{ mb: 3 }}>
                <Typography 
                  variant="subtitle1" 
                  component="label"
                  sx={{
                    display: 'block',
                    mb: 1,
                    color: 'white',
                    fontWeight: 'medium'
                  }}
                >
                  Enter your old PIN:
                </Typography>
                <motion.div
                  initial={{ x: -20 }}
                  animate={{ x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    gap: '10px',
                    width: `${pinContainerWidth}px`
                  }}>
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <PinInputField key={index} index={index} />
                    ))}
                  </Box>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                        {error}
                      </Typography>
                    </motion.div>
                  )}
                </motion.div>
              </FormControl>

              {/* New PIN Field */}
              <FormControl fullWidth sx={{ mb: 3 }}>
                <Typography 
                  variant="subtitle1" 
                  component="label" 
                  htmlFor="newPin"
                  sx={{
                    display: 'block',
                    mb: 1,
                    color: 'white',
                    fontWeight: 'medium'
                  }}
                >
                  New PIN
                </Typography>
                <motion.div
                  initial={{ x: -20 }}
                  animate={{ x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <TextField
                    id="newPin"
                    name="newPin"
                    value={formData.newPin}
                    onChange={handleChange}
                    variant="outlined"
                    required
                    type="password"
                    inputProps={{
                      maxLength: 6
                    }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon color="primary" />
                        </InputAdornment>
                      ),
                      sx: {
                        backgroundColor: 'white',
                        borderRadius: '12px',
                      }
                    }}
                    sx={{
                      width: `${pinContainerWidth}px`,
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'transparent',
                        },
                        '&:hover fieldset': {
                          borderColor: '#00acc1',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#00acc1',
                        },
                      }
                    }}
                  />
                </motion.div>
                <Typography variant="caption" sx={{ color: 'white', mt: 1 }}>
                  PIN must be at least 4 digits
                </Typography>
              </FormControl>

              {/* Phone Field */}
              <FormControl fullWidth sx={{ mb: 4 }}>
                <Typography 
                  variant="subtitle1" 
                  component="label" 
                  htmlFor="phone"
                  sx={{
                    display: 'block',
                    mb: 1,
                    color: 'white',
                    fontWeight: 'medium'
                  }}
                >
                  Phone Number
                </Typography>
                <motion.div
                  initial={{ x: -20 }}
                  animate={{ x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <TextField
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    variant="outlined"
                    required
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneIcon color="primary" />
                        </InputAdornment>
                      ),
                      sx: {
                        backgroundColor: 'white',
                        borderRadius: '12px',
                      }
                    }}
                    sx={{
                      width: `${pinContainerWidth}px`,
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'transparent',
                        },
                        '&:hover fieldset': {
                          borderColor: '#00acc1',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#00acc1',
                        },
                      }
                    }}
                  />
                </motion.div>
                <Typography variant="caption" sx={{ color: 'white', mt: 1 }}>
                  Please enter a valid phone number
                </Typography>
              </FormControl>

              {/* Submit Button */}
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
                    startIcon={!isLoading && <LockOpenIcon />}
                    sx={{
                      height: '56px',
                      backgroundColor: '#00acc1',
                      '&:hover': { backgroundColor: '#00838f' },
                      borderRadius: '12px',
                      fontSize: '18px',
                      fontWeight: '600'
                    }}
                  >
                    {isLoading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      'Update PIN'
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
          <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
            <CheckCircleIcon color="success" sx={{ fontSize: '30px', mr: 1 }} />
            <Typography variant="h6" component="span" sx={{ fontWeight: 'bold' }}>
              Success
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Typography>{dialogMessage}</Typography>
          </DialogContent>
          <DialogActions>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => setShowSuccessDialog(false)}
                sx={{
                  backgroundColor: '#00acc1',
                  color: 'white',
                  borderRadius: '12px',
                  fontWeight: 'bold'
                }}
              >
                OK
              </Button>
            </motion.div>
          </DialogActions>
        </Dialog>

        {/* Error Dialog */}
        <Dialog
          open={showErrorDialog}
          onClose={() => setShowErrorDialog(false)}
          PaperProps={{
            sx: {
              borderRadius: '20px',
              padding: '24px',
              backgroundColor: 'white',
              maxWidth: '400px'
            }
          }}
        >
          <DialogTitle sx={{ display: 'flex', alignItems: 'center' }}>
            <ErrorIcon color="error" sx={{ fontSize: '30px', mr: 1 }} />
            <Typography variant="h6" component="span" sx={{ fontWeight: 'bold' }}>
              Error
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Typography>{dialogMessage}</Typography>
          </DialogContent>
          <DialogActions>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => setShowErrorDialog(false)}
                sx={{
                  backgroundColor: '#00acc1',
                  color: 'white',
                  borderRadius: '12px',
                  fontWeight: 'bold'
                }}
              >
                OK
              </Button>
            </motion.div>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default PinUpdateScreen;