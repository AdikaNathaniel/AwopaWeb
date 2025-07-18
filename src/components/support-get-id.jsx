import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Box,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  CircularProgress,
  Icon,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import {
  SupportAgent as SupportAgentIcon,
  ConfirmationNumber as ConfirmationNumberIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { format } from 'date-fns';
import pregnancyImg from '../assets/pregnancy.png';

const SupportByIdPage = () => {
  const [ticketId, setTicketId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [ticketData, setTicketData] = useState(null);
  const [error, setError] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      const day = date.getDate();
      let daySuffix;
      
      if (day >= 11 && day <= 13) {
        daySuffix = 'th';
      } else {
        switch (day % 10) {
          case 1: daySuffix = 'st'; break;
          case 2: daySuffix = 'nd'; break;
          case 3: daySuffix = 'rd'; break;
          default: daySuffix = 'th';
        }
      }
      
      return format(date, `do '${daySuffix}' MMMM, y 'at' h:mm a`);
    } catch (e) {
      return dateString;
    }
  };

  const fetchSupportTicket = async () => {
    if (!ticketId.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `http://localhost:3100/api/v1/support/${ticketId.trim()}`
      );

      if (response.data.success) {
        setTicketData(response.data.result || response.data);
        setDialogOpen(true);
      } else {
        setError('Support ticket not found');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Error fetching support ticket');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setTicketId('');
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
            Find Support Ticket by ID
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="sm" sx={{ py: 4 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: 6,
              overflow: 'hidden',
              background: 'rgba(255, 255, 255, 0.95)'
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <SupportAgentIcon 
                    sx={{ fontSize: 60, color: 'cyan.600' }} 
                  />
                </motion.div>
                <Typography variant="h5" sx={{ mt: 2, fontWeight: 'medium' }}>
                  Support Ticket ID
                </Typography>
              </Box>

              <TextField
                fullWidth
                variant="outlined"
                label="Ticket ID"
                value={ticketId}
                onChange={(e) => setTicketId(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <ConfirmationNumberIcon sx={{ color: 'action.active', mr: 1 }} />
                  ),
                }}
                placeholder="Enter Your Support Ticket ID"
                sx={{ mb: 3 }}
              />

              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>
                    {error}
                  </Typography>
                </motion.div>
              )}

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={fetchSupportTicket}
                  disabled={isLoading || !ticketId.trim()}
                  sx={{
                    backgroundColor: 'cyan.600',
                    '&:hover': { backgroundColor: 'cyan.700' },
                    height: 50,
                    fontSize: '1rem',
                    fontWeight: 'medium'
                  }}
                >
                  {isLoading ? (
                    <CircularProgress size={24} sx={{ color: 'white' }} />
                  ) : (
                    'Find Ticket'
                  )}
                </Button>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </Container>

      {/* Support Ticket Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
            Support Ticket Details
          </DialogTitle>
          <DialogContent dividers>
            {ticketData && (
              <List>
                <DetailItem 
                  label="Ticket ID:" 
                  value={ticketData._id || ticketData.id || 'N/A'} 
                />
                <Divider />
                <DetailItem 
                  label="Name:" 
                  value={ticketData.name || 'N/A'} 
                />
                <Divider />
                <DetailItem 
                  label="Email:" 
                  value={ticketData.email || 'N/A'} 
                />
                <Divider />
                <DetailItem 
                  label="Phone:" 
                  value={ticketData.phoneNumber || ticketData.phone || 'N/A'} 
                />
                <Divider />
                <DetailItem 
                  label="Message:" 
                  value={ticketData.message || 'No message'} 
                />
                <Divider />
                <DetailItem 
                  label="Created At:" 
                  value={formatDate(ticketData.createdAt)} 
                />
              </List>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseDialog}
              startIcon={<CloseIcon />}
              sx={{ color: 'cyan.600' }}
            >
              Close
            </Button>
          </DialogActions>
        </motion.div>
      </Dialog>
    </Box>
  );
};

const DetailItem = ({ label, value }) => (
  <ListItem sx={{ py: 1.5 }}>
    <ListItemText
      primary={
        <Typography variant="subtitle1" fontWeight="bold" color="text.secondary">
          {label}
        </Typography>
      }
      secondary={
        <Typography variant="body1" sx={{ mt: 0.5 }}>
          {value}
        </Typography>
      }
      sx={{ m: 0 }}
    />
  </ListItem>
);

export default SupportByIdPage;