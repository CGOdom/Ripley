// controllers/userController.js

const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport'); // Import Passport

// Controller to register a new user
const registerUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Validate inputs (additional server-side validation)
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      console.error('User already exists:', email);
      return res.status(409).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
    });
    await user.save();

    console.log('User registered successfully:', user.email);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
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
      return res.status(200).json({ message: 'Login successful', user });
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

// Export all controller functions
module.exports = { registerUser, loginUser, logoutUser };
