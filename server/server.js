const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));
app.use(express.json());

// In-memory storage
const db = {
  users: [
    { id: 1, email: 'admin@hostel.com', password: 'admin123', role: 'admin' },
    { id: 2, email: 'student1@hostel.com', password: 'student123', role: 'student' },
    { id: 3, email: 'student2@hostel.com', password: 'student123', role: 'student' }
  ],
  menu: [],
  bookings: []
};

// Simulate localStorage sync - helper to persist data
app.use((req, res, next) => {
  // Load data from file or keep in memory
  next();
});

// Auth routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = db.users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  res.json({
    token: `token-${user.id}`,
    role: user.role,
    userId: user.id,
    email: user.email
  });
});

// Menu routes
app.get('/api/menu', (req, res) => {
  res.json(db.menu);
});

app.get('/api/menu/:date', (req, res) => {
  const { date } = req.params;
  const menuItems = db.menu.filter(item => item.date === date);
  if (menuItems.length === 0) {
    return res.json({});
  }
  res.json(menuItems[0]);
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
app.get('/api/bookings', (req, res) => {
  const userId = parseInt(req.headers['user-id'] || '1');
  const userBookings = db.bookings.filter(b => b.userId === userId);
  res.json(userBookings);
});

app.post('/api/bookings', (req, res) => {
  const userId = parseInt(req.headers['user-id'] || '1');
  const { date, meals } = req.body;
  
  const newBooking = {
    id: db.bookings.length + 1,
    userId,
    date,
    meals,
    status: 'confirmed',
    createdAt: new Date().toISOString(),
    menuItem: { name: 'Custom Booking', type: Object.keys(meals).filter(m => meals[m]).join(', ') }
  };

  db.bookings.push(newBooking);
  res.status(201).json(newBooking);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

