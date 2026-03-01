'use client';

import { useState } from 'react';
import axios from 'axios';
import '../styles/BloodSearch.css';

const BLOOD_GROUPS = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];
const PURPOSES = ['surgery', 'accident', 'anemia', 'childbirth', 'other'];
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function RequestBlood({ token }) {
  const [formData, setFormData] = useState({
    bloodGroup: '',
    unitsNeeded: '',
    urgencyLevel: 'medium',
    hospital: '',
    hospitalPhone: '',
    doctorName: '',
    doctorPhone: '',
    purpose: '',
    requiredByDate: '',
    additionalNotes: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Validation before sending
    if (!formData.bloodGroup) {
      setError('❌ Blood group is required');
      setLoading(false);
      return;
    }
    if (!formData.unitsNeeded || formData.unitsNeeded < 1) {
      setError('❌ Units needed must be at least 1');
      setLoading(false);
      return;
    }
    if (!formData.hospital.trim()) {
      setError('❌ Hospital name is required');
      setLoading(false);
      return;
    }
    if (!formData.doctorName.trim()) {
      setError('❌ Doctor name is required');
      setLoading(false);
      return;
    }
    if (!formData.doctorPhone || !/^[0-9]{10}$/.test(formData.doctorPhone)) {
      setError('❌ Doctor phone must be exactly 10 digits (no spaces or special characters)');
      setLoading(false);
      return;
    }
    if (!formData.purpose) {
      setError('❌ Purpose of request is required');
      setLoading(false);
      return;
    }

    try {
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      const response = await axios.post(`${API_URL}/blood/request`, formData, {
        headers
      });
      setSuccess('✅ Blood request created successfully! Donors will be notified soon.');
      setFormData({
        bloodGroup: '', unitsNeeded: '', urgencyLevel: 'medium',
        hospital: '', hospitalPhone: '', doctorName: '', doctorPhone: '',
        purpose: '', requiredByDate: '', additionalNotes: ''
      });
    } catch (err) {
      // Handle validation errors from server
      if (err.response?.data?.errors && Array.isArray(err.response.data.errors)) {
        const messages = err.response.data.errors.map(e => e.msg).join(', ');
        setError(`❌ ${messages}`);
      } else if (err.response?.data?.message) {
        setError(`❌ ${err.response.data.message}`);
      } else {
        setError('❌ Failed to create request. Please check your connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <div className="search-card">
        <h1>🩸 Request Blood</h1>
        <p>Submit an urgent blood request and we'll help match you with eligible donors</p>

        {error && <div className="error-message">❌ {error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="search-form">
            {/* Blood Information Section */}
            <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '2px solid #e9ecef' }}>
              <h3 style={{ color: '#e63946', marginBottom: '15px', fontSize: '1.2rem', fontWeight: '700' }}>🩸 Blood Requirements</h3>
              
              <div className="form-group">
                <label>Blood Group *</label>
                <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required>
                  <option value="">Select Blood Group</option>
                  {BLOOD_GROUPS.map(bg => <option key={bg} value={bg}>{bg}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label>Units Needed *</label>
                <input type="number" name="unitsNeeded" value={formData.unitsNeeded} onChange={handleChange} min="1" placeholder="Enter number of units" required />
              </div>

              <div className="form-group">
                <label>Urgency Level</label>
                <select name="urgencyLevel" value={formData.urgencyLevel} onChange={handleChange}>
                  <option value="low">🟢 Low</option>
                  <option value="medium">🟡 Medium</option>
                  <option value="high">🔴 High</option>
                  <option value="critical">🚨 Critical</option>
                </select>
              </div>

              <div className="form-group">
                <label>Required By Date</label>
                <input type="date" name="requiredByDate" value={formData.requiredByDate} onChange={handleChange} />
              </div>
            </div>

            {/* Hospital Information Section */}
            <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '2px solid #e9ecef' }}>
              <h3 style={{ color: '#e63946', marginBottom: '15px', fontSize: '1.2rem', fontWeight: '700' }}>🏥 Hospital Information</h3>
              
              <div className="form-group">
                <label>Hospital Name *</label>
                <input type="text" name="hospital" value={formData.hospital} onChange={handleChange} placeholder="Enter hospital name" required />
              </div>

              <div className="form-group">
                <label>Hospital Phone</label>
                <input type="tel" name="hospitalPhone" value={formData.hospitalPhone} onChange={handleChange} placeholder="Enter hospital phone number" />
              </div>
            </div>

            {/* Doctor Information Section */}
            <div style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '2px solid #e9ecef' }}>
              <h3 style={{ color: '#e63946', marginBottom: '15px', fontSize: '1.2rem', fontWeight: '700' }}>👨‍⚕️ Doctor Information</h3>
              
              <div className="form-group">
                <label>Doctor Name *</label>
                <input type="text" name="doctorName" value={formData.doctorName} onChange={handleChange} placeholder="Enter doctor's name" required />
              </div>

              <div className="form-group">
                <label>Doctor Phone *</label>
                <input 
                  type="tel" 
                  name="doctorPhone" 
                  value={formData.doctorPhone} 
                  onChange={handleChange} 
                  placeholder="10-digit phone number (e.g., 9876543210)" 
                  pattern="[0-9]{10}"
                  required 
                />
                <small style={{ color: '#666', fontSize: '0.85rem' }}>Enter exactly 10 digits without spaces or symbols</small>
              </div>
            </div>

            {/* Additional Information Section */}
            <div>
              <h3 style={{ color: '#e63946', marginBottom: '15px', fontSize: '1.2rem', fontWeight: '700' }}>📝 Additional Information</h3>
              
              <div className="form-group">
                <label>Purpose of Request *</label>
                <select name="purpose" value={formData.purpose} onChange={handleChange} required>
                  <option value="">Select Purpose</option>
                  <option value="surgery">Surgery</option>
                  <option value="accident">Accident</option>
                  <option value="anemia">Anemia</option>
                  <option value="childbirth">Childbirth</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Additional Notes</label>
                <textarea name="additionalNotes" value={formData.additionalNotes} onChange={handleChange} placeholder="Add any additional information..." rows="4"></textarea>
              </div>
            </div>

            <button type="submit" disabled={loading} className="search-btn">
              {loading ? '⏳ Submitting Request...' : '✅ Submit Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
