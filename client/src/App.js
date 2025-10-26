import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import StudentLogin from './components/StudentLogin';
import StudentDashboard from './components/StudentDashboard';
import AdminDashboard from './components/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-indigo-600">
                Hostel Mess
              </Link>
            </div>
            <div className="flex items-center">
              {isLoggedIn ? (
                <>
                  {localStorage.getItem('userRole') === 'admin' ? (
                    <Link to="/admin" className="text-gray-700 hover:text-indigo-600 px-3 py-2">
                      Admin Dashboard
                    </Link>
                  ) : (
                    <Link to="/dashboard" className="text-gray-700 hover:text-indigo-600 px-3 py-2">
                      Student Dashboard
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="ml-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="space-x-4">
                  <Link
                    to="/admin-login"
                    className="inline-block px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Admin Login
                  </Link>
                  <Link
                    to="/student-login"
                    className="inline-block px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                  >
                    Student Login
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route
              path="/admin-login"
              element={isLoggedIn ? <Navigate to="/admin" /> : <AdminLogin setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route
              path="/student-login"
              element={isLoggedIn ? <Navigate to="/dashboard" /> : <StudentLogin setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute role="student">
                  <StudentDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <PrivateRoute role="admin">
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <Navigate to={localStorage.getItem('userRole') === 'admin' ? '/admin' : '/dashboard'} />
                ) : (
                  <div className="max-w-md mx-auto mt-20 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-8">
                      Welcome to Hostel Mess Booking
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                      Please choose your role to continue
                    </p>
                    <div className="space-y-4">
                      <Link
                        to="/admin-login"
                        className="block w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        Admin Login
                      </Link>
                      <Link
                        to="/student-login"
                        className="block w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                      >
                        Student Login
                      </Link>
                    </div>
                  </div>
                )
              }
            />
          </Routes>
        </main>
    </div>
  );
}

export default App;
