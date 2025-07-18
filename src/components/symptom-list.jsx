import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import pregnancyImg from '../assets/pregnancy.png';
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  IconButton,
  Divider,
  Box,
  Button // Added missing Button import
} from '@mui/material';
import {
  Badge as BadgeIcon,
  Person as PersonIcon,
  Headphones as HeadphonesIcon,
  Sick as SickIcon,
  PanToolAlt as PanToolAltIcon,
  CalendarToday as CalendarTodayIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';

const SymptomListPage = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchSymptoms();
  }, []);

  const fetchSymptoms = async () => {
    try {
      const response = await axios.get('http://localhost:3100/api/v1/symptoms');
      
      if (response.status === 200) {
        setSymptoms(response.data.result || []);
      } else {
        console.error("Failed to load symptoms:", response.status);
      }
    } catch (error) {
      console.error("Error fetching symptoms:", error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchSymptoms();
  };

  const SymptomTile = ({ symptom, index }) => { // Fixed typo in component name
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
      >
        <Card
          sx={{
            margin: '10px 16px',
            borderRadius: '15px',
            boxShadow: 5,
            overflow: 'hidden'
          }}
        >
          <CardContent>
            {/* Patient ID and Name Row */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <BadgeIcon sx={{ color: 'purple', mr: 1 }} />
              <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'purple' }}>
                ID: {symptom.patientId || 'N/A'}
              </Typography>
              <Box sx={{ flexGrow: 1 }} />
              <PersonIcon sx={{ color: 'primary.main', mr: 1 }} />
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                {symptom.username}
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Symptoms Information */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <HeadphonesIcon sx={{ color: 'red', mr: 1 }} />
              <Typography variant="body2">
                Headache: {symptom.feelingHeadache}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <SickIcon sx={{ color: 'green', mr: 1 }} />
              <Typography variant="body2">
                Vomiting/Nausea: {symptom.vomitingAndNausea}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <PanToolAltIcon sx={{ color: 'orange', mr: 1 }} />
              <Typography variant="body2">
                Pain at Top of Tummy: {symptom.painAtTopOfTommy}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <CalendarTodayIcon sx={{ color: 'primary.main', mr: 1 }} />
              <Typography variant="body2">
                Created: {new Date(symptom.createdAt).toLocaleString()}
              </Typography>
            </Box>
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
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Typography variant="h5" component="h1" sx={{ flexGrow: 1 }}>
            Patient Symptom Checker
          </Typography>
          
          <motion.div
            whileHover={{ rotate: 180, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <IconButton 
              onClick={handleRefresh}
              sx={{ color: 'white' }}
            >
              <RefreshIcon />
            </IconButton>
          </motion.div>
        </motion.div>

        {/* Content */}
        {isLoading ? (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '80vh' 
          }}>
            <CircularProgress size={60} sx={{ color: '#06b6d4' }} />
          </Box>
        ) : symptoms.length === 0 ? (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '80vh',
            color: 'white'
          }}>
            <Typography variant="h6">No symptoms found</Typography>
          </Box>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{ paddingBottom: '20px' }}
          >
            {symptoms.map((symptom, index) => (
              <SymptomTile key={symptom._id || index} symptom={symptom} index={index} />
            ))}

            {/* Refresh Button */}
            <motion.div
              style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                marginTop: '20px' 
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="contained"
                onClick={handleRefresh}
                disabled={refreshing}
                startIcon={<RefreshIcon />}
                sx={{
                  backgroundColor: '#06b6d4',
                  '&:hover': { backgroundColor: '#0891b2' },
                  '&:disabled': { backgroundColor: '#cccccc' }
                }}
              >
                {refreshing ? 'Refreshing...' : 'Refresh Data'}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SymptomListPage;