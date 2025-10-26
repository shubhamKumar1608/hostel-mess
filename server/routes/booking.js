const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Menu = require('../models/Menu');
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');

// Create a new booking
router.post('/', auth, async (req, res) => {
  try {
    const { menuId } = req.body;

    if (!menuId) {
      return res.status(400).json({ message: 'Please provide menu selection' });
    }

    // Check if menu exists and has available slots
    const menu = await Menu.findById(menuId);
    if (!menu) {
      return res.status(404).json({ message: 'Menu not found' });
    }

    // Count existing bookings
    const bookingCount = await Booking.countDocuments({ menu: menuId });
    if (bookingCount >= menu.maxBookings) {
      return res.status(400).json({ message: 'No more bookings available for this meal' });
    }

    const booking = new Booking({
      user: req.user.id,
      menu: menuId,
      status: 'confirmed'
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all bookings of the logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('menu')
      .sort({ 'menu.date': -1 });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin route to get all bookings
router.get('/all', [auth, admin], async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email')
      .populate('menu')
      .sort({ 'menu.date': -1 });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

