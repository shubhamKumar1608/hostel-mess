// components/BookingForm.js
import React, { useState, useEffect } from 'react';
import API from '../api';

const mealTypes = ['breakfast', 'lunch', 'snacks', 'dinner'];

const BookingForm = ({ menu }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedMeals, setSelectedMeals] = useState({});
  const [menuForDay, setMenuForDay] = useState(null);

  // Allow booking for up to 7 days from today
  const today = new Date();
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d.toISOString().split('T')[0];
  });

  useEffect(() => {
    if (selectedDate && menu) {
      const found = menu.find(m => m.date === selectedDate);
      setMenuForDay(found || null);
    } else {
      setMenuForDay(null);
    }
    setSelectedMeals({});
  }, [selectedDate, menu]);

  const handleMealChange = (meal) => {
    setSelectedMeals(prev => ({
      ...prev,
      [meal]: !prev[meal]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDate || Object.keys(selectedMeals).length === 0) {
      alert('Please select a date and at least one meal.');
      return;
    }
    try {
      await API.post('/bookings', {
        date: selectedDate,
        meals: selectedMeals
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      alert('Booking created!');
      setSelectedDate('');
      setSelectedMeals({});
    } catch (err) {
      alert(err?.response?.data?.message || 'Failed to create booking');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto' }}>
      <label>
        Select Date:
        <select
          value={selectedDate}
          onChange={e => setSelectedDate(e.target.value)}
          required
        >
          <option value="">--Select Date--</option>
          {weekDates.map(date => (
            <option key={date} value={date}>{date}</option>
          ))}
        </select>
      </label>

      {selectedDate && menuForDay && (
        <div style={{ margin: '1em 0', background: '#f7f7f7', padding: '1em', borderRadius: 8 }}>
          <strong>Menu for {selectedDate}:</strong>
          <ul>
            {mealTypes.map(meal => (
              <li key={meal}>
                <strong>{meal.charAt(0).toUpperCase() + meal.slice(1)}:</strong> {menuForDay[meal]?.join(', ') || 'Not available'}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div>
        <strong>Select Meals:</strong>
        {mealTypes.map(meal => (
          <label key={meal} style={{ display: 'block', margin: '0.5em 0' }}>
            <input
              type="checkbox"
              checked={!!selectedMeals[meal]}
              onChange={() => handleMealChange(meal)}
            />
            {meal.charAt(0).toUpperCase() + meal.slice(1)}
          </label>
        ))}
      </div>

      <button type="submit" style={{ marginTop: '1em' }}>Book Meal(s)</button>
    </form>
  );
};

export default BookingForm;
