const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Menu = require('../models/Menu');
require('dotenv').config();

const connectDB = require('../config/db');

const createDummyData = async () => {
  try {
    await connectDB();
    
    // Clear existing data
    await User.deleteMany({});
    await Menu.deleteMany({});
    console.log('Cleared existing data');

    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    await User.create({
      name: 'Admin User',
      email: 'admin@hostel.com',
      password: adminPassword,
      role: 'admin'
    });
    console.log('Admin user created');

    // Create student users
    const studentPassword = await bcrypt.hash('student123', 10);
    await User.create([
      {
        name: 'John Student',
        email: 'john@student.com',
        password: studentPassword,
        role: 'student'
      },
      {
        name: 'Jane Student',
        email: 'jane@student.com',
        password: studentPassword,
        role: 'student'
      }
    ]);
    console.log('Student users created');

    // Create menu items for the next 7 days
    const today = new Date();
    const menuItems = [];

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      menuItems.push({
        date,
        breakfast: ['Bread', 'Eggs', 'Milk', 'Banana'],
        lunch: ['Rice', 'Dal', 'Mixed Vegetables', 'Curd'],
        snacks: ['Tea', 'Biscuits', 'Samosa'],
        dinner: ['Roti', 'Rice', 'Dal', 'Paneer Curry']
      });
    }

    await Menu.create(menuItems);
    console.log('Menu items created');

    console.log('\nDummy data created successfully!');
    console.log('\nAdmin login:');
    console.log('Email: admin@hostel.com');
    console.log('Password: admin123');
    console.log('\nStudent login:');
    console.log('Email: john@student.com');
    console.log('Password: student123');

    process.exit(0);
  } catch (err) {
    console.error('Error creating dummy data:', err);
    process.exit(1);
  }
};

createDummyData();