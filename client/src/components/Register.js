// src/components/Register.js
import React, { useState } from 'react';
import API from '../api';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await API.post('/auth/register', form);
    console.log('Register response:', res);

    if (!res || !res.data) {
      alert('No response data from server.');
      return;
    }

    // Show the message from backend
    alert(res.data.message || 'Registration successful! Please login.');

    // Optionally clear form fields
    setForm({ name: '', email: '', password: '' });

  } catch (err) {
    console.error('Registration error:', err);
    alert(err?.response?.data?.message || 'Registration failed.');
  }
};



  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
