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
  DialogActions
} from '@mui/material';
import {
  CalendarToday as CalendarTodayIcon,
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';
import { format, differenceInWeeks, addWeeks, addDays } from 'date-fns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import pregnancyImg from '../assets/pregnancy.png';
import { useNavigate, useLocation } from 'react-router-dom';

const PregnancyCalculatorScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [weeksPregnant, setWeeksPregnant] = useState(null);
  const [daysPregnant, setDaysPregnant] = useState(null);
  const [dueDate, setDueDate] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  // Get userEmail from location state
  const userEmail = location.state?.userEmail || 'User';

  const calculatePregnancyWeeks = (lmpDate) => {
    if (!lmpDate) return;

    const today = new Date();
    const lmp = new Date(lmpDate);
    
    const totalDays = Math.floor((today - lmp) / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(totalDays / 7);
    const days = totalDays % 7;
    const calculatedDueDate = addDays(lmp, 280);
    
    if (totalDays < 0) {
      setDialogMessage("Please select a date in the past for your last menstrual period.");
      setDialogOpen(true);
      return;
    }
    
    if (weeks > 45) {
      setDialogMessage("The selected date seems too far in the past. Please check your last menstrual period date.");
      setDialogOpen(true);
      return;
    }
    
    setWeeksPregnant(weeks);
    setDaysPregnant(days);
    setDueDate(calculatedDueDate);
    showAntenatalVisitDialog(weeks);
  };

  const showAntenatalVisitDialog = (weeks) => {
    let message;
    if (weeks < 1) {
      message = "You may not be pregnant yet or it's too early to confirm. Please consult with your healthcare provider.";
    } else if (weeks < 28) {
      message = "You need 1 antenatal visit per month.";
    } else if (weeks < 36) {
      message = "You need 2 antenatal visits per month.";
    } else if (weeks <= 42) {
      message = "You need 1 antenatal visit per week.";
    } else {
      message = "You appear to be past your due date. Please consult with your healthcare provider immediately.";
    }

    setDialogMessage(message);
    setDialogOpen(true);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    calculatePregnancyWeeks(date);
  };

  const maxDate = new Date('2040-12-31');
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 2);

  const navigateToHealthDashboard = () => {
    navigate('/health-dashboard', {
      state: {
        userEmail: userEmail
      }
    });
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
      <AppBar position="static" elevation={0} sx={{ backgroundColor: 'primary.main' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, textAlign: 'center' }}>
            Pregnancy Calculator
          </Typography>
        </Toolbar>
      </AppBar>

      <LocalizationProvider dateAdapter={AdapterDateFns}>
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

              {/* Date Picker */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <DatePicker
                  open={datePickerOpen}
                  onOpen={() => setDatePickerOpen(true)}
                  onClose={() => setDatePickerOpen(false)}
                  value={selectedDate}
                  onChange={(date) => {
                    handleDateChange(date);
                    setDatePickerOpen(false);
                  }}
                  maxDate={maxDate}
                  minDate={minDate}
                  renderInput={({ inputRef }) => (
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="contained"
                        startIcon={<CalendarTodayIcon />}
                        onClick={() => setDatePickerOpen(true)}
                        ref={inputRef}
                        sx={{
                          backgroundColor: 'primary.main',
                          '&:hover': { backgroundColor: 'primary.dark' },
                          py: 2,
                          px: 4,
                          fontSize: '1rem',
                          minWidth: 250
                        }}
                      >
                        {selectedDate 
                          ? format(selectedDate, 'MMMM dd, yyyy') 
                          : "Select Date"}
                      </Button>
                    </motion.div>
                  )}
                />
              </Box>

              {/* Display Pregnancy Information */}
              <AnimatePresence>
                {weeksPregnant !== null && weeksPregnant > 0 && (
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
                        mb: 2,
                        textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                      }}
                    >
                      You Are {weeksPregnant} Weeks {daysPregnant > 0 ? `and ${daysPregnant} Day${daysPregnant > 1 ? 's' : ''}` : ''} Pregnant
                    </Typography>
                    
                    {dueDate && (
                      <Typography
                        variant="h6"
                        align="center"
                        sx={{
                          color: 'text.secondary',
                          mb: 2
                        }}
                      >
                        Expected Delivery Date: {format(dueDate, 'MMMM dd, yyyy')}
                      </Typography>
                    )}
                    
                    <Typography
                      variant="h6"
                      align="center"
                      sx={{
                        color: 'primary.main',
                        mb: 4,
                        fontWeight: 'medium'
                      }}
                    >
                      {weeksPregnant <= 12 ? 'First Trimester' : 
                       weeksPregnant <= 27 ? 'Second Trimester' : 
                       'Third Trimester'}
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
                  onClick={navigateToHealthDashboard}
                  sx={{
                    color: 'primary.main',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.05)'
                    }
                  }}
                >
                  View My Vitals
                </Button>
              </motion.div>
            </Box>
          </motion.div>
        </Container>
      </LocalizationProvider>

      {/* Antenatal Visit Dialog */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <DialogTitle>Pregnancy Information</DialogTitle>
          <DialogContent>
            <Typography>{dialogMessage}</Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setDialogOpen(false)}
              sx={{
                backgroundColor: 'primary.main',
                color: 'white',
                '&:hover': { backgroundColor: 'primary.dark' }
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