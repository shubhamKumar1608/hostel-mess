const express = require('express');
const router = express.Router();
const Menu = require('../models/Menu');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const isAdmin = require('../middleware/adminMiddleware');

// Get all users (admin only)
router.get('/users', authMiddleware, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add menu for a date
router.post('/menu', authMiddleware, isAdmin, async (req, res) => {
  try {
    const { date, breakfast, lunch, snacks, dinner } = req.body;

    let menu = await Menu.findOne({ date: new Date(date) });
    if (menu) {
      menu.breakfast = breakfast;
      menu.lunch = lunch;
      menu.snacks = snacks;
      menu.dinner = dinner;
      await menu.save();
    } else {
      menu = new Menu({
        date: new Date(date),
        breakfast,
        lunch,
        snacks,
        dinner
      });
      await menu.save();
    }

    res.status(201).json(menu);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete menu for a date
router.delete('/menu/:date', authMiddleware, isAdmin, async (req, res) => {
  try {
    const menu = await Menu.findOneAndDelete({ date: new Date(req.params.date) });
    if (!menu) {
      return res.status(404).json({ message: 'Menu not found' });
    }
    res.json({ message: 'Menu deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get booking statistics
router.get('/stats', authMiddleware, isAdmin, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const stats = {
      totalUsers: await User.countDocuments({ role: 'student' }),
      todayBookings: await Booking.countDocuments({
        date: { $gte: today, $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) }
      }),
      totalBookings: await Booking.countDocuments()
    };

    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;