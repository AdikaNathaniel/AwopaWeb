import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import pregnancyImg from '../assets/pregnancy.png';

const CreatePrescriptionPage = () => {
  const [formData, setFormData] = useState({
    patient_name: '',
    drug_name: '',
    dosage: '',
    route_of_administration: '',
    frequency: '',
    duration: '',
    start_date: '',
    end_date: '',
    quantity: '',
    reason: '',
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3100/api/v1/prescriptions', {
        ...formData,
        quantity: parseInt(formData.quantity) || 0,
      });

      if (response.status === 201) {
        alert('Prescription submitted successfully!');
        setFormData({
          patient_name: '',
          drug_name: '',
          dosage: '',
          route_of_administration: '',
          frequency: '',
          duration: '',
          start_date: '',
          end_date: '',
          quantity: '',
          reason: '',
          notes: '',
        });
      } else {
        alert('Failed to submit prescription');
      }
    } catch (error) {
      alert('Error submitting prescription');
    }
  };

  const inputFields = [
    { label: 'Patient Name', name: 'patient_name', icon: '👤', hint: 'Enter Name Of Patient' },
    { label: 'Drug Name', name: 'drug_name', icon: '💊', hint: 'Enter Drug Name' },
    { label: 'Dosage', name: 'dosage', icon: '🧪', hint: 'Enter Dosage Amount' },
    { label: 'Route of Administration (Oral/Topical/Intravenous)', name: 'route_of_administration', icon: '🏥', hint: 'Enter Route Of Administration' },
    { label: 'Frequency Per Day', name: 'frequency', icon: '🕒', hint: 'Enter Frequency Intake Per Day' },
    { label: 'Duration', name: 'duration', icon: '📆', hint: 'Enter Duration Of Drup Intake' },
    { label: 'Start Date (YYYY-MM-DD)', name: 'start_date', icon: '📅', hint: 'Enter Start Date' },
    { label: 'End Date (YYYY-MM-DD)', name: 'end_date', icon: '📅', hint: 'Enter End Date' },
    { label: 'Quantity', name: 'quantity', icon: '🔢', hint: 'Enter Qunatity To Be Taken' },
    { label: 'Reason', name: 'reason', icon: '❓', hint: 'Enter Reason For Drug Intake' },
    { label: 'Notes (Referral Information)', name: 'notes', icon: '📝', hint: 'Enter A Referral Note' },
  ];

  return (
    <div
      style={{
        backgroundImage: `url(${pregnancyImg})`,
        backgroundSize: 'cover',
        minHeight: '100vh',
        padding: '2rem',
        backdropFilter: 'brightness(0.7)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/70 p-6 max-w-2xl mx-auto rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-black-800">
          Create Prescription
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {inputFields.map(({ label, name, icon, hint }) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * inputFields.indexOf(name) }}
            >
              <label className="block font-semibold text-gray-700 mb-1">
                {icon} {label}
              </label>
              <input
                type="text"
                name={name}
                value={formData[name]}
                onChange={handleChange}
                placeholder={hint}
                className="w-full px-4 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </motion.div>
          ))}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-cyan-600 text-white py-3 rounded-md font-semibold"
          >
            Submit Prescription
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default CreatePrescriptionPage;
