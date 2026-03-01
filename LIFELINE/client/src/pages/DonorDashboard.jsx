'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function DonorDashboard({ token }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  const [matchingRequests, setMatchingRequests] = useState([]);
  const [requestsLoading, setRequestsLoading] = useState(false);
  const [requestsError, setRequestsError] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${API_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const userProfile = response.data.user;
      setProfile(userProfile);
      fetchMatchingRequests(userProfile?.bloodGroup);
    } catch (err) {
      setError('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const fetchMatchingRequests = async (bloodGroup) => {
    if (!bloodGroup) return;
    setRequestsLoading(true);
    setRequestsError('');

    try {
      const response = await axios.get(`${API_URL}/blood/requests?status=pending&bloodGroup=${encodeURIComponent(bloodGroup)}`);
      setMatchingRequests(response.data?.requests || []);
    } catch (err) {
      setRequestsError('Failed to load matching blood requests');
      setMatchingRequests([]);
    } finally {
      setRequestsLoading(false);
    }
  };

  if (loading) return (
    <div className="dashboard-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
        <p style={{ fontSize: '1.2rem', color: '#666' }}>Loading your profile...</p>
      </div>
    </div>
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>👤 Donor Dashboard</h1>
        <p>Welcome back, <strong>{profile?.fullName}</strong></p>
      </div>

      {/* Stats Overview */}
      {profile && (
        <div className="stats-grid">
          <div className="stat-card">
            <h3>🩸</h3>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#e63946' }}>{profile.bloodGroup}</p>
            <p>Your Blood Group</p>
          </div>
          <div className="stat-card">
            <h3>{profile.donationCount || 0}</h3>
            <p>Total Donations</p>
          </div>
          <div className="stat-card">
            <h3>{profile.canDonate ? '✅' : '❌'}</h3>
            <p>Eligible to Donate</p>
          </div>
          <div className="stat-card">
            <h3>📍</h3>
            <p>{profile.address?.city || 'Not Set'}</p>
            <p style={{ fontSize: '0.9rem', marginTop: '5px' }}>Current Location</p>
          </div>
        </div>
      )}

      <div className="dashboard-tabs">
        <button 
          className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          👤 My Profile
        </button>
        <button 
          className={`tab-btn ${activeTab === 'donations' ? 'active' : ''}`}
          onClick={() => setActiveTab('donations')}
        >
          🩸 My Donations
        </button>
        <button 
          className={`tab-btn ${activeTab === 'requests' ? 'active' : ''}`}
          onClick={() => setActiveTab('requests')}
        >
          📋 Blood Requests
        </button>
      </div>

      <div className="dashboard-content">
        {error && <div style={{ background: '#f8d7da', color: '#721c24', padding: '15px', borderRadius: '8px', marginBottom: '20px', border: '2px solid #f5c6cb' }}>❌ {error}</div>}

        {activeTab === 'profile' && profile && (
          <div className="profile-section">
            <h2>📋 Personal Information</h2>
            <div className="profile-info">
              <p><strong>👤 Full Name:</strong> {profile.fullName}</p>
              <p><strong>📧 Email:</strong> {profile.email}</p>
              <p><strong>📞 Phone:</strong> {profile.phone}</p>
              <p><strong>🎂 Age:</strong> {profile.age} years old</p>
              <p><strong>⚧ Gender:</strong> {profile.gender || 'Not specified'}</p>
              <p><strong>🩸 Blood Group:</strong> <span className="blood-badge">{profile.bloodGroup}</span></p>
              <p><strong>📍 City:</strong> {profile.address?.city || 'Not specified'}</p>
              <p><strong>🏠 Address:</strong> {profile.address?.street || 'Not specified'}, {profile.address?.state || 'Not specified'} {profile.address?.pincode || ''}</p>
              <p><strong>💉 Total Donations:</strong> {profile.donationCount || 0} time(s)</p>
              {profile.lastDonationDate && (
                <p><strong>📅 Last Donation:</strong> {new Date(profile.lastDonationDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              )}
              <p><strong>✅ Eligible to Donate:</strong> 
                <span style={{ marginLeft: '10px', fontWeight: 'bold', color: profile.canDonate ? '#51cf66' : '#d62828' }}>
                  {profile.canDonate ? '✅ Yes' : '❌ No'}
                </span>
              </p>
            </div>
          </div>
        )}

        {activeTab === 'donations' && (
          <div className="donations-section">
            <h2>🩸 Donation History</h2>
            {profile?.donationCount === 0 ? (
              <div style={{ background: '#fffbf0', padding: '40px', borderRadius: '8px', textAlign: 'center' }}>
                <p style={{ fontSize: '1.2rem', color: '#d62828', fontWeight: 'bold', marginBottom: '15px' }}>No donations yet</p>
                <p style={{ color: '#666', marginBottom: '20px' }}>You haven't made any donations yet. Every donation saves lives!</p>
                <a href="/blood-search" style={{ color: '#e63946', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.05rem' }}>🔍 Find Blood Requests →</a>
              </div>
            ) : (
              <div style={{ background: '#d4edda', padding: '20px', borderRadius: '8px', border: '2px solid #c3e6cb' }}>
                <p style={{ color: '#155724', fontWeight: 'bold', fontSize: '1.1rem' }}>✅ You have donated {profile?.donationCount} time(s)</p>
                <p style={{ color: '#155724', marginTop: '10px' }}>Thank you for saving lives! 💚</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="requests-section">
            <h2>📋 Blood Requests</h2>

            <div style={{ background: '#fff5f5', padding: '15px', borderRadius: '8px', border: '1px solid #ffd6d6', marginBottom: '16px' }}>
              <p style={{ margin: 0, color: '#b42318', fontWeight: '600' }}>Showing requests matching your blood group: {profile?.bloodGroup}</p>
            </div>

            {requestsError && (
              <div style={{ background: '#f8d7da', color: '#721c24', padding: '12px', borderRadius: '8px', marginBottom: '14px' }}>
                ❌ {requestsError}
              </div>
            )}

            {requestsLoading ? (
              <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px' }}>Loading matching requests...</div>
            ) : matchingRequests.length === 0 ? (
              <div style={{ background: '#e8f5e9', padding: '20px', borderRadius: '8px', border: '1px solid #c8e6c9' }}>
                ✅ No active requests for your blood group right now.
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '14px' }}>
                {matchingRequests.map((request) => (
                  <div key={request._id} style={{ background: '#fff', border: '1px solid #f1d0d0', borderLeft: '5px solid #e63946', borderRadius: '10px', padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
                      <strong style={{ color: '#d62828' }}>🩸 {request.bloodGroup} | {request.unitsNeeded} unit(s)</strong>
                      <span style={{ textTransform: 'capitalize', background: '#ffe5e5', color: '#b42318', padding: '4px 10px', borderRadius: '999px', fontSize: '0.85rem', fontWeight: '600' }}>{request.urgencyLevel}</span>
                    </div>
                    <p><strong>🏥 Hospital:</strong> {request.hospital}</p>
                    <p><strong>📝 Purpose:</strong> {request.purpose}</p>
                    {request.requiredByDate && <p><strong>📅 Required By:</strong> {new Date(request.requiredByDate).toLocaleDateString()}</p>}
                    <p><strong>👤 Requested By:</strong> {request.requester?.fullName || 'N/A'}</p>
                    <p><strong>📞 Contact:</strong> {request.requester?.phone || request.hospitalPhone || 'N/A'}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
