// server.js

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const UserController = require('./controllers/userController');
const MongoStore = require('connect-mongo');
const app = express();

// Import Passport configuration
require('./config/passport');

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// Enable CORS for all routes (adjust origin as needed)
app.use(cors({
  origin: 'http://localhost:3001', // Your front-end origin
  credentials: true, // Allow credentials (cookies) to be sent
}));

// Middleware to parse incoming JSON requests
app.use(express.json());

// Initialize session middleware with MongoDB session store
app.use(session({
  secret: process.env.SESSION_SECRET || 'temp_secret_key', // Use a secure secret key
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: {
    httpOnly: true,
    // secure: true, // Uncomment this when using HTTPS
    maxAge: 1000 * 60 * 60 * 24, // Session expires in 1 day
  },
}));

// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.post('/users/register', UserController.registerUser);

app.post('/users/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error('Authentication error:', err);
      return next(err);
    }
    if (!user) {
      // Authentication failed
      return res.status(401).json({ message: info.message || 'Login failed' });
    }
    // Log the user in
    req.logIn(user, (err) => {
      if (err) {
        console.error('Login error:', err);
        return next(err);
      }
      // Authentication and login successful
      res.json({ message: 'Login successful', user: { id: user._id, email: user.email } });
    });
  })(req, res, next);
});

app.post('/users/logout', UserController.logoutUser);

// Endpoint to check if the user is authenticated
app.get('/users/check-auth', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ isAuthenticated: true });
  } else {
    res.json({ isAuthenticated: false });
  }
});

// Example of a protected route
app.get('/questions', ensureAuthenticated, (req, res) => {
  // Fetch questions from the database
  // res.json(questions);
});

app.get('/questions/:id', ensureAuthenticated, (req, res) => {
  // Fetch question details and send response
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});

// Middleware to check if the user is authenticated
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized access' });
}
