import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Welcome to Admin Dashboard</h2>
      <div
        style={{
          maxWidth: '400px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          background: 'yellow',
          height: '400px',
        }}
      >
        <div
          style={{
            background: '#e66f1e',
            padding: '15px',
            cursor: 'pointer',
            color: '#fff',
            fontWeight: '600',
            marginBottom: '10px',
          }}
          onClick={() => navigate('/create-account')}
        >
          Account Opening process for Customer
        </div>

        <div
          style={{
            background: '#e66f1e',
            padding: '15px',
            cursor: 'pointer',
            color: '#fff',
            fontWeight: '600',
          }}
        >
          Delegate as a customer
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
