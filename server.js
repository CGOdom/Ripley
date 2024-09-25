// server.js

require('dotenv').config();

// Add console logs to verify that variables are loaded
console.log('Environment Variables:');
console.log('MONGO_URI:', process.env.MONGO_URI ? 'Loaded' : 'Not Loaded');
console.log('SESSION_SECRET:', process.env.SESSION_SECRET ? 'Loaded' : 'Not Loaded');
console.log('ALLOWED_ORIGINS:', process.env.ALLOWED_ORIGINS);
console.log('NODE_ENV:', process.env.NODE_ENV);

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');

// Import Passport configuration
require('./config/passport');

// Import Routes
const userRoutes = require('./routes/userRoutes');
const questionRoutes = require('./routes/questionRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const answerRoutes = require('./routes/answerRoutes');
const commentRoutes = require('./routes/commentRoutes'); // Import comment routes

const app = express();

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Error connecting to MongoDB:', error));

// CORS Configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',')
  : ['http://localhost:3000'];

app.use(
  cors({
    origin: allowedOrigins, // Allow multiple origins
    credentials: true, // Allow credentials (cookies) to be sent
  })
);

// Middleware to parse incoming JSON requests
app.use(express.json());

// Initialize session middleware with MongoDB session store
const isProduction = process.env.NODE_ENV === 'production';

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'temp_secret_key', // Use a secure secret key in production
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      collectionName: 'sessions',
    }),
    cookie: {
      httpOnly: true,
      secure: isProduction, // true in production, false in development
      sameSite: isProduction ? 'none' : 'lax', // 'none' in production, 'lax' in development
      maxAge: 1000 * 60 * 60 * 24, // Session expires in 1 day
    },
  })
);

// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Mount Routes
app.use('/users', userRoutes);
app.use('/questions', questionRoutes);
app.use('/categories', categoryRoutes);
app.use('/answers', answerRoutes);
app.use('/comments', commentRoutes); // Mount comment routes

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
const PORT = process.env.PORT || 3001; // Changed port to 3001 for backend
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
