const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  // Get the token from the "Authorization" header: "Bearer <token>"
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  // Split the header to get the token part
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token found, authorization denied' });
  }

  try {
    // Verify token using secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user ID from token payload to request object
    req.user = { userId: decoded.userId };
    req.userId = decoded.userId;

    // Proceed to next middleware or route handler
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
}

module.exports = authMiddleware;
