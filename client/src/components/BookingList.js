// components/BookingList.js
import React, { useEffect, useState } from 'react';
import API from '../api';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await API.get('/bookings', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setBookings(res.data);
      } catch (err) {
        alert('Failed to load bookings');
      }
    };
    fetchBookings();
  }, []);

  if (bookings.length === 0) return <p>No bookings found.</p>;

  return (
    <ul>
      {bookings.map(b => (
        <li key={b._id}>
          {b.messType} - {new Date(b.date).toLocaleDateString()} - {b.mealType}
        </li>
      ))}
    </ul>
  );
};

export default BookingList;
