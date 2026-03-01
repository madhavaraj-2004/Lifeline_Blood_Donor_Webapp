'use client';

import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Navbar from '../components/Navbar';
import DonorRegister from './DonorRegister';

function DonorPanel({ onNavigate }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [googleData, setGoogleData] = useState(null);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleGoogleSuccess = (credentialResponse) => {
    const token = credentialResponse.credential;
    const decoded = JSON.parse(atob(token.split('.')[1]));

    setGoogleData({
      email: decoded.email,
      name: decoded.name,
    });

    setIsLoggedIn(true);
  };

  const handleGoogleError = () => {
    console.error('Login Failed');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setGoogleData(null);
    setShowRegisterForm(false);
  };

  if (showRegisterForm && isLoggedIn) {
    return <DonorRegister googleData={googleData} onNavigate={onNavigate} />;
  }

  return (
    <div>
      <Navbar onNavigate={onNavigate} currentPage="donorPanel" />

      <div className="container my-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            {!isLoggedIn ? (
              <div className="card">
                <div className="card-body p-5">
                  <h2 className="card-title text-center mb-4" style={{ color: '#dc3545' }}>
                    Donor Login
                  </h2>
                  <p className="text-center text-muted mb-4">
                    Login with your Google account to become a blood donor
                  </p>
                  <div className="d-flex justify-content-center">
                    <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="card">
                <div className="card-body p-5">
                  <h2 className="card-title mb-4" style={{ color: '#dc3545' }}>
                    Welcome, {googleData?.name}!
                  </h2>
                  <p className="text-muted mb-3">Email: {googleData?.email}</p>

                  {!showRegisterForm ? (
                    <div>
                      <p className="mb-4">
                        You are logged in. Click the button below to register as a blood donor.
                      </p>
                      <div className="d-grid gap-2 mb-3">
                        <button
                          className="btn btn-primary btn-lg"
                          onClick={() => setShowRegisterForm(true)}
                        >
                          Register as Donor
                        </button>
                      </div>
                    </div>
                  ) : null}

                  <div className="d-grid gap-2">
                    <button className="btn btn-outline-secondary" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DonorPanel;
