'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Dashboard.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function AdminDashboard({ token }) {
  const [stats, setStats] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState([]);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      const statsRes = await axios.get(`${API_URL}/admin/dashboard`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(statsRes.data);

      // Always fetch users
      const usersRes = await axios.get(`${API_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(usersRes.data.users);

      // Always fetch donations
      const donRes = await axios.get(`${API_URL}/admin/donations`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDonations(donRes.data.donations);
    } catch (err) {
      setError('Failed to load dashboard: ' + (err.response?.data?.message || err.message));
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="admin-dashboard" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
        <p style={{ fontSize: '1.2rem', color: '#666' }}>Loading dashboard...</p>
      </div>
    </div>
  );

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>🛡️ Admin Dashboard</h1>
        <p>Blood Bank Management System</p>
      </div>

      {error && <div style={{ background: '#f8d7da', color: '#721c24', padding: '15px', borderRadius: '8px', marginBottom: '30px', border: '2px solid #f5c6cb' }}>❌ {error}</div>}

      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <h3>👥</h3>
            <h3>{stats.totalDonors}</h3>
            <p>Total Donors</p>
          </div>
          <div className="stat-card">
            <h3>💉</h3>
            <h3>{stats.totalDonations}</h3>
            <p>Donations Collected</p>
          </div>
          <div className="stat-card">
            <h3>📋</h3>
            <h3>{stats.pendingRequests}</h3>
            <p>Pending Requests</p>
          </div>
          <div className="stat-card critical">
            <h3>🚨</h3>
            <h3>{stats.criticalRequests}</h3>
            <p>Critical Requests</p>
          </div>
        </div>
      )}

      <div className="dashboard-tabs">
        <button className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>📊 Overview</button>
        <button className={`tab-btn ${activeTab === 'inventory' ? 'active' : ''}`} onClick={() => setActiveTab('inventory')}>📦 Inventory</button>
        <button className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>👥 Users</button>
        <button className={`tab-btn ${activeTab === 'donations' ? 'active' : ''}`} onClick={() => setActiveTab('donations')}>💉 Donations</button>
      </div>

      <div className="tab-content">
        {activeTab === 'overview' && stats && (
          <div className="overview-section">
            <h2>🩸 Blood Inventory Status</h2>
            <div className="inventory-grid">
              {stats.bloodInventory?.map(item => (
                <div key={item._id} className="inventory-item">
                  <h4>🩸 {item.bloodGroup}</h4>
                  <p className="units">{item.unitsAvailable}</p>
                  <p style={{ fontSize: '0.9rem', color: '#666' }}>units available</p>
                  <p style={{ marginTop: '10px' }} className={item.unitsAvailable < item.minStockLevel ? 'low' : 'normal'}>
                    {item.unitsAvailable < item.minStockLevel ? '⚠️ Low Stock' : '✅ Adequate'}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'inventory' && stats && (
          <div className="inventory-section">
            <h2>📦 Complete Inventory</h2>
            <p style={{ marginBottom: '20px', color: '#666' }}>Current stock levels for all blood types</p>
            <div className="inventory-grid">
              {stats.bloodInventory?.map(item => (
                <div key={item._id} className="inventory-item">
                  <h4>{item.bloodGroup}</h4>
                  <p className="units">{item.unitsAvailable}</p>
                  <p style={{ fontSize: '0.85rem', color: '#999', marginBottom: '10px' }}>units in stock</p>
                  <div style={{ background: '#e9ecef', padding: '8px', borderRadius: '4px', marginTop: '10px' }}>
                    <p style={{ fontSize: '0.85rem', color: '#555', margin: '4px 0' }}>Min: {item.minStockLevel}</p>
                    <p style={{ fontSize: '0.85rem', color: '#555', margin: '4px 0' }}>Max: {item.maxStockLevel}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="users-section">
            <h2>👥 Registered Donors</h2>
            {users.length > 0 ? (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #e63946' }}>
                      <th style={{ padding: '15px', textAlign: 'left', fontWeight: '700' }}>Name</th>
                      <th style={{ padding: '15px', textAlign: 'left', fontWeight: '700' }}>Blood Group</th>
                      <th style={{ padding: '15px', textAlign: 'left', fontWeight: '700' }}>City</th>
                      <th style={{ padding: '15px', textAlign: 'left', fontWeight: '700' }}>Donations</th>
                      <th style={{ padding: '15px', textAlign: 'left', fontWeight: '700' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user._id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                        <td style={{ padding: '15px' }}>{user.fullName}</td>
                        <td style={{ padding: '15px' }}><span className="blood-badge">{user.bloodGroup}</span></td>
                        <td style={{ padding: '15px' }}>{user.address?.city || 'N/A'}</td>
                        <td style={{ padding: '15px' }}>{user.donationCount || 0}</td>
                        <td style={{ padding: '15px' }}><span style={{ color: user.canDonate ? '#51cf66' : '#d62828', fontWeight: 'bold' }}>{user.canDonate ? '✅ Active' : '❌ Inactive'}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p style={{ color: '#666', padding: '20px', textAlign: 'center' }}>No donors registered yet</p>
            )}
          </div>
        )}

        {activeTab === 'donations' && (
          <div className="donations-section">
            <h2>💉 Donation Records</h2>
            {donations.length > 0 ? (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#f8f9fa', borderBottom: '2px solid #e63946' }}>
                      <th style={{ padding: '15px', textAlign: 'left', fontWeight: '700' }}>Donor Name</th>
                      <th style={{ padding: '15px', textAlign: 'left', fontWeight: '700' }}>Blood Group</th>
                      <th style={{ padding: '15px', textAlign: 'left', fontWeight: '700' }}>Date</th>
                      <th style={{ padding: '15px', textAlign: 'left', fontWeight: '700' }}>Units</th>
                      <th style={{ padding: '15px', textAlign: 'left', fontWeight: '700' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {donations.map(donation => (
                      <tr key={donation._id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                        <td style={{ padding: '15px' }}>{donation.donorName || 'Unknown'}</td>
                        <td style={{ padding: '15px' }}><span className="blood-badge">{donation.bloodGroup}</span></td>
                        <td style={{ padding: '15px' }}>{new Date(donation.date).toLocaleDateString()}</td>
                        <td style={{ padding: '15px' }}>{donation.units || 'N/A'} units</td>
                        <td style={{ padding: '15px' }}><span style={{ color: '#51cf66', fontWeight: 'bold' }}>✅ Completed</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p style={{ color: '#666', padding: '20px', textAlign: 'center' }}>No donation records found</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
