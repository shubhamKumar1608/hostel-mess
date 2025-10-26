// components/BookingForm.js
import React, { useState, useEffect } from 'react';
import API from '../api';

const mealTypes = ['breakfast', 'lunch', 'snacks', 'dinner'];

const BookingForm = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedMeals, setSelectedMeals] = useState({
    breakfast: false,
    lunch: false,
    snacks: false,
    dinner: false
  });
  const [menuForDay, setMenuForDay] = useState(null);
  const [loading, setLoading] = useState(false);

  // Allow booking for up to 7 days from today
  const today = new Date();
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d.toISOString().split('T')[0];
  });

  useEffect(() => {
    const fetchMenuForDate = async () => {
      if (!selectedDate) {
        setMenuForDay(null);
        return;
      }
      
      try {
        setLoading(true);
        const response = await API.get(`/menu/${selectedDate}`);
        setMenuForDay(response.data);
      } catch (err) {
        console.error('Failed to fetch menu:', err);
        setMenuForDay(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuForDate();
  }, [selectedDate]);

  const handleMealChange = (meal) => {
    setSelectedMeals(prev => ({
      ...prev,
      [meal]: !prev[meal]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDate || !Object.values(selectedMeals).some(Boolean)) {
      alert('Please select a date and at least one meal.');
      return;
    }
    
    try {
      setLoading(true);
      await API.post('/bookings', {
        date: selectedDate,
        meals: selectedMeals,
        messType: 'main' // default mess type
      });
      
      alert('Booking created successfully!');
      setSelectedDate('');
      setSelectedMeals({
        breakfast: false,
        lunch: false,
        snacks: false,
        dinner: false
      });
    } catch (err) {
      console.error('Booking error:', err);
      alert(err?.response?.data?.message || 'Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="booking-form">
      <div className="form-group">
        <label>
          Select Date:
          <select
            value={selectedDate}
            onChange={e => setSelectedDate(e.target.value)}
            required
            disabled={loading}
          >
            <option value="">--Select Date--</option>
            {weekDates.map(date => (
              <option key={date} value={date}>
                {new Date(date).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric'
                })}
              </option>
            ))}
          </select>
        </label>
      </div>

      {loading && (
        <div className="loading">Loading...</div>
      )}

      {selectedDate && menuForDay && (
        <div className="menu-card">
          <h3>Menu for {new Date(selectedDate).toLocaleDateString()}</h3>
          <div className="menu-grid">
            {mealTypes.map(meal => (
              <div key={meal} className="menu-item">
                <h4>{meal.charAt(0).toUpperCase() + meal.slice(1)}</h4>
                <p>{menuForDay[meal]?.join(', ') || 'Not available'}</p>
                <label className="meal-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedMeals[meal]}
                    onChange={() => handleMealChange(meal)}
                    disabled={loading}
                  />
                  Book this meal
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      <button 
        type="submit" 
        className="submit-button"
        disabled={loading || !selectedDate || !Object.values(selectedMeals).some(Boolean)}
      >
        {loading ? 'Booking...' : 'Book Selected Meals'}
      </button>
    </form>
  );
};

export default BookingForm;
