import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);  // <-- now this will work
    navigate('/'); // redirect to home page after logout
  };

  return (
    <div>
      <h2>Welcome to the Dashboard</h2>
      <p>This page is protected. Only logged-in users can see this.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
