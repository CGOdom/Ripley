// server.js

const express = require('express');
const cors = require('cors'); // Import the CORS middleware

const app = express();

// Enable CORS for all routes and allow requests from http://localhost:3001
app.use(cors({
  origin: 'http://localhost:3001', // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}));

// Middleware to parse incoming JSON requests
app.use(express.json());

// Example User Registration Route
app.post('/users/register', (req, res) => {
  const { username, email, password } = req.body;

  // Registration logic (replace this with your actual implementation)
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please provide all required fields.' });
  }

  // Simulate user registration success
  return res.status(201).json({ message: 'User registered successfully!' });
});

// Example Login Route
app.post('/users/login', (req, res) => {
  const { email, password } = req.body;

  // Authentication logic (replace this with your actual implementation)
  if (email === 'test@example.com' && password === 'password123') {
    // Simulate successful login
    return res.status(200).json({ token: 'example.jwt.token' });
  }

  return res.status(401).json({ message: 'Invalid email or password.' });
});

// Additional routes and API endpoints can be defined here

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
