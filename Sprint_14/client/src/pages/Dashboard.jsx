import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import * as authService from '../services/auth';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await authService.getMe();
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile', error);
        if (error.response && error.response.status === 401) {
          logout();
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProfile();
    }
  }, [user, logout, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Prodesk IT Dashboard</h1>
        <button onClick={handleLogout} className="btn-danger">
          Logout
        </button>
      </header>
      
      <main className="dashboard-content">
        <h2>
          Welcome, <span style={{ color: '#a5b4fc' }}>{profile ? profile.name : user?.name || 'User'}</span>!
        </h2>
        
        <div className="status-grid">
          <div className="info-card">
            <span className="info-label">Authentication Status</span>
            <span className="info-value status-value authenticated">Authenticated</span>
          </div>
          
          <div className="info-card">
            <span className="info-label">Email Address</span>
            <span className="info-value">{profile ? profile.email : user?.email}</span>
          </div>

          <div className="info-card">
            <span className="info-label">Account Security</span>
            <span className="info-value" style={{ color: '#a5b4fc' }}>Protected via JWT</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
