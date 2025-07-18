import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import pregnancyImg from '../assets/pregnancy.png';

const PregnancyHealthForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    parity: '',
    gravida: '',
    gestationalAge: '',
    age: '',
    hasDiabetes: '',
    hasAnemia: '',
    hasPreeclampsia: '',
    hasGestationalDiabetes: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDropdownChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validate = () => {
    const newErrors = {};
    const requiredFields = ['name', 'parity', 'gravida', 'gestationalAge', 'age'];
    const dropdownFields = ['hasDiabetes', 'hasAnemia', 'hasPreeclampsia', 'hasGestationalDiabetes'];

    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'This field is required';
      }
    });

    dropdownFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = 'Please select an option';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const response = await axios.post('http://localhost:3100/api/v1/health', {
        parity: parseInt(formData.parity),
        gravida: parseInt(formData.gravida),
        gestationalAge: parseInt(formData.gestationalAge),
        age: parseInt(formData.age),
        name: formData.name,
        hasDiabetes: formData.hasDiabetes,
        hasAnemia: formData.hasAnemia,
        hasPreeclampsia: formData.hasPreeclampsia,
        hasGestationalDiabetes: formData.hasGestationalDiabetes
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 201) {
        alert("Information saved successfully!");
      }
    } catch (error) {
      alert("Failed to save information. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
        className="bg-cyan-600 py-4 shadow-lg"
      >
        <h1 className="text-white text-center text-2xl font-bold">Pregnancy Health Information</h1>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="p-6 max-w-3xl mx-auto"
      >
        <div className="bg-white bg-opacity-90 rounded-xl p-6 shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {_buildTextField('name', 'What is your name?', 'Enter Your Name')}
              {_buildTextField('parity', 'How many times have you given birth?', 'Enter number of births', 'number')}
              {_buildTextField('gravida', 'How many times have you been pregnant?', 'Enter number of pregnancies', 'number')}
              {_buildTextField('gestationalAge', 'How many weeks pregnant are you?', 'Enter weeks (e.g. 20)', 'number')}
              {_buildTextField('age', 'How old are you?', 'Enter your age (years)', 'number')}

              {_buildDropdown('hasDiabetes', 'Have you ever had diabetes?')}
              {_buildDropdown('hasAnemia', 'Have you ever had anemia?')}
              {_buildDropdown('hasPreeclampsia', 'Have you ever had preeclampsia?')}
              {_buildDropdown('hasGestationalDiabetes', 'Have you ever had gestational diabetes?')}
            </div>

            <motion.div 
              className="flex justify-center mt-8"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-3 rounded-full text-white font-medium ${isSubmitting ? 'bg-cyan-400' : 'bg-cyan-600'} shadow-md`}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </div>
                ) : 'Save Information'}
              </button>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </div>
  );

  function _buildTextField(name, label, placeholder, type = 'text') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">{label}</label>
          <input
            type={type}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            placeholder={placeholder}
            className={`w-full px-4 py-2 rounded-lg border ${errors[name] ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-pink-300 focus:border-transparent`}
          />
          {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
        </div>
      </motion.div>
    );
  }

  function _buildDropdown(name, label) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">{label}</label>
          <select
            name={name}
            value={formData[name]}
            onChange={(e) => handleDropdownChange(name, e.target.value)}
            className={`w-full px-4 py-2 rounded-lg border ${errors[name] ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-pink-300 focus:border-transparent bg-white`}
          >
            <option value="">Select an option</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
        </div>
      </motion.div>
    );
  }
};

export default PregnancyHealthForm;