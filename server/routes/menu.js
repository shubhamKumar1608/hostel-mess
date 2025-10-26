const express = require('express');
const router = express.Router();
const Menu = require('../models/Menu');
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');

// Get menus (optionally for a date)
router.get('/', async (req, res) => {
  try {
    const menus = await Menu.find().sort({ date: 1 });
    res.json(menus);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get menu for a specific date
router.get('/:date', async (req, res) => {
  try {
    const date = new Date(req.params.date);
    const menu = await Menu.findOne({ date });
    if (!menu) return res.status(404).json({ message: 'Menu not found for this date' });
    res.json(menu);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin Routes
router.post('/', [auth, admin], async (req, res) => {
  try {
    const { name, description, type, price, date, maxBookings } = req.body;
    const menu = new Menu({
      name,
      description,
      type,
      price,
      date: new Date(date),
      maxBookings
    });
    await menu.save();
    res.json(menu);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', [auth, admin], async (req, res) => {
  try {
    const menu = await Menu.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!menu) return res.status(404).json({ message: 'Menu not found' });
    res.json(menu);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', [auth, admin], async (req, res) => {
  try {
    const menu = await Menu.findByIdAndDelete(req.params.id);
    if (!menu) return res.status(404).json({ message: 'Menu not found' });
    res.json({ message: 'Menu deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
