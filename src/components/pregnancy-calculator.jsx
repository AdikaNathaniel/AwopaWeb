import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
} from '@mui/material';
import {
  CalendarToday as CalendarTodayIcon,
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';
import { format } from 'date-fns';
import pregnancyImg from '../assets/pregnancy.png';

const PregnancyCalculatorScreen = ({ userEmail }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [weeksPregnant, setWeeksPregnant] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  const calculatePregnancyWeeks = () => {
    if (!selectedDate) return;

    const today = new Date();
    const diffTime = Math.abs(today - selectedDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diffDays / 7);

    setWeeksPregnant(weeks);
    showAntenatalVisitDialog(weeks);
  };

  const showAntenatalVisitDialog = (weeks) => {
    let message;
    if (weeks < 28) {
      message = "You need 1 antenatal visit per month.";
    } else if (weeks < 36) {
      message = "You need 2 antenatal visits per month.";
    } else {
      message = "You need 1 antenatal visit per week.";
    }

    setDialogMessage(message);
    setDialogOpen(true);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    calculatePregnancyWeeks();
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
      <AppBar position="static" elevation={0} sx={{ backgroundColor: 'cyan.600' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Pregnancy Calculator
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              borderRadius: 4,
              p: 4,
              boxShadow: 3
            }}
          >
            {/* Pregnancy Image */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              style={{ marginBottom: '2rem' }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: 200,
                  borderRadius: 2,
                  overflow: 'hidden',
                  backgroundImage: `url(${pregnancyImg})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
            </motion.div>

            {/* Instruction Text */}
            <Typography
              variant="h6"
              align="center"
              gutterBottom
              sx={{ mb: 3, fontWeight: 'medium' }}
            >
              Select the first day of your last menstrual period (LMP)
            </Typography>

            {/* Date Picker Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="contained"
                startIcon={<CalendarTodayIcon />}
                onClick={() => {
                  // In a real app, you would use a date picker component here
                  const date = new Date();
                  date.setDate(date.getDate() - 280); // Default to 40 weeks ago
                  handleDateChange(date);
                }}
                sx={{
                  backgroundColor: 'cyan.600',
                  '&:hover': { backgroundColor: 'cyan.700' },
                  py: 2,
                  px: 4,
                  fontSize: '1rem',
                  display: 'block',
                  mx: 'auto',
                  mb: 3
                }}
              >
                {selectedDate 
                  ? format(selectedDate, 'MMMM dd, yyyy') 
                  : "Select Date"}
              </Button>
            </motion.div>

            {/* Display Weeks Pregnant */}
            <AnimatePresence>
              {weeksPregnant !== null && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Typography
                    variant="h5"
                    align="center"
                    gutterBottom
                    sx={{ mt: 2, fontWeight: 'medium' }}
                  >
                    Congratulations!!
                  </Typography>
                  <Typography
                    variant="h3"
                    align="center"
                    sx={{
                      fontWeight: 'bold',
                      color: 'primary.main',
                      mb: 4,
                      textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                  >
                    You Are {weeksPregnant} Weeks Pregnant
                  </Typography>
                </motion.div>
              )}
            </AnimatePresence>

            {/* View My Vitals Button */}
            <motion.div
              whileHover={{ x: 5 }}
              style={{ textAlign: 'center', marginTop: '2rem' }}
            >
              <Button
                endIcon={<ChevronRightIcon />}
                onClick={() => {
                  // Navigate to HealthDashboard with userEmail
                  console.log(`Navigating to HealthDashboard for ${userEmail}`);
                }}
                sx={{
                  color: 'white',
                  fontSize: '1.1rem',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.1)'
                  }
                }}
              >
                View My Vitals
              </Button>
            </motion.div>
          </Box>
        </motion.div>
      </Container>

      {/* Antenatal Visit Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <DialogTitle>Antenatal Visit Notification</DialogTitle>
          <DialogContent>
            <Typography>{dialogMessage}</Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setDialogOpen(false)}
              sx={{
                backgroundColor: 'cyan.600',
                color: 'white',
                '&:hover': { backgroundColor: 'cyan.700' }
              }}
            >
              OK
            </Button>
          </DialogActions>
        </motion.div>
      </Dialog>
    </Box>
  );
};

export default PregnancyCalculatorScreen;