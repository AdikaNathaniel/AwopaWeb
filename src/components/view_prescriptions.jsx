import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import pregnancyImg from '../assets/pregnancy.png';

const PrescriptionPage = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    try {
      const response = await axios.get('http://localhost:3100/api/v1/prescriptions');
      setPrescriptions(response.data.result);
      setLoading(false);
    } catch (error) {
      console.error('Failed to load prescriptions:', error);
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    try {
      const parts = dateString.split(' ');
      const year = parts[3];
      const month = monthStringToNumber(parts[1]).toString().padStart(2, '0');
      const day = parts[2].padStart(2, '0');
      return `${year}-${month}-${day}`;
    } catch (e) {
      console.error('Error parsing date:', dateString);
      return 'Invalid date';
    }
  };

  const monthStringToNumber = (month) => {
    const months = {
      'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6,
      'Jul': 7, 'Aug': 8, 'Sep': 9, 'Oct': 10, 'Nov': 11, 'Dec': 12
    };
    return months[month] || 0;
  };

  const buildInfoRow = (icon, text) => (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-start py-1.5"
    >
      <span className="text-blue-500 mr-3 mt-1">
        {icon}
      </span>
      <p className="text-gray-800 text-base leading-relaxed font-medium flex-1">
        {text}
      </p>
    </motion.div>
  );

  const iconComponents = {
    person: <i className="fas fa-user text-blue-500"></i>,
    medication: <i className="fas fa-pills text-blue-500"></i>,
    local_pharmacy: <i className="fas fa-clinic-medical text-blue-500"></i>,
    access_time: <i className="fas fa-clock text-blue-500"></i>,
    calendar_today: <i className="fas fa-calendar-day text-blue-500"></i>,
    date_range: <i className="fas fa-calendar-alt text-blue-500"></i>,
    confirmation_number: <i className="fas fa-prescription-bottle-alt text-blue-500"></i>,
    info_outline: <i className="fas fa-info-circle text-blue-500"></i>
  };

  return (
    <div 
      className="min-h-screen"
      style={{
        backgroundImage: `url(${pregnancyImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-blue-600 py-4 shadow-md"
      >
        <h1 className="text-white text-center text-2xl font-semibold">
          Prescriptions
        </h1>
      </motion.div>

      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center h-64"
          >
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-600"></div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {prescriptions.length === 0 ? (
              <motion.div 
                className="bg-white rounded-xl shadow-lg p-6 text-center"
                whileHover={{ scale: 1.02 }}
              >
                <p className="text-gray-700 text-lg">No prescriptions found</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2 px-6 rounded-full shadow-md transition-colors"
                  onClick={fetchPrescriptions}
                >
                  Refresh
                </motion.button>
              </motion.div>
            ) : (
              <div className="space-y-6">
                {prescriptions.map((prescription, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ scale: 1.01 }}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden"
                  >
                    <div className="p-6">
                      {buildInfoRow(iconComponents.person, `Patient: ${prescription.patient_name}`)}
                      {buildInfoRow(iconComponents.medication, `Drug: ${prescription.drug_name}`)}
                      {buildInfoRow(iconComponents.local_pharmacy, `Dosage: ${prescription.dosage}`)}
                      {buildInfoRow(iconComponents.access_time, `Frequency: ${prescription.frequency}`)}
                      {buildInfoRow(iconComponents.calendar_today, `Duration: ${prescription.duration}`)}
                      {buildInfoRow(iconComponents.date_range, `Start Date: ${formatDate(prescription.start_date)}`)}
                      {buildInfoRow(iconComponents.date_range, `End Date: ${formatDate(prescription.end_date)}`)}
                      {buildInfoRow(iconComponents.confirmation_number, `Quantity: ${prescription.quantity}`)}
                      {buildInfoRow(iconComponents.info_outline, `Reason: ${prescription.reason || 'N/A'}`)}
                      {buildInfoRow(iconComponents.info_outline, `Notes: ${prescription.notes || 'N/A'}`)}
                    </div>
                    <div className="px-6 pb-4 flex justify-end">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2 px-6 rounded-full shadow-md transition-colors"
                      >
                        View Details
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PrescriptionPage;