const jwt = require('jsonwebtoken');
const config = require('../../configs/config.json')
// Middleware to check for token expiration
const checkTokenExpiration = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided', isValidToken:false });
  }

  try {
    const decoded = jwt.verify(token, config.jwt.secret_key);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(401).json({ message: 'Invalid token', isValidToken:false });
  }
};

module.exports = checkTokenExpiration;
