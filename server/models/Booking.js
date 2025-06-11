const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: Date,
  meals: {
    breakfast: Boolean,
    lunch: Boolean,
    snacks: Boolean,
    dinner: Boolean,
  }
});
module.exports = mongoose.model('Booking', bookingSchema);

