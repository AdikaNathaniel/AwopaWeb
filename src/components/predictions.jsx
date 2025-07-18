import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Avatar,
  Switch
} from '@mui/material';
import {
  CalendarToday,
  Medication,
  HelpOutline,
  MedicalServices,
  MonitorHeart,
  Bloodtype,
  HealthAndSafety,
  Email,
  Settings,
  Map as MapIcon,
  Logout,
  LightMode,
  DarkMode,
  Menu as MenuIcon,
  CheckCircle
} from '@mui/icons-material';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import pregnancyImg from '../assets/pregnancy.png';

const PregnancyComplicationsPage = ({ userEmail = 'user@example.com' }) => {
  const theme = useTheme();
  const [darkMode, setDarkMode] = useState(false);
  const [complications, setComplications] = useState([
    { name: 'Preeclampsia', severity: 'Mid' },
    { name: 'Anemia', severity: 'High' },
    { name: 'Gestational Diabetes', severity: 'Low' }
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#2196F3',
      },
      secondary: {
        main: '#f50057',
      },
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % complications.length);
      randomizeSeverities();
    }, 30000);
    return () => clearInterval(interval);
  }, [complications.length]);

  const randomizeSeverities = () => {
    const severities = ['Low', 'Mid', 'High'];
    setComplications(comps => comps.map(comp => ({
      ...comp,
      severity: severities[Math.floor(Math.random() * severities.length)]
    })));
  };

  const handleLogout = async () => {
    try {
      const response = await axios.put('http://localhost:3100/api/v1/users/logout');
      if (response.data.success) {
        showSuccessDialog("Logout successfully");
        // Redirect to login page would go here
      } else {
        showSnackbar(`Logout failed: ${response.data.message}`);
      }
    } catch (error) {
      showSnackbar("Logout failed: Server error");
    }
  };

  const showSnackbar = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const showSuccessDialog = (message) => {
    setSuccessMessage(message);
    setSuccessDialogOpen(true);
  };

  const SeverityIndicator = ({ severity }) => {
    let color, message;
    
    switch (severity) {
      case 'Low':
        color = '#4CAF50';
        message = 'Monitor your health, stay active and hydrated!';
        break;
      case 'Mid':
        color = '#FF9800';
        message = 'Watch for symptoms and consult your doctor regularly.';
        break;
      case 'High':
        color = '#F44336';
        message = 'Immediate attention is needed. Contact your healthcare provider.';
        break;
      default:
        color = '#9E9E9E';
        message = 'Consult your doctor for further guidance.';
    }

    return (
      <Box sx={{ textAlign: 'center' }}>
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            backgroundColor: color,
            borderRadius: '8px',
            padding: '8px 16px',
            display: 'inline-block',
            marginBottom: '10px'
          }}
        >
          <Typography variant="h6" style={{ color: 'white', fontWeight: 'bold' }}>
            {severity}
          </Typography>
        </motion.div>
        <Typography variant="body1" style={{ color: 'rgba(0, 0, 0, 0.87)' }}>
          {message}
        </Typography>
      </Box>
    );
  };

  const drawerItems = [
    { icon: <CalendarToday />, text: 'Prescriptions', route: '/prescriptions' },
    { icon: <Medication />, text: 'Doctor Chat', route: '/doctor-chat' },
    { icon: <HelpOutline />, text: 'Support Desk', route: '/support' },
    { icon: <MedicalServices />, text: 'Create A Profile', route: '/doctor-profile' },
    { icon: <MonitorHeart />, text: 'Preeclampsia Symptoms', route: '/preeclampsia' },
    { icon: <CalendarToday />, text: 'Appointments', route: '/appointments' },
    { icon: <MonitorHeart />, text: 'Live Preeclampsia Predictions', route: '/preeclampsia-live' },
    { icon: <Bloodtype />, text: 'Glucose Monitoring', route: '/glucose' },
    { icon: <HealthAndSafety />, text: 'Preeclampsia Risk Assessment', route: '/vitals' }
  ];

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        backgroundImage: `url(${pregnancyImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <AppBar position="static" elevation={0}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={() => setDrawerOpen(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
              Pregnancy Complication Prediction
            </Typography>
            <Switch
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              icon={<LightMode />}
              checkedIcon={<DarkMode />}
            />
            <IconButton
              color="inherit"
              onClick={() => setProfileDialogOpen(true)}
            >
              <Avatar sx={{ bgcolor: 'white', color: '#2196F3' }}>
                {userEmail ? userEmail[0].toUpperCase() : 'U'}
              </Avatar>
            </IconButton>
          </Toolbar>
        </AppBar>

        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <Box
            sx={{
              width: 250,
              backgroundColor: '#2196F3',
              color: 'white',
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Box sx={{ p: 2, textAlign: 'center' }}>
              <Typography variant="h6">MEDICAL OFFICER</Typography>
            </Box>
            <List sx={{ flexGrow: 1 }}>
              {drawerItems.map((item, index) => (
                <ListItem 
                  button 
                  key={index}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(255, 255, 255, 0.1)'
                    }
                  }}
                >
                  <ListItemIcon sx={{ color: 'white' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>

        <Box sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          p: 2
        }}>
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Card sx={{ 
                width: '100%', 
                maxWidth: 600, 
                borderRadius: '12px',
                background: 'linear-gradient(135deg, rgba(225, 190, 231, 0.9) 0%, rgba(255, 192, 203, 0.9) 100%)',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)'
              }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography 
                    variant="h4" 
                    component="div" 
                    sx={{ 
                      textAlign: 'center', 
                      fontWeight: 'bold', 
                      color: '#6A1B9A',
                      mb: 3
                    }}
                  >
                    {complications[currentIndex].name}
                  </Typography>
                  <SeverityIndicator severity={complications[currentIndex].severity} />
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>
        </Box>

        {/* Profile Dialog */}
        <Dialog open={profileDialogOpen} onClose={() => setProfileDialogOpen(false)}>
          <DialogTitle sx={{ textAlign: 'center' }}>Profile</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
              <Box sx={{ mr: 2 }}>
                <Email sx={{ color: 'text.primary', fontSize: 30 }} />
                <Settings sx={{ color: 'primary.main', fontSize: 30, mt: 2 }} />
                <MapIcon sx={{ color: 'success.main', fontSize: 30, mt: 2 }} />
              </Box>
              <Box>
                <Typography variant="body1" sx={{ mb: 2 }}>{userEmail}</Typography>
                <Button 
                  variant="text" 
                  startIcon={<Settings />}
                  sx={{ color: 'primary.main', mb: 2 }}
                  onClick={() => {
                    setProfileDialogOpen(false);
                    // Navigate to settings page
                  }}
                >
                  Settings
                </Button>
                <Button 
                  variant="text" 
                  startIcon={<MapIcon />}
                  sx={{ color: 'success.main' }}
                  onClick={() => {
                    setProfileDialogOpen(false);
                    // Navigate to map page
                  }}
                >
                  View Location Of PregMama
                </Button>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={handleLogout} 
              sx={{ color: 'error.main' }}
              startIcon={<Logout />}
            >
              Logout
            </Button>
            <Button 
              onClick={() => setProfileDialogOpen(false)}
              sx={{ backgroundColor: '#00ACC1', color: 'white' }}
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* Success Dialog */}
        <Dialog open={successDialogOpen} onClose={() => setSuccessDialogOpen(false)}>
          <DialogTitle sx={{ textAlign: 'center' }}>
            <CheckCircle sx={{ color: '#4CAF50', fontSize: 50 }} />
          </DialogTitle>
          <DialogContent>
            <Typography variant="body1" textAlign="center">{successMessage}</Typography>
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={() => setSuccessDialogOpen(false)}
              sx={{ backgroundColor: '#00ACC1', color: 'white' }}
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2000}
          onClose={() => setSnackbarOpen(false)}
          message={snackbarMessage}
          sx={{ 
            '& .MuiSnackbarContent-root': { 
              backgroundColor: '#F44336',
              color: 'white'
            }
          }}
        />
      </Box>
    </ThemeProvider>
  );
};

export default PregnancyComplicationsPage;