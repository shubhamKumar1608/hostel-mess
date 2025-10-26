// components/BookingList.js
import React, { useEffect, useState } from 'react';
import API from '../api';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const res = await API.get('/bookings');
        setBookings(res.data);
        setError(null);
      } catch (err) {
        console.error('Failed to load bookings:', err);
        setError('Failed to load your bookings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) return <div className="loading">Loading your bookings...</div>;
  if (error) return <div className="error-message">{error}</div>;
  if (bookings.length === 0) return <div className="empty-state">No bookings found.</div>;

  const formatMeals = (meals) => {
    return Object.entries(meals)
      .filter(([_, isBooked]) => isBooked)
      .map(([meal]) => meal.charAt(0).toUpperCase() + meal.slice(1))
      .join(', ');
  };

  return (
    <div className="bookings-list">
      <h2>Your Meal Bookings</h2>
      <div className="bookings-grid">
        {bookings.map(booking => (
          <div key={booking._id} className="booking-card">
            <div className="booking-date">
              {new Date(booking.date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <div className="booking-meals">
              <strong>Meals:</strong> {formatMeals(booking.meals)}
            </div>
            <div className="booking-meta">
              <span className="mess-type">{booking.messType || 'Main'} Mess</span>
              <span className="booking-time">
                Booked on: {new Date(booking.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingList;
