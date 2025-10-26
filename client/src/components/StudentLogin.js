import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Hardcoded student credentials for testing
const STUDENT_CREDENTIALS = [
  { email: "student1@hostel.com", password: "student123" },
  { email: "student2@hostel.com", password: "student123" }
];

const StudentLogin = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Check student credentials
    const student = STUDENT_CREDENTIALS.find(
      s => s.email === formData.email && s.password === formData.password
    );

    if (student) {
      localStorage.setItem('userRole', 'student');
      localStorage.setItem('token', 'student-token');
      localStorage.setItem('userEmail', formData.email);
      setIsLoggedIn(true);
      navigate('/dashboard');
    } else {
      setError('Invalid student credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Student Login</h2>
        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="student1@hostel.com"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Login as Student
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;