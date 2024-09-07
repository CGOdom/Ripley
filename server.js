// server.js

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
mongoose.connect('mongodb://localhost:27017/alien_forum', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
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
app.post('/users/login', passport.authenticate('local'), UserController.loginUser);

// User Logout Route
app.post('/users/logout', UserController.logoutUser);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
