require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const UserController = require('./controllers/userController'); // Import UserController

const app = express();

// Import custom middleware and configuration
require('./config/passport'); // Import Passport configuration

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }) // Ensure options are provided for backward compatibility
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Middleware to parse incoming JSON requests
app.use(express.json());

// Initialize session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret_key', // Replace with a secure key for production
  resave: false,
  saveUninitialized: false,
}));

// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// User Registration Route
app.post('/users/register', UserController.registerUser);

// User Login Route (uses Passport local strategy)
app.post('/users/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: 'Error during authentication.', error: err });
    }
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error during login.', error: err });
      }
      return UserController.loginUser(req, res); // Delegate to controller for JWT generation
    });
  })(req, res, next);
});

// User Logout Route
app.post('/users/logout', UserController.logoutUser);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
