import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Card,
  CardContent,
  Box,
  Chip,
  LinearProgress,
  CircularProgress,
  Button
} from '@mui/material';
import {
  Refresh as RefreshIcon,
  ErrorOutline as ErrorOutlineIcon,
  Favorite as FavoriteIcon,
  Thermostat as ThermostatIcon,
  MonitorHeart as MonitorHeartIcon,
  Air as AirIcon,
  Science as ScienceIcon,
  WaterDrop as WaterDropIcon,
  InfoOutlined as InfoOutlinedIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { format } from 'date-fns';
import pregnancyImg from '../assets/pregnancy.png';

const PreeclampsiaVitals = () => {
  const [vitals, setVitals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const theme = useTheme();

  useEffect(() => {
    fetchVitals();
    const interval = setInterval(fetchVitals, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchVitals = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:3100/api/v1/vitals');
      
      if (response.data.success) {
        const sortedVitals = response.data.result
          .map(vital => ({
            ...vital,
            createdAt: new Date(vital.createdAt)
          }))
          .sort((a, b) => a.createdAt - b.createdAt);
        
        setVitals(sortedVitals);
        setErrorMessage('');
      } else {
        setErrorMessage(`Failed to load data: ${response.status}`);
      }
    } catch (error) {
      setErrorMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'no preeclampsia':
      case 'normal':
        return theme.palette.success.main;
      case 'mild':
        return theme.palette.warning.main;
      case 'moderate':
        return theme.palette.error.light;
      case 'severe':
        return theme.palette.error.main;
      default:
        return theme.palette.grey[500];
    }
  };

  const formatDateTime = (date) => {
    return format(date, 'MMM dd, yyyy - HH:mm:ss');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${pregnancyImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center', fontWeight: 'bold' }}>
            Preeclampsia Prediction
          </Typography>
          <IconButton color="inherit" onClick={fetchVitals}>
            <RefreshIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 2 }}>
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : errorMessage ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box sx={{ textAlign: 'center', p: 4 }}>
              <ErrorOutlineIcon sx={{ fontSize: 64, color: 'error.main' }} />
              <Typography color="error" sx={{ mt: 2, mb: 2 }}>
                {errorMessage}
              </Typography>
              <Button
                variant="contained"
                startIcon={<RefreshIcon />}
                onClick={fetchVitals}
                sx={{
                  backgroundColor: 'cyan.600',
                  '&:hover': { backgroundColor: 'cyan.700' }
                }}
              >
                Retry
              </Button>
            </Box>
          </motion.div>
        ) : vitals.length === 0 ? (
          <Typography align="center" sx={{ mt: 4, fontSize: 18, color: 'grey.500' }}>
            No vitals recorded yet.
          </Typography>
        ) : (
          <AnimatePresence>
            {vitals.map((vital, index) => (
              <motion.div
                key={vital.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
              >
                <VitalCard 
                  vital={vital} 
                  getSeverityColor={getSeverityColor}
                  formatDateTime={formatDateTime}
                  sx={{ mb: 3 }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </Box>
    </Box>
  );
};

const VitalCard = ({ vital, getSeverityColor, formatDateTime }) => {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: 3,
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(5px)'
      }}
    >
      <CardContent>
        {/* Header Row */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="subtitle1" color="primary" fontWeight="bold">
            Patient: {vital.patientId}
          </Typography>
          <Chip
            label={vital.severity.toUpperCase()}
            sx={{ 
              color: 'white',
              backgroundColor: getSeverityColor(vital.severity)
            }}
          />
        </Box>

        {/* Vitals Grid */}
        <Box sx={{ mb: 2 }}>
          {/* Top Row */}
          <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
            <VitalItem 
              icon={<FavoriteIcon />} 
              label="BP" 
              value={`${vital.systolic}/${vital.diastolic}`} 
              unit="mmHg" 
              color="error.main" 
            />
            <VitalItem 
              icon={<ThermostatIcon />} 
              label="Temp" 
              value={vital.temperature.toFixed(1)} 
              unit="°C" 
              color="warning.main" 
            />
            <VitalItem 
              icon={<MonitorHeartIcon />} 
              label="HR" 
              value={vital.heartRate} 
              unit="bpm" 
              color="secondary.main" 
            />
          </Box>
          
          {/* Bottom Row */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            <VitalItem 
              icon={<AirIcon />} 
              label="SpO2" 
              value={vital.spo2} 
              unit="%" 
              color="info.main" 
            />
            <VitalItem 
              icon={<ScienceIcon />} 
              label="MAP" 
              value={vital.map.toFixed(1)} 
              unit="mmHg" 
              color="primary.main" 
            />
            <VitalItem 
              icon={<WaterDropIcon />} 
              label="Protein" 
              value={vital.proteinuria} 
              unit="+" 
              color="success.main" 
            />
          </Box>
        </Box>

        {/* Rationale */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <InfoOutlinedIcon sx={{ fontSize: 18, color: 'grey.500', mr: 1 }} />
          <Typography variant="caption" color="text.secondary">
            {vital.rationale}
          </Typography>
        </Box>

        {/* Timestamp */}
        <Typography 
          variant="caption" 
          color="text.secondary" 
          sx={{ display: 'block', textAlign: 'right' }}
        >
          {formatDateTime(vital.createdAt)}
        </Typography>
      </CardContent>
    </Card>
  );
};

const VitalItem = ({ icon, label, value, unit, color }) => {
  return (
    <Box
      sx={{
        flex: 1,
        p: 1,
        border: 1,
        borderColor: 'divider',
        borderRadius: 2,
        textAlign: 'center',
        backgroundColor: 'background.paper'
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {React.cloneElement(icon, { sx: { fontSize: 16, color, mr: 0.5 } })}
        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>
      </Box>
      <Typography variant="body2" fontWeight="bold">
        {value}
        <Typography component="span" variant="caption" color="text.secondary">
          {' '}{unit}
        </Typography>
      </Typography>
    </Box>
  );
};

export default PreeclampsiaVitals;