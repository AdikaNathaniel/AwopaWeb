import React, { useState } from 'react';
import axios from 'axios';
import pregnancyImg from '../assets/pregnancy.png';
import { useNavigate } from 'react-router-dom';

export default function AppointmentScheduleByMedicPage() {
  const [formData, setFormData] = useState({
    patientId: '',
    phone: '',
    doctor: '',
    location: '',
    patientName: '',
    purpose: '',
  });

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (e) => setSelectedDate(e.target.value);
  const handleTimeChange = (e) => setSelectedTime(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedDate || !selectedTime) {
      alert('Please select both date and time');
      return;
    }

    setIsSubmitting(true);

    try {
      const appointmentDateTime = new Date(`${selectedDate}T${selectedTime}`);
      const formattedDate = appointmentDateTime.toISOString();

      const response = await axios.post('http://localhost:3100/api/v1/sms/appointments/schedule', {
        ...formData,
        date: formattedDate,
      });

      if (response.status === 201) {
        alert('Appointment successfully created!');
        setFormData({
          patientId: '',
          phone: '',
          doctor: '',
          location: '',
          patientName: '',
          purpose: '',
        });
        setSelectedDate('');
        setSelectedTime('');
      } else {
        alert(`Error: ${response.status} - ${response.data}`);
      }
    } catch (err) {
      alert('Error: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Field label mappings
  const fieldLabels = {
    patientId: 'Patient ID',
    patientName: 'Patient Name',
    phone: 'Phone Number',
    doctor: 'Doctor',
    location: 'Medical Facility',
    purpose: 'Purpose',
  };

  return (
    <div className="relative w-full min-h-screen">
      <img
        src={pregnancyImg}
        alt="Background"
        className="absolute w-full h-full object-cover z-0"
      />
      <div className="absolute w-full h-full bg-black opacity-60 z-10" />
      <div className="relative z-20 max-w-xl mx-auto p-6">
        <div className="bg-white bg-opacity-90 p-6 rounded-xl shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-6">Schedule Appointment</h1>
          <form onSubmit={handleSubmit}>
            {Object.keys(fieldLabels).map((field) => (
              <div key={field} className="mb-4">
                <label
                  htmlFor={field}
                  className="block text-sm font-semibold text-gray-700 mb-1"
                >
                  {fieldLabels[field]}
                </label>
                <input
                  type="text"
                  name={field}
                  id={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={`Enter Your ${fieldLabels[field].toLowerCase()}`}
                  className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
            ))}

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Select Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Select Time
              </label>
              <input
                type="time"
                value={selectedTime}
                onChange={handleTimeChange}
                className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-blue-600 text-white font-bold rounded hover:bg-blue-700 transition"
            >
              {isSubmitting ? 'Submitting...' : 'SCHEDULE APPOINTMENT'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
