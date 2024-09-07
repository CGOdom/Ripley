// controllers/userController.js

const User = require('../models/User'); // Ensure correct path
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Controller to register a new user
const registerUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      console.error('User already exists:', email);
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({ username, password: hashedPassword, email: email.toLowerCase() });
    await user.save();

    console.log('User registered successfully:', user.email);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user', error });
  }
};

// Controller to handle login response after Passport authentication
const loginUser = (req, res) => {
  try {
    console.log('User after passport authentication:', req.user);

    // Generate JWT after successful authentication by Passport
    const token = jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful!', token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Error logging in user', error });
  }
};

// Controller to logout a user
const logoutUser = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Error during logout:', err);
      return res.status(500).json({ message: 'Error logging out.' });
    }
    res.status(200).json({ message: 'Logout successful!' });
  });
};

module.exports = { registerUser, loginUser, logoutUser };
