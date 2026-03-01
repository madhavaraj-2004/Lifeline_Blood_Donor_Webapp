'use client';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Home.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function Home() {
  const [requests, setRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`${API_URL}/blood/requests?status=pending`);
        const latest = (response.data?.requests || []).slice(0, 4);
        setRequests(latest);
      } catch (error) {
        setRequests([]);
      } finally {
        setLoadingRequests(false);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="home">
      <div className="hero">
        <h1>LIFELINE</h1>
        <p>Save Lives Through Blood Donation</p>
        <div className="hero-buttons">
          <Link to="/blood-search" className="btn btn-primary">🔍 Search Blood</Link>
          <Link to="/request-blood" className="btn btn-primary">🩸 Request Blood</Link>
          <Link to="/donor/login" className="btn btn-secondary">👤 Donor Login</Link>
          <Link to="/admin/login" className="btn btn-admin">🛡️ Admin Portal</Link>
        </div>
      </div>

      <div className="features">
        <h2>How LIFELINE Works</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>📋</div>
            <h3>Register as Donor</h3>
            <p>Create an account and register as a blood donor in seconds with our simple registration process.</p>
            <Link to="/donor/register">Register Now</Link>
          </div>
          <div className="feature-card">
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🔍</div>
            <h3>Find Donors</h3>
            <p>Search for available blood donors by blood group and location instantly and connect with them.</p>
            <Link to="/blood-search">Search</Link>
          </div>
          <div className="feature-card">
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🩸</div>
            <h3>Request Blood</h3>
            <p>Post blood requests and get matched with eligible donors instantly when you need blood urgently.</p>
            <Link to="/request-blood">Request Now</Link>
          </div>
          <div className="feature-card">
            <div style={{ fontSize: '3rem', marginBottom: '15px' }}>⚙️</div>
            <h3>Manage Inventory</h3>
            <p>Admin dashboard for complete blood inventory management and comprehensive donor database control.</p>
            <Link to="/admin/login">Admin Login</Link>
          </div>
        </div>
      </div>

      <div className="blood-groups">
        <h2>Blood Group Distribution</h2>
        <div className="groups-grid">
          {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map(bg => (
            <div key={bg} className="group-badge" title={`Blood Group ${bg}`}>{bg}</div>
          ))}
        </div>
      </div>

      <div className="home-requests">
        <h2>Active Blood Requests</h2>
        <p className="home-requests-subtitle">People currently waiting for donors. If your group matches, please help.</p>

        {loadingRequests ? (
          <div className="home-request-empty">Loading requests...</div>
        ) : requests.length === 0 ? (
          <div className="home-request-empty">No active requests right now.</div>
        ) : (
          <div className="home-request-grid">
            {requests.map((request) => (
              <Link 
                key={request._id} 
                to={`/blood-request/${request._id}`}
                className="home-request-card"
                style={{ textDecoration: 'none', color: 'inherit', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(230, 57, 70, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '';
                }}
              >
                <div className="home-request-top">
                  <span className="home-blood-badge" style={{ fontSize: '2rem', fontWeight: 'bold' }}>{request.bloodGroup}</span>
                  <span className={`home-urgency ${request.urgencyLevel || 'medium'}`} style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>
                    {request.urgencyLevel || 'medium'}
                  </span>
                </div>
                <h4 style={{ fontSize: '1.3rem', margin: '15px 0', color: '#333' }}>{request.hospital}</h4>
                <p style={{ color: '#666', fontSize: '0.95rem', marginBottom: '20px' }}>
                  {request.unitsNeeded} {request.unitsNeeded > 1 ? 'Units' : 'Unit'} Needed
                  {request.requiredByDate && ` • By ${new Date(request.requiredByDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}`}
                </p>
                <div style={{ 
                  marginTop: 'auto',
                  padding: '12px', 
                  backgroundColor: '#e63946', 
                  color: 'white', 
                  borderRadius: '8px', 
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: '1rem'
                }}>
                  Click to View Details →
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="home-request-actions">
          <Link to="/request-blood" className="btn btn-primary">🩸 Create Request</Link>
          <Link to="/donor/login" className="btn btn-secondary">❤️ Donor Login</Link>
        </div>
      </div>

      <div className="cta">
        <h2>Be a Hero Today</h2>
        <p>Every drop of blood can save a life and help someone in need</p>
        <Link to="/donor/register" className="btn btn-primary">❤️ Become a Donor</Link>
      </div>

      <footer className="footer">
        <p>&copy; 2026 LIFELINE - Blood Donation Management System | Developed By Murugan B</p>
      </footer>
    </div>
  );
}
