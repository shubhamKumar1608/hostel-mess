require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db'); // your Mongo connection logic
const app = express();
const cors = require('cors');

// Connect to database
connectDB();
app.use(cors()); 
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/bookings', require('./routes/booking'));



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

