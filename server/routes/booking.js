const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const authMiddleware = require('../middleware/auth'); // assuming you have auth middleware to verify JWT

// Create a new booking
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { messType, date, mealType } = req.body;

    if (!messType || !date || !mealType) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const booking = new Booking({
      user: req.useB.userId, // userId from auth middleware
      messType,
      date,
      mealType
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all bookings of the logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.userId }).sort({ date: -1 });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

