require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Menu = require('../models/Menu');
const Booking = require('../models/Booking');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding...');
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Menu.deleteMany({});
    await Booking.deleteMany({});

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: adminPassword,
      role: 'admin'
    });

    // Create student users
    const studentPassword = await bcrypt.hash('student123', 10);
    const student1 = await User.create({
      name: 'John Student',
      email: 'john@example.com',
      password: studentPassword,
      role: 'student'
    });

    const student2 = await User.create({
      name: 'Jane Student',
      email: 'jane@example.com',
      password: studentPassword,
      role: 'student'
    });

    // Create menu items
    const menu1 = await Menu.create({
      name: 'Monday Special',
      description: 'Rice, Dal, Vegetables, Chapati',
      type: 'lunch',
      price: 50,
      date: new Date(2025, 9, 28), // October 28, 2025
      maxBookings: 100
    });

    const menu2 = await Menu.create({
      name: 'Tuesday Special',
      description: 'Pulao, Curry, Salad, Chapati',
      type: 'dinner',
      price: 60,
      date: new Date(2025, 9, 29), // October 29, 2025
      maxBookings: 100
    });

    // Create some bookings
    await Booking.create({
      user: student1._id,
      menu: menu1._id,
      status: 'confirmed'
    });

    await Booking.create({
      user: student2._id,
      menu: menu2._id,
      status: 'confirmed'
    });

    console.log('Data seeded successfully!');
    console.log('\nAdmin credentials:');
    console.log('Email: admin@example.com');
    console.log('Password: admin123');
    console.log('\nStudent credentials:');
    console.log('Email: john@example.com');
    console.log('Password: student123');

  } catch (err) {
    console.error('Error seeding data:', err);
  } finally {
    mongoose.disconnect();
  }
};

connectDB().then(() => {
  seedData();
});