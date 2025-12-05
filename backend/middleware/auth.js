const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET || 'yourSecretKey';

function authMiddleware(req, res, next) {
  const authHeader = req.header('Authorization');
  if (!authHeader) return res.status(401).json({ msg: 'No token, authorization denied' });

  const token = authHeader.replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
}

function adminMiddleware(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Access denied: Admins only' });
  }
  next();
}

module.exports = { authMiddleware, adminMiddleware };