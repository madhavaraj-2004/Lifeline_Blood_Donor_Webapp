'use client';

import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/BloodSearch.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function BloodRequestDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRequestDetail = async () => {
      try {
        const response = await axios.get(`${API_URL}/blood/requests/${id}`);
        setRequest(response.data.request);
      } catch (err) {
        setError('Failed to load request details. Please try again.');
        console.error('Error fetching request:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequestDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="search-container">
        <div className="search-card">
          <h1>Loading...</h1>
          <p>Please wait while we fetch the request details.</p>
        </div>
      </div>
    );
  }

  if (error || !request) {
    return (
      <div className="search-container">
        <div className="search-card">
          <h1>❌ Error</h1>
          <p>{error || 'Request not found.'}</p>
          <Link to="/" className="btn btn-primary" style={{ marginTop: '20px', display: 'inline-block' }}>
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const getUrgencyColor = (level) => {
    const colors = {
      low: '#28a745',
      medium: '#ffc107',
      high: '#fd7e14',
      critical: '#dc3545'
    };
    return colors[level] || colors.medium;
  };

  const getUrgencyIcon = (level) => {
    const icons = {
      low: '🟢',
      medium: '🟡',
      high: '🔴',
      critical: '🚨'
    };
    return icons[level] || icons.medium;
  };

  return (
    <div className="search-container">
      <div className="search-card" style={{ maxWidth: '900px' }}>
        <div style={{ marginBottom: '20px' }}>
          <button 
            onClick={() => navigate(-1)} 
            className="btn btn-secondary"
            style={{ marginRight: '10px', padding: '8px 16px', fontSize: '14px' }}
          >
            ← Back
          </button>
          <Link 
            to="/" 
            className="btn btn-secondary"
            style={{ padding: '8px 16px', fontSize: '14px' }}
          >
            🏠 Home
          </Link>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h1 style={{ color: '#e63946', marginBottom: '10px' }}>🩸 Blood Request Details</h1>
          <div style={{ 
            display: 'inline-block',
            padding: '10px 20px',
            borderRadius: '8px',
            backgroundColor: getUrgencyColor(request.urgencyLevel),
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1.1rem'
          }}>
            {getUrgencyIcon(request.urgencyLevel)} {request.urgencyLevel?.toUpperCase() || 'MEDIUM'} URGENCY
          </div>
        </div>

        {/* Blood Information */}
        <div style={{ 
          marginBottom: '25px', 
          padding: '20px', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '10px',
          borderLeft: '5px solid #e63946'
        }}>
          <h2 style={{ color: '#e63946', marginBottom: '15px', fontSize: '1.3rem' }}>🩸 Blood Requirements</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
            <div>
              <strong style={{ color: '#666' }}>Blood Group:</strong>
              <p style={{ 
                fontSize: '1.8rem', 
                fontWeight: 'bold', 
                color: '#e63946',
                margin: '5px 0'
              }}>
                {request.bloodGroup}
              </p>
            </div>
            <div>
              <strong style={{ color: '#666' }}>Units Needed:</strong>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '5px 0' }}>
                {request.unitsNeeded} {request.unitsNeeded > 1 ? 'Units' : 'Unit'}
              </p>
            </div>
            {request.requiredByDate && (
              <div>
                <strong style={{ color: '#666' }}>Required By:</strong>
                <p style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: '5px 0', color: '#d9534f' }}>
                  {new Date(request.requiredByDate).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                  })}
                </p>
              </div>
            )}
            <div>
              <strong style={{ color: '#666' }}>Purpose:</strong>
              <p style={{ fontSize: '1.1rem', margin: '5px 0', textTransform: 'capitalize' }}>
                {request.purpose}
              </p>
            </div>
          </div>
        </div>

        {/* Hospital Information */}
        <div style={{ 
          marginBottom: '25px', 
          padding: '20px', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '10px',
          borderLeft: '5px solid #17a2b8'
        }}>
          <h2 style={{ color: '#17a2b8', marginBottom: '15px', fontSize: '1.3rem' }}>🏥 Hospital Information</h2>
          <div style={{ display: 'grid', gap: '12px' }}>
            <div>
              <strong style={{ color: '#666' }}>Hospital Name:</strong>
              <p style={{ fontSize: '1.1rem', margin: '5px 0' }}>{request.hospital}</p>
            </div>
            {request.hospitalPhone && (
              <div>
                <strong style={{ color: '#666' }}>Hospital Phone:</strong>
                <p style={{ fontSize: '1.1rem', margin: '5px 0' }}>
                  <a href={`tel:${request.hospitalPhone}`} style={{ color: '#007bff', textDecoration: 'none' }}>
                    📞 {request.hospitalPhone}
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Doctor Information */}
        <div style={{ 
          marginBottom: '25px', 
          padding: '20px', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '10px',
          borderLeft: '5px solid #28a745'
        }}>
          <h2 style={{ color: '#28a745', marginBottom: '15px', fontSize: '1.3rem' }}>👨‍⚕️ Doctor Information</h2>
          <div style={{ display: 'grid', gap: '12px' }}>
            <div>
              <strong style={{ color: '#666' }}>Doctor Name:</strong>
              <p style={{ fontSize: '1.1rem', margin: '5px 0' }}>{request.doctorName}</p>
            </div>
            <div>
              <strong style={{ color: '#666' }}>Doctor Phone:</strong>
              <p style={{ fontSize: '1.1rem', margin: '5px 0' }}>
                <a href={`tel:${request.doctorPhone}`} style={{ color: '#007bff', textDecoration: 'none' }}>
                  📞 {request.doctorPhone}
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        {request.additionalNotes && (
          <div style={{ 
            marginBottom: '25px', 
            padding: '20px', 
            backgroundColor: '#fff3cd', 
            borderRadius: '10px',
            borderLeft: '5px solid #ffc107'
          }}>
            <h2 style={{ color: '#856404', marginBottom: '15px', fontSize: '1.3rem' }}>📝 Additional Notes</h2>
            <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#856404' }}>
              {request.additionalNotes}
            </p>
          </div>
        )}

        {/* Request Status */}
        <div style={{ 
          marginBottom: '25px', 
          padding: '20px', 
          backgroundColor: '#e7f3ff', 
          borderRadius: '10px',
          borderLeft: '5px solid #007bff'
        }}>
          <h2 style={{ color: '#007bff', marginBottom: '15px', fontSize: '1.3rem' }}>ℹ️ Request Status</h2>
          <div style={{ display: 'grid', gap: '12px' }}>
            <div>
              <strong style={{ color: '#666' }}>Status:</strong>
              <p style={{ 
                fontSize: '1.1rem', 
                margin: '5px 0',
                color: request.status === 'fulfilled' ? '#28a745' : request.status === 'cancelled' ? '#dc3545' : '#ffc107',
                fontWeight: 'bold',
                textTransform: 'capitalize'
              }}>
                {request.status || 'Pending'}
              </p>
            </div>
            <div>
              <strong style={{ color: '#666' }}>Created On:</strong>
              <p style={{ fontSize: '1rem', margin: '5px 0' }}>
                {new Date(request.createdAt).toLocaleString('en-IN', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ 
          display: 'flex', 
          gap: '15px', 
          justifyContent: 'center',
          marginTop: '30px',
          flexWrap: 'wrap'
        }}>
          <Link 
            to="/blood-search" 
            className="btn btn-primary"
            style={{ padding: '12px 30px', fontSize: '1rem' }}
          >
            🔍 Search Donors
          </Link>
          <Link 
            to="/donor/login" 
            className="btn btn-secondary"
            style={{ padding: '12px 30px', fontSize: '1rem' }}
          >
            ❤️ Donor Login
          </Link>
          <a 
            href={`tel:${request.doctorPhone}`}
            className="btn"
            style={{ 
              padding: '12px 30px', 
              fontSize: '1rem',
              backgroundColor: '#28a745',
              color: 'white',
              textDecoration: 'none',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            📞 Call Doctor
          </a>
        </div>
      </div>
    </div>
  );
}
