const mongoose = require('mongoose');

const MenuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  type: { type: String, enum: ['breakfast', 'lunch', 'dinner'], required: true },
  price: { type: Number, required: true },
  date: { type: Date, required: true },
  maxBookings: { type: Number, default: 100 }
});

module.exports = mongoose.model('Menu', MenuSchema);
