import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import BookingForm from './components/BookingForm';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check token presence in localStorage on mount
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <Router>
      <nav>
        {isLoggedIn ? (
          <>
            <Link to="/dashboard">Home</Link>
             <Link to="/booking">Book a Meal</Link>
            {/* You can add a Logout button here later */}
          </>
        ) : (
          <>
            <Link to="/register">Register</Link> | <Link to="/login">Login</Link>
          </>
        )}
      </nav>

      <Routes>
        <Route
          path="/register"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Register />}
        />
        <Route 
          path="/booking" 
          element={<BookingForm />} 
          />
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard setIsLoggedIn={setIsLoggedIn} />
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <h2>Welcome to Hostel Mess Booking System</h2>}
        />
      </Routes>
    </Router>
  );
}

export default App;
