const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'student'], default: 'student' },
  createdAt: { type: Date, default: Date.now }
}, {
  methods: {
    isAdmin() {
      return this.role === 'admin';
    }
  }
});

module.exports = mongoose.model('User', UserSchema);
