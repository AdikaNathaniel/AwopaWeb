import React, { useState } from 'react';
import pregnancyImg from '../assets/pregnancy.png';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

export default function AdminHomePage() {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Use from navigation state or fallback to test email
  const userEmail = location.state?.userEmail || "admin@example.com"; 

  const [selectedPage, setSelectedPage] = useState('Dashboard');

  const logout = async () => {
    try {
      const response = await axios.put('http://localhost:3100/api/v1/users/logout', {}, {
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.status === 200 && response.data.success) {
        navigate('/login');
      } else {
        alert('Logout failed: ' + (response.data.message || 'Server error'));
      }
    } catch (err) {
      alert('Logout failed: ' + err.message);
    }
  };

  const renderDashboard = () => (
    <div className="space-y-4">
      {renderCard('Notifications', 'orange', () => navigate('/admin-notification'))}
      {renderCard('Support', 'green', () => navigate('/admin/support'))}
      {renderCard('View All Awopa Users', 'blue', () => navigate('/admin/users'))}
    </div>
  );

  const renderCard = (title, color, onClick) => (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-lg p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-50"
    >
      <div className={`w-12 h-12 flex items-center justify-center rounded-full bg-${color}-100`}>
        <div className={`text-${color}-500 text-xl`}>
          <i className="fas fa-bell" />
        </div>
      </div>
      <div className="text-lg font-semibold text-gray-800">{title}</div>
    </div>
  );

  const renderPage = () => (
    <div className="text-center">
      <button
        className="mb-4 text-blue-500 underline"
        onClick={() => setSelectedPage('Dashboard')}
      >
        &larr; Back to Dashboard
      </button>
      <h2 className="text-2xl font-bold">{selectedPage}</h2>
      <p className="mt-2">{selectedPage} Page</p>
    </div>
  );

  const showUserInfo = () => {
    const confirmed = window.confirm(`${userEmail}\n\nDo you want to view profile or logout?`);
    if (confirmed) {
      navigate('/admin/profile');
    }
  };

  return (
    <div className="relative w-full h-screen">
      <img
        src={pregnancyImg}
        alt="Background"
        className="absolute w-full h-full object-cover z-0"
      />
      <div className="absolute w-full h-full bg-black opacity-60 z-10" />
      <div className="relative z-20 p-6">
        <header className="flex justify-between items-center mb-6">      
          <div className="flex justify-center w-full">
  <h1 className="text-white text-2xl font-bold">Admin Panel</h1>
</div>
          <div className="flex items-center gap-4">
            <div
              onClick={showUserInfo}
              className="w-10 h-10 bg-white text-blue-700 flex items-center justify-center rounded-full font-bold cursor-pointer"
            >
              {userEmail[0]?.toUpperCase() || 'A'}
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </header>

        <main className="bg-white bg-opacity-90 p-6 rounded-xl shadow-lg">
          {selectedPage === 'Dashboard' ? renderDashboard() : renderPage()}
        </main>
      </div>
    </div>
  );
}
