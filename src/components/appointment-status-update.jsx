import React, { useState } from 'react';
import axios from 'axios';
import pregnancyImg from '../assets/pregnancy.png';

export default function UpdateAppointmentStatusPage() {
  const [doctorName, setDoctorName] = useState('');
  const [appointmentId, setAppointmentId] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('Pending');
  const [isLoading, setIsLoading] = useState(false);

  const statusOptions = ['Canceled', 'Pending', 'Confirmed'];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!doctorName || !appointmentId || !selectedStatus) {
      alert('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.patch(
        `http://localhost:3100/api/v1/doctors/${encodeURIComponent(doctorName)}/appointments/${appointmentId}/status`,
        { status: selectedStatus.toLowerCase() },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 200) {
        alert('Status updated successfully!');
        setDoctorName('');
        setAppointmentId('');
        setSelectedStatus('Pending');
      } else {
        alert(`Failed to update status: ${response.data.message || 'Unknown error'}`);
      }
    } catch (error) {
      alert(`Error updating status: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full min-h-screen">
      <img
        src={pregnancyImg}
        alt="Background"
        className="absolute w-full h-full object-cover z-0"
      />
      <div className="absolute w-full h-full bg-black opacity-60 z-10" />
      <div className="relative z-20 max-w-md mx-auto p-6">
        <div className="bg-white bg-opacity-90 p-6 rounded-xl shadow-lg">
          <h1 className="text-xl font-bold text-center mb-6">Update Appointment Status</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Doctor Name</label>
              <input
                type="text"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
                placeholder="Enter Doctor Name"
                className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Appointment ID</label>
              <input
                type="text"
                value={appointmentId}
                onChange={(e) => setAppointmentId(e.target.value)}
                placeholder="Enter appointment ID"
                className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            <button
  type="submit"
  disabled={isLoading}
  className="w-full py-3 bg-cyan-600 text-white font-bold rounded hover:bg-cyan-700 transition"
>
  {isLoading ? 'Updating...' : 'Update Status'}
</button>
          </form>
        </div>
      </div>
    </div>
  );
}
