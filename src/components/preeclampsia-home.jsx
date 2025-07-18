import React from 'react';
import { motion } from 'framer-motion';
import {
  AppBar,
  Toolbar,
  Typography,
  Card,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material';
import {
  LocalHospital as LocalHospitalIcon,
  MonitorHeartOutlined as MonitorHeartIcon,
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import pregnancyImg from '../assets/pregnancy.png';

const PreeclampsiaHomePage = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.03,
      transition: {
        duration: 0.3
      }
    }
  };

  const options = [
    {
      icon: <LocalHospitalIcon fontSize="large" />,
      iconColor: 'primary.main',
      title: 'Preeclampsia Management',
      subtitle: 'Manage and monitor preeclampsia cases',
      onClick: () => navigate('/symptom-list')
    },
    {
      icon: <MonitorHeartIcon fontSize="large" />,
      iconColor: 'primary.main',
      title: 'Preeclampsia Vitals Monitor',
      subtitle: 'Access and review all patient prescriptions',
      onClick: () => navigate('/find-symptom')
    }
  ];

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
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              textAlign: 'center',
              color: 'white',
              fontWeight: 'bold'
            }}
          >
            Preeclampsia Manager
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        sx={{
          p: 4,
          maxWidth: 800,
          mx: 'auto'
        }}
      >
        {options.map((option, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover="hover"
            style={{ marginBottom: 16 }}
          >
            <Card
              component={motion.div}
              sx={{
                borderRadius: 3,
                overflow: 'hidden',
                cursor: 'pointer'
              }}
              onClick={option.onClick}
              elevation={5}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  p: 3,
                  backgroundColor: 'rgba(255, 255, 255, 0.9)'
                }}
              >
                <IconButton
                  sx={{
                    color: option.iconColor,
                    mr: 2,
                    backgroundColor: 'rgba(0, 0, 0, 0.05)'
                  }}
                >
                  {option.icon}
                </IconButton>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ fontWeight: 'bold' }}
                  >
                    {option.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {option.subtitle}
                  </Typography>
                </Box>
                <ChevronRightIcon sx={{ color: 'grey.500', fontSize: 30 }} />
              </Box>
            </Card>
          </motion.div>
        ))}

        {/* Additional Buttons with cyan-600 color */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ marginTop: 24 }}
        >
          <Box
            component={motion.button}
            sx={{
              backgroundColor: 'cyan.600',
            //   color: 'white',
              color: 'cyan.600',
              border: 'none',
              borderRadius: 2,
              px: 4,
              py: 2,
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: 3,
              '&:hover': {
                backgroundColor: 'cyan.700'
              }
            }}
            whileHover={{ y: -2 }}
            onClick={() => navigate('/create-prescription')}
          >
            Create New Prescription
          </Box>
        </motion.div>

        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ marginTop: 16 }}
        >
          <Box
            component={motion.button}
            sx={{
              backgroundColor: 'cyan.600',
            //   color: 'white',
              color: 'cyan.600',
              border: 'none',
              borderRadius: 2,
              px: 4,
              py: 2,
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: 3,
              '&:hover': {
                backgroundColor: 'cyan.700'
              }
            }}
            whileHover={{ y: -2 }}
            onClick={() => navigate('/view-prescription')}
          >
            View All Prescriptions
          </Box>
        </motion.div>
      </Box>
    </Box>
  );
};

export default PreeclampsiaHomePage;