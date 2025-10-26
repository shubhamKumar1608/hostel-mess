import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import menuService from '../services/menuService';
import bookingService from '../services/bookingService';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    if (!token || role !== 'student') {
      navigate('/student-login');
      return;
    }

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const menuResponse = await menuService.getMenu();
        const bookingsResponse = await bookingService.getMyBookings();
        
        setMenuItems(menuResponse.data);
        setBookings(bookingsResponse.data);
      } catch (err) {
        setError('Failed to load data. Please try again.');
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleBookMeal = async (item) => {
    if (isBooked(item.id)) {
      setError('You have already booked this meal!');
      setTimeout(() => setError(''), 3000);
      return;
    }

    try {
      const meals = { [item.type]: true };
      const response = await bookingService.createBooking(item.date, meals);
      setBookings(prev => [...prev, response.data]);
      setSuccess('Meal booked successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to book meal. Please try again.');
      setTimeout(() => setError(''), 3000);
    }
  };

  const isBooked = (menuId) => {
    return bookings.some(booking => booking.menuItem?.id === menuId && booking.status === 'confirmed');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Student Dashboard</h1>
      
      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-3 rounded mb-4">{success}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Available Meals</h2>
          <div className="space-y-4">
            {menuItems.map((item) => {
              const alreadyBooked = isBooked(item.id);
              return (
                <div key={item.id} className="border p-4 rounded shadow hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-gray-600">{item.description}</p>
                  <p className="text-sm">Type: <span className="capitalize">{item.type}</span></p>
                  <p className="text-sm">Price: ₹{item.price}</p>
                  <p className="text-sm">Date: {new Date(item.date).toLocaleDateString()}</p>
                  <button
                    onClick={() => handleBookMeal(item)}
                    disabled={alreadyBooked}
                    className={`mt-4 w-full py-2 px-4 rounded font-medium ${
                      alreadyBooked
                        ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    {alreadyBooked ? 'Already Booked' : 'Book Meal'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Your Bookings</h2>
          {bookings.length === 0 ? (
            <p className="text-gray-500">No bookings yet.</p>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="border p-4 rounded shadow">
                  <h3 className="font-bold text-lg">{booking.menuItem.name}</h3>
                  <p className="text-gray-600">{booking.menuItem.description}</p>
                  <p className="text-sm">Type: <span className="capitalize">{booking.menuItem.type}</span></p>
                  <p className="text-sm">Date: {new Date(booking.menuItem.date).toLocaleDateString()}</p>
                  <p className="text-sm mt-2">
                    Booked on: {new Date(booking.bookedAt).toLocaleString()}
                  </p>
                  <p className="text-sm font-medium mt-1">
                    Status: <span className="text-green-600 capitalize">{booking.status}</span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;