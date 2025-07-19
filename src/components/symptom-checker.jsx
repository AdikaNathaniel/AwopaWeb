import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import pregnancyImg from '../assets/pregnancy.png';
import {
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Snackbar,
  Icon
} from '@mui/material';
import {
  Numbers as NumbersIcon,
  Person as PersonIcon,
  Headset as HeadsetIcon,
  Autorenew as AutorenewIcon,
  EmojiFoodBeverage as EmojiFoodBeverageIcon,
  MedicalServices as MedicalServicesIcon
} from '@mui/icons-material';

const SymptomForm = () => {
  const [formData, setFormData] = useState({
    patientId: '',
    username: '',
    feelingHeadache: '',
    feelingDizziness: '',
    vomitingAndNausea: '',
    painAtTopOfTommy: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all fields
    if (!formData.patientId || !formData.username || 
        !formData.feelingHeadache || !formData.feelingDizziness || 
        !formData.vomitingAndNausea || !formData.painAtTopOfTommy) {
      showSnackbar('Please fill all fields before submitting', 'error');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await axios.post(
        'http://localhost:3100/api/v1/symptoms',
        formData,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 200 || response.status === 201) {
        showSnackbar('Submitted successfully!', 'success');
        // Reset form
        setFormData({
          patientId: '',
          username: '',
          feelingHeadache: '',
          feelingDizziness: '',
          vomitingAndNausea: '',
          painAtTopOfTommy: ''
        });
      } else {
        showSnackbar(`Submission failed: ${response.status}`, 'error');
      }
    } catch (error) {
      showSnackbar(`Error: ${error.message}`, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const BuildSymptomTile = ({ label, icon, value, name }) => {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 400 }}
      >
        <Card 
          sx={{ 
            mb: 2, 
            borderRadius: 3,
            boxShadow: 3
          }}
        >
          <CardContent>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                {React.cloneElement(icon, { color: 'primary' })}
                <Typography variant="h6" component="div" sx={{ ml: 1.5 }}>
                  {label}
                </Typography>
              </div>
              
              <RadioGroup 
                row 
                name={name}
                value={value}
                onChange={(e) => handleRadioChange(name, e.target.value)}
                sx={{ justifyContent: 'space-around' }}
              >
                <motion.div whileHover={{ scale: 1.05 }}>
                  <FormControlLabel 
                    value="yes" 
                    control={<Radio />} 
                    label="Yes" 
                  />
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <FormControlLabel 
                    value="no" 
                    control={<Radio />} 
                    label="No" 
                  />
                </motion.div>
              </RadioGroup>
            </motion.div>
          </CardContent>
        </Card>
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header Section - Wider than the form card */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              padding: '16px 0',
              marginBottom: '16px',
              width: '90%', // Wider than the form
              maxWidth: '900px', // Slightly wider max-width
              margin: '0 auto'
            }}
          >
            <div style={{ 
              backgroundColor: '#06b6d4', 
              color: 'white', 
              padding: '16px',
              borderRadius: '8px',
              textAlign: 'center',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              width: '100%' // Ensure it takes full width of parent
            }}>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
                Preeclampsia Symptom Checker
              </h1>
            </div>
          </motion.div>

          {/* Form Content - Slightly narrower than the header */}
          <div style={{ 
            padding: '0 20px 20px', 
            width: '85%', 
            maxWidth: '800px', 
            margin: '0 auto' 
          }}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              <Card 
                sx={{ 
                  borderRadius: 3,
                  boxShadow: 5
                }}
              >
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    {/* Patient ID Field */}
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      <TextField
                        fullWidth
                        label="Patient ID"
                        name="patientId"
                        value={formData.patientId}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        InputProps={{
                          startAdornment: <NumbersIcon color="primary" sx={{ mr: 1 }} />
                        }}
                        placeholder="Enter Patient ID"
                        required
                      />
                    </motion.div>

                    {/* Patient Name Field */}
                    <motion.div
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    >
                      <TextField
                        fullWidth
                        label="Patient Name"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        margin="normal"
                        variant="outlined"
                        InputProps={{
                          startAdornment: <PersonIcon color="primary" sx={{ mr: 1 }} />
                        }}
                        placeholder="Enter Patient Name"
                        required
                      />
                    </motion.div>

                    {/* Symptom Questions */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4, duration: 0.5 }}
                    >
                      <BuildSymptomTile
                        label="Do you feel headache?"
                        icon={<HeadsetIcon />}
                        value={formData.feelingHeadache}
                        name="feelingHeadache"
                      />

                      <BuildSymptomTile
                        label="Do you feel dizziness?"
                        icon={<AutorenewIcon />}
                        value={formData.feelingDizziness}
                        name="feelingDizziness"
                      />

                      <BuildSymptomTile
                        label="Are you vomiting or feeling nausea?"
                        icon={<EmojiFoodBeverageIcon />}
                        value={formData.vomitingAndNausea}
                        name="vomitingAndNausea"
                      />

                      <BuildSymptomTile
                        label="Is there pain at the top of your tummy?"
                        icon={<MedicalServicesIcon />}
                        value={formData.painAtTopOfTommy}
                        name="painAtTopOfTommy"
                      />
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div
                      style={{ marginTop: '32px', width: '100%' }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        disabled={isSubmitting}
                        sx={{
                          height: '50px',
                          backgroundColor: '#06b6d4',
                          '&:hover': { backgroundColor: '#0891b2' },
                          fontSize: '16px',
                          borderRadius: '8px',
                          textTransform: 'none'
                        }}
                      >
                        {isSubmitting ? (
                          <CircularProgress size={24} color="inherit" />
                        ) : (
                          'Submit Symptoms'
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message={snackbarMessage}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          sx={{
            '& .MuiSnackbarContent-root': {
              backgroundColor: snackbarSeverity === 'error' ? '#ef4444' : '#10b981'
            }
          }}
        />
      </div>
    </div>
  );
};

export default SymptomForm;