import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import OTPVerification from './components/OTP';
import LoginWithPin from   './components/LoginPin';
import  AdminHomePage from   './components/admin-home';
import NotificationSettingsPage from './components/admin-notification';
import AppointmentScheduleByMedicPage from  './components/appointment-schedule-by-medic';
import UpdateAppointmentStatusPage  from  './components/appointment-status-update';
import AppointmentHomePage from './components/appointments-home';
import AppointmentManagerPage from './components/create_cancel-appointment';
import  CreateEmergencyContact from './components/create-emergency';
import CreateNotificationPage from './components/create-notification';
import CreatePinPage from './components/create-pin';
import CreatePrescriptionPage from './components/create-prescription';
import DeleteNotificationPage from './components/delete-notification';
import PinDeletePage from './components/delete-pin';
import FindDoctorByNamePage from './components/doctor-by-name';
import DoctorChatPage from './components/doctor-chat';
import DoctorProfilePage from './components/doctor-profile';
import EmergencyContactsPage from './components/emergency-contact';
import DeleteEmergencyContact from './components/emergency-delete';
import EmergencyContactsList from './components/emergency-list';
import EmergencyContactSearch from './components/emergency-search';
import UpdateEmergencyContact from './components/emergency-update';
import GlucoseMonitoringPage  from './components/glucose-monitor';
import HardwareVitals from './components/hardware_vitals';
import HealthDashboard from './components/health_metrics';
import PregnancyHistoryPage from './components/health-data';
import HomeScreen from './components/home_screen';
import LiveFaceLoginPage from './components/live_face_login';
import MapPage from './components/map';
import DoctorAppointmentsStatsPage from './components/medic-appointment-details';
import DoctorAppointmentsPage from './components/medic-appointment-status-details';
import MedicsListPage from './components/medic-list';
import NotificationByIdPage from './components/notification-id';
import NotificationListPage from './components/notification-list';
import NotificationsByRolePage from './components/notification-role';
import NotificationSentPage from './components/notification-sent';
import NotificationUpdatePage from './components/notification-update';
import PaystackInitiatePage from './components/paystack-home';
import PregnancyComplicationsPage from './components/predictions';
import PreeclampsiaHomePage  from './components/preeclampsia-home';
import PreeclampsiaVitals from './components/preeclampsia-live';
import PregnancyCalculatorScreen from './components/pregnancy-calculator';
import PregChatBotPage from './components/pregnancy-chatbot';
import PregnancyHealthForm from './components/pregnancy-health';
import UrineStripColorSelector from './components/protein-strip';
import SetProfilePage from './components/set_profile';
import SettingsPage from './components/settings-page';
import SupportFormPage from './components/support-create';
import SupportByIdPage from './components/support-get-id';
import SupportByNamePage from './components/support-get-name';
import SupportRequestsPage from './components/support-request';
import SupportSettingsPage from './components/support-settings';
import SymptomForm from './components/symptom-checker';
import  SymptomListPage from './components/symptom-list' ;
import UpdatePasswordPage from './components/update-password';
import PinUpdateScreen  from './components/update-pin';
import UserListPage from './components/users_summary';
import PinVerifyScreen from './components/verify-pin';
import PrescriptionPage from './components/view_prescriptions';
import ViewAppointmentsPage from './components/view-appointment';
import WellnessTipsScreen from './components/wellness-page';
import EmergencyAlertPage  from './components/emergency-alert';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/otp" element={<OTPVerification />} />
        <Route path="/login-pin" element={<LoginWithPin />} />
        <Route path="/admin-home" element={<AdminHomePage />} />
        <Route path="/admin-notification" element={<NotificationSettingsPage />} />
        <Route path="/medic-appointment" element={<AppointmentScheduleByMedicPage />} />
        <Route path="/appointment-status-update" element={<UpdateAppointmentStatusPage />} />
        <Route path="/appointment-home" element={<AppointmentHomePage />} />
        {/* This page needs to be checked from the mobile side */}
        <Route path="/appointments-manage" element={<AppointmentManagerPage />} />
        <Route path="/create-emergency" element={<CreateEmergencyContact />} />
        <Route path="/create-notification" element={<CreateNotificationPage />} />
        <Route path="/create-pin" element={<CreatePinPage />} />
        <Route path="/create-prescription" element={<CreatePrescriptionPage />} />
        <Route path="/delete-notification" element={<DeleteNotificationPage  />} />      
        <Route path="/create-emergency" element={<CreateEmergencyContact  />} />  
        <Route path="/delete-pin" element={<PinDeletePage  />} />   
        <Route path="/doctor-by-name" element={<FindDoctorByNamePage  />} />   
        <Route path="/doctor-chat" element={<DoctorChatPage  />} />  
        <Route path="/doctor-profile" element={<DoctorProfilePage  />} /> 
        <Route path="/emergency-contact" element={<EmergencyContactsPage  />} /> 
        <Route path="/emergency-delete" element={<DeleteEmergencyContact  />} /> 
        <Route path="/emergency-list" element={<EmergencyContactsList  />} /> 
        <Route path="/emergency-search" element={<EmergencyContactSearch  />} /> 
        <Route path="/emergency-update" element={<UpdateEmergencyContact  />} /> 
        <Route path="/glucose-monitor" element={<GlucoseMonitoringPage  />} /> 
        <Route path="/hardware-vitals" element={<HardwareVitals  />} /> 
        <Route path="/health-dashboard" element={<HealthDashboard  />} />
        <Route path="/pregnancy-history" element={<PregnancyHistoryPage  />} />
        <Route path="/home-screen" element={<HomeScreen  />} />
        <Route path="/live-face-login" element={<LiveFaceLoginPage  />} />
        <Route path="/map" element={<MapPage  />} />
        <Route path="/medic-appointment-details" element={<DoctorAppointmentsStatsPage  />} />
        <Route path="/medic-appointment-status" element={<DoctorAppointmentsPage  />} />
        <Route path="/medic-list" element={<MedicsListPage  />} />
        <Route path="/notification-id" element={<NotificationByIdPage  />} />
        <Route path="/notification-list" element={<NotificationListPage  />} />
        <Route path="/notification-role" element={<NotificationsByRolePage  />} />
        <Route path="/notification-sent" element={<NotificationSentPage  />} />
        <Route path="/notification-update" element={<NotificationUpdatePage  />} />
        <Route path="/paystack-init" element={<PaystackInitiatePage  />} />
        <Route path="/prediction" element={<PregnancyComplicationsPage  />} />
        <Route path="/preclampsia-home" element={<PreeclampsiaHomePage  />} />
        <Route path="/preclampsia-live" element={<PreeclampsiaVitals  />} />
        <Route path="/pregnancy-calculator" element={<PregnancyCalculatorScreen  />} />
        <Route path="/pregnancy-chatbot" element={<PregChatBotPage  />} />
        <Route path="/pregnancy-health" element={<PregnancyHealthForm  />} />
        <Route path="/urine-strip" element={<UrineStripColorSelector  />} />
        <Route path="/set-profile" element={<SetProfilePage  />} />
        <Route path="/settings" element={<SettingsPage  />} />
        <Route path="/support-form" element={<SupportFormPage  />} />
        <Route path="/support-by-id" element={<SupportByIdPage />} />
        <Route path="/support-by-name" element={<SupportByNamePage />} />
        <Route path="/support-request" element={<SupportRequestsPage />} />
        <Route path="/support-settings" element={<SupportSettingsPage />} />
        <Route path="/symptom-checker" element={<SymptomForm />} />
         <Route path="/symptom-list" element={<SymptomListPage />} />
        <Route path="/update-password" element={<UpdatePasswordPage />} />
        <Route path="/update-pin" element={<PinUpdateScreen />} />
        {/* Start Checking From Here */}
        <Route path="/users-summary" element={<UserListPage />} />
        <Route path="/verify-pin" element={<PinVerifyScreen />} />
        <Route path="/view-prescriptions" element={<PrescriptionPage />} />
        <Route path="/view-appointments" element={<ViewAppointmentsPage />} />
        <Route path="/wellness-tips" element={<WellnessTipsScreen />} />
        <Route path="/emergency-alert" element={<EmergencyAlertPage />} />
      </Routes>
    </Router>
  );
}

export default App;
