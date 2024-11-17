import jwt from 'jsonwebtoken';

export const authenticateUser = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(403).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.userId = decoded.id; // Attach user ID to request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Invalid token:', error);
    return res.status(401).json({ message: 'Invalid token.' });
  }
};

export default authenticateUser;
