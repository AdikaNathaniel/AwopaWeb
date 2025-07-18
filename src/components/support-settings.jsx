import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import pregnancyImg from '../assets/pregnancy.png';

// Import Material Icons
import ListAltIcon from '@mui/icons-material/ListAlt';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const SupportSettingsPage = ({ userEmail }) => {
  const navigate = useNavigate();

  const _onOptionSelected = (option) => {
    // You can replace this with a toast notification
    console.log(`${option} tapped`);
  };

  const _buildSupportCard = ({ icon, title, iconColor, onClick }) => {
    return (
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-4"
      >
        <div 
          className="card bg-white shadow-md rounded-xl mx-4 cursor-pointer overflow-hidden"
          onClick={onClick}
        >
          <div className="flex items-center p-4">
            <motion.div 
              className="w-10 h-10 rounded-full flex items-center justify-center mr-3"
              style={{ backgroundColor: `${iconColor}20` }}
              whileHover={{ rotate: 10 }}
            >
              {icon}
            </motion.div>
            <div className="flex-1">
              <h3 className="text-base font-medium">{title}</h3>
            </div>
            <motion.span 
              className="text-gray-400 text-sm"
              whileHover={{ x: 5 }}
            >
              <ArrowForwardIosIcon fontSize="small" />
            </motion.span>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div 
      className="min-h-screen w-full fixed"
      style={{
        backgroundImage: `url(${pregnancyImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="bg-black bg-opacity-50 min-h-screen w-full overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* AppBar */}
          <motion.div
            className="bg-cyan-600 text-white p-4 shadow-md"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <h1 className="text-xl font-semibold text-center">Support Settings</h1>
          </motion.div>

          {/* Content */}
          <div className="p-4 pb-8">
            {/* Admin Email */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="mb-6"
            >
              <div className="bg-purple-100 border border-purple-200 rounded-xl p-4 mx-4">
                <div className="flex items-center">
                  <motion.span 
                    className="text-purple-800 mr-2"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 1, repeat: Infinity, repeatDelay: 5 }}
                  >
                    <AdminPanelSettingsIcon />
                  </motion.span>
                  <p className="text-purple-800 font-medium">
                    Admin: {userEmail}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Support Cards */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {/* Get All Support Requests */}
              {_buildSupportCard({
                icon: <ListAltIcon style={{ color: "#FF9800" }} />,
                title: "Get All Support Requests",
                iconColor: "#FF9800",
                onClick: () => {
                  _onOptionSelected("Get All Support Requests");
                  navigate('/support-requests');
                }
              })}

              {/* Get Support Request By Id */}
              {_buildSupportCard({
                icon: <FindInPageIcon style={{ color: "#FF9800" }} />,
                title: "Get Support Request By Id",
                iconColor: "#FF9800",
                onClick: () => {
                  _onOptionSelected("Get Support Request By Id");
                  navigate('/support-by-id');
                }
              })}

              {/* Get Support Request By Name */}
              {_buildSupportCard({
                icon: <ReceiptLongIcon style={{ color: "#FF9800" }} />,
                title: "Get Support Request By Name",
                iconColor: "#FF9800",
                onClick: () => {
                  _onOptionSelected("Get Support Request By Name");
                  navigate('/support-by-name');
                }
              })}

              {/* Additional Button with Cyan-600 */}
              <motion.div
                className="flex justify-center mt-8"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button 
                  className="bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-3 px-6 rounded-lg shadow-md transition-colors duration-300"
                  onClick={() => console.log('Cyan button clicked')}
                >
                  Additional Action
                </button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SupportSettingsPage;