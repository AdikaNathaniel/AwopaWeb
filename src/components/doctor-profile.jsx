import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import pregnancyImg from '../assets/pregnancy.png';

const DoctorProfileForm = () => {
  const [form, setForm] = useState({
    fullName: '',
    specialization: '',
    email: '',
    phoneNumber: '',
    address: '',
    hospital: '',
    yearsOfPractice: '',
    languagesSpoken: '',
    consultationFee: '',
    availableDays: [],
    startTime: '',
    endTime: '',
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleDayToggle = (day) => {
    setForm((prev) => {
      const newDays = prev.availableDays.includes(day)
        ? prev.availableDays.filter((d) => d !== day)
        : [...prev.availableDays, day];
      return { ...prev, availableDays: newDays };
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        formData.append(`consultationHours[days][]`, value.join(','));
      } else {
        formData.append(key, value);
      }
    });

    if (image) {
      formData.append('profilePhoto', image);
    }

    try {
      await axios.post('http://localhost:3100/api/v1/medics', formData);
      alert('Doctor profile created successfully!');
      setForm({
        fullName: '', specialization: '', email: '', phoneNumber: '', address: '',
        hospital: '', yearsOfPractice: '', languagesSpoken: '', consultationFee: '',
        availableDays: [], startTime: '', endTime: ''
      });
      setImage(null);
      setPreview(null);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${pregnancyImg})` }}
    >
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto bg-white/90 p-6 rounded-2xl shadow-lg"
      >
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-cyan-600">
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                  Upload
                </div>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute bottom-0 right-0 text-xs cursor-pointer opacity-0 w-28 h-28"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-semibold mb-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={handleInputChange}
            placeholder="Enter Full Name"
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-600"
            required
          />
        </div>

        {[
          { label: 'Specialization', name: 'specialization' },
          { label: 'Email', name: 'email', type: 'email' },
          { label: 'Phone Number', name: 'phoneNumber' },
          { label: 'Address', name: 'address' },
          { label: 'Hospital', name: 'hospital' },
          { label: 'Years of Practice', name: 'yearsOfPractice' },
          { label: 'Languages Spoken (comma separated)', name: 'languagesSpoken' },
          { label: 'Consultation Fee', name: 'consultationFee' },
          { label: 'Start Time', name: 'startTime', type: 'time' },
          { label: 'End Time', name: 'endTime', type: 'time' },
        ].map(({ label, name, type = 'text' }) => (
          <div className="mt-4" key={name}>
            <label className="block text-sm font-semibold mb-1">{label}</label>
            <input
              type={type}
              name={name}
              value={form[name]}
              onChange={handleInputChange}
              placeholder={`Enter ${label}`}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-600"
              required
            />
          </div>
        ))}

        <div className="mt-4">
          <label className="block text-sm font-semibold mb-2">Available Days</label>
          <div className="flex flex-wrap gap-2">
            {days.map((day) => (
              <button
                type="button"
                key={day}
                onClick={() => handleDayToggle(day)}
                className={`px-4 py-2 rounded-full text-sm border transition-all duration-200 font-medium ${
                  form.availableDays.includes(day)
                    ? 'bg-cyan-600 text-white'
                    : 'bg-white border-cyan-600 text-cyan-600'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          type="submit"
          disabled={loading}
          className="mt-8 w-full bg-cyan-600 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-cyan-700 transition-colors duration-200"
        >
          {loading ? 'Submitting...' : 'Submit Profile'}
        </motion.button>
      </motion.form>
    </div>
  );
};

export default DoctorProfileForm;
