'use client';

import { useState } from 'react';
import axios from 'axios';
import '../styles/BloodSearch.css';

const BLOOD_GROUPS = ['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'];
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function BloodSearch() {
  const [searchParams, setSearchParams] = useState({
    bloodGroup: '',
    city: '',
  });

  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);
  const [donors, setDonors] = useState([]);

  const handleChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchParams.bloodGroup) {
      setError('Please select a blood group');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.get(`${API_URL}/blood/search`, {
        params: searchParams
      });
      setResults(response.data);
      setDonors(response.data.donors || []);
      setSearched(true);
    } catch (err) {
      setError('No donors found');
      setResults(null);
      setDonors([]);
      setSearched(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <div className="search-card">
        <h1>🔍 Find Blood Donors</h1>
        <p>Search for available blood donors in your area and connect with them</p>

        <form onSubmit={handleSearch}>
          <div className="search-form">
            <div className="form-group">
              <label>Blood Group *</label>
              <select 
                name="bloodGroup" 
                value={searchParams.bloodGroup} 
                onChange={handleChange}
                required
              >
                <option value="">Select Blood Group</option>
                {BLOOD_GROUPS.map(bg => <option key={bg} value={bg}>{bg}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label>City (Optional)</label>
              <input 
                type="text"
                name="city"
                placeholder="Enter city name"
                value={searchParams.city}
                onChange={handleChange}
              />
            </div>

            <button type="submit" disabled={loading} className="search-btn">
              {loading ? '⏳ Searching...' : '🔎 Search Donors'}
            </button>
          </div>
        </form>

        {searched && (
          <div className="results-section">
            {error && <div className="error-message">❌ {error}</div>}

            {!error && results && (
              <>
                <div className="inventory-info">
                  <p><strong>💉 Blood Type:</strong> {searchParams.bloodGroup}</p>
                  <p><strong>👥 Total Donors Found:</strong> {donors.length}</p>
                  {searchParams.city && <p><strong>📍 Location:</strong> {searchParams.city}</p>}
                </div>

                {donors.length > 0 ? (
                  <div className="donors-list">
                    <h3>👤 Available Donors</h3>
                    {donors.map(donor => {
                      console.log('Donor data:', donor);
                      return (
                        <div key={donor._id} className="donor-card">
                          <p><strong>👤 Name:</strong> {donor.fullName || donor.name || 'N/A'}</p>
                          <p><strong>📞 Phone:</strong> {donor.phone || 'N/A'}</p>
                          {donor.address?.city && <p><strong>📍 Location:</strong> {donor.address.city}</p>}
                          <a 
                            href={`tel:${donor.phone}`} 
                            className="search-btn" 
                            style={{ 
                              marginTop: '10px', 
                              width: '100%', 
                              display: 'block',
                              textAlign: 'center',
                              textDecoration: 'none',
                              backgroundColor: '#28a745',
                              border: 'none',
                              color: 'white'
                            }}
                          >
                            📞 Call Donor
                          </a>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div style={{ marginTop: '20px', padding: '20px', textAlign: 'center', background: '#fffbf0', borderRadius: '8px' }}>
                    <p style={{ color: '#d62828', fontWeight: '600' }}>⚠️ No donors found matching your criteria</p>
                    <p style={{ color: '#666', marginTop: '10px' }}>Try searching with a different location or blood group</p>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default BloodSearch;