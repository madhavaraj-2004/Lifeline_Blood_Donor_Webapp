'use client';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Auth.css';

const BLOOD_GROUPS = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];

export default function DonorRegister({ setToken }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    age: '',
    gender: '',
    bloodGroup: '',
    street: '',
    city: '',
    state: '',
    pincode: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_URL}/users/register`, formData);
      setToken(response.data.token);
      navigate('/donor/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card register-card">
        <h2>❤️ Register as Donor</h2>
        <p className="subtitle">Join our lifesaving community</p>
        {error && <div className="error-message">❌ {error}</div>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="👤 Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="📧 Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="🔐 Password (min 6 characters)"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="6"
          />
          <input
            type="tel"
            name="phone"
            placeholder="📞 Phone (10 digits)"
            value={formData.phone}
            onChange={handleChange}
            required
            pattern="[0-9]{10}"
          />
          <input
            type="number"
            name="age"
            placeholder="🎂 Age (18-65)"
            value={formData.age}
            onChange={handleChange}
            required
            min="18"
            max="65"
          />
          <select name="gender" value={formData.gender} onChange={handleChange} required>
            <option value="">⚧ Select Gender</option>
            <option value="Male">👨 Male</option>
            <option value="Female">👩 Female</option>
            <option value="Other">👤 Other</option>
          </select>
          <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required>
            <option value="">🩸 Select Blood Group</option>
            {BLOOD_GROUPS.map(bg => <option key={bg} value={bg}>{bg}</option>)}
          </select>
          <input
            type="text"
            name="street"
            placeholder="🏠 Street Address"
            value={formData.street}
            onChange={handleChange}
          />
          <input
            type="text"
            name="city"
            placeholder="🏙️ City"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="state"
            placeholder="📍 State"
            value={formData.state}
            onChange={handleChange}
          />
          <input
            type="text"
            name="pincode"
            placeholder="📮 Pincode"
            value={formData.pincode}
            onChange={handleChange}
          />
          <button type="submit" disabled={loading}>
            {loading ? '⏳ Registering...' : '✅ Register as Donor'}
          </button>
        </form>
        <p>Already have an account? <a href="/donor/login">Login here</a></p>
      </div>
    </div>
  );
}
