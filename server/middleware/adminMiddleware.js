const isAdmin = async (req, res, next) => {
  try {
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Access denied. Admin privileges required.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = isAdmin;