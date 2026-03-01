'use client';

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import DonorRegister from './pages/DonorRegister';
import DonorLogin from './pages/DonorLogin';
import DonorDashboard from './pages/DonorDashboard';
import BloodSearch from './pages/BloodSearch';
import RequestBlood from './pages/RequestBlood';
import BloodRequestDetail from './pages/BloodRequestDetail';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

function App() {
  const [donorToken, setDonorToken] = useState(localStorage.getItem('donorToken') || '');
  const [adminToken, setAdminToken] = useState(localStorage.getItem('adminToken') || '');

  useEffect(() => {
    if (donorToken) {
      localStorage.setItem('donorToken', donorToken);
    }
  }, [donorToken]);

  useEffect(() => {
    if (adminToken) {
      localStorage.setItem('adminToken', adminToken);
    }
  }, [adminToken]);

  const handleDonorLogout = () => {
    setDonorToken('');
    localStorage.removeItem('donorToken');
  };

  const handleAdminLogout = () => {
    setAdminToken('');
    localStorage.removeItem('adminToken');
  };

  return (
    <Router>
      <div className="app">
        <Navbar donorLoggedIn={!!donorToken} adminLoggedIn={!!adminToken} 
                onDonorLogout={handleDonorLogout} onAdminLogout={handleAdminLogout} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blood-search" element={<BloodSearch />} />
          <Route path="/blood-request/:id" element={<BloodRequestDetail />} />
          <Route path="/donor/register" element={donorToken ? <Navigate to="/donor/dashboard" /> : <DonorRegister setToken={setDonorToken} />} />
          <Route path="/donor/login" element={donorToken ? <Navigate to="/donor/dashboard" /> : <DonorLogin setToken={setDonorToken} />} />
          <Route path="/donor/dashboard" element={donorToken ? <DonorDashboard token={donorToken} /> : <Navigate to="/donor/login" />} />
          <Route path="/request-blood" element={<RequestBlood token={donorToken} />} />
          <Route path="/admin/login" element={adminToken ? <Navigate to="/admin/dashboard" /> : <AdminLogin setToken={setAdminToken} />} />
          <Route path="/admin/dashboard" element={adminToken ? <AdminDashboard token={adminToken} /> : <Navigate to="/admin/login" />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
