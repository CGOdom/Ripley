// middleware/authMiddleware.js

module.exports = {
    // Middleware to ensure the user is authenticated
    ensureAuthenticated: (req, res, next) => {
      if (req.isAuthenticated()) {
        return next();
      }
      res.status(401).json({ message: 'Unauthorized access' });
    },
  
    // Optional: Middleware to ensure the user has admin privileges
    ensureAdmin: (req, res, next) => {
      if (req.isAuthenticated() && req.user.role === 'admin') { // Assumes `role` field exists in User model
        return next();
      }
      res.status(403).json({ message: 'Forbidden: Admins only' });
    },
  };
  