import API from '../api';

const getBookings = () => API.get('/bookings');
const createBooking = (date, meals) => API.post('/bookings', { date, meals });
const getMyBookings = () => API.get('/bookings');

export default {
  getBookings,
  createBooking,
  getMyBookings
};

