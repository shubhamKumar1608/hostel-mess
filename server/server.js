const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage
const db = {
  users: [
    { id: 1, email: 'admin@example.com', password: 'admin123', role: 'admin' },
    { id: 2, email: 'student@example.com', password: 'student123', role: 'student' }
  ],
  menu: [
    {
      id: 1,
      name: 'Monday Special',
      description: 'Rice, Dal, Vegetables',
      type: 'lunch',
      price: 50,
      date: '2025-10-28'
    }
  ],
  bookings: []
};

// Auth routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = db.users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.json({
    token: 'dummy-token',
    user: {
      id: user.id,
      email: user.email,
      role: user.role
    }
  });
});

// Menu routes
app.get('/api/menu', (req, res) => {
  res.json(db.menu);
});

app.get('/api/menu/today', (req, res) => {
  const today = new Date().toISOString().split('T')[0];
  const todayMenu = db.menu.filter(item => item.date === today);
  res.json(todayMenu);
});

app.post('/api/menu', (req, res) => {
  const newMenuItem = {
    id: db.menu.length + 1,
    ...req.body
  };
  db.menu.push(newMenuItem);
  res.status(201).json(newMenuItem);
});

app.delete('/api/menu/:id', (req, res) => {
  const id = parseInt(req.params.id);
  db.menu = db.menu.filter(item => item.id !== id);
  res.json({ message: 'Menu item deleted' });
});

// Booking routes
app.get('/api/booking/my-bookings', (req, res) => {
  const userId = parseInt(req.headers['user-id']); // In a real app, get this from JWT
  const userBookings = db.bookings.filter(b => b.userId === userId);
  res.json(userBookings);
});

app.post('/api/booking', (req, res) => {
  const userId = parseInt(req.headers['user-id']); // In a real app, get this from JWT
  const menuItem = db.menu.find(m => m.id === parseInt(req.body.menuId));
  
  if (!menuItem) {
    return res.status(404).json({ message: 'Menu item not found' });
  }

  const newBooking = {
    id: db.bookings.length + 1,
    userId,
    menuItem,
    status: 'confirmed',
    createdAt: new Date().toISOString()
  };

  db.bookings.push(newBooking);
  res.status(201).json(newBooking);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

