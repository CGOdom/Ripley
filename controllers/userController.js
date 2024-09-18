// controllers/userController.js

const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');

// Controller to register a new user
const registerUser = async (req, res) => {
  // ... existing code remains unchanged
};

// Controller to log in a user using Passport's local strategy
const loginUser = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error('Error during authentication:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
    if (!user) {
      console.error('Authentication failed:', info.message);
      return res.status(401).json({ message: info.message || 'Authentication failed' });
    }
    req.logIn(user, (err) => {
      if (err) {
        console.error('Error logging in user:', err);
        return res.status(500).json({ message: 'Error logging in user' });
      }
      console.log('User logged in successfully:', user.email);
      // Return user data
      return res.status(200).json({
        message: 'Login successful',
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
        },
      });
    });
  })(req, res, next);
};

// Controller to log out a user
const logoutUser = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Error during logout:', err);
      return res.status(500).json({ message: 'Error logging out.' });
    }
    res.status(200).json({ message: 'Logout successful!' });
  });
};

// Controller to get the current authenticated user
const getCurrentUser = (req, res) => {
  if (req.isAuthenticated() && req.user) {
    res.status(200).json({
      user: {
        _id: req.user._id,
        username: req.user.username,
        email: req.user.email,
      },
    });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
};

// Export all controller functions
module.exports = { registerUser, loginUser, logoutUser, getCurrentUser };
