const mongoose = require('mongoose');

const connectDB = () => {
  const options = {
    serverSelectionTimeoutMS: 5000 // 5 second timeout
  };
  
  return mongoose.connect(process.env.MONGO_URI, options)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => {
      console.error('MongoDB connection error:', err.message);
      // Instead of exiting, we'll retry the connection
      console.log('Retrying connection in 5 seconds...');
      setTimeout(connectDB, 5000);
    });
};

module.exports = connectDB;
