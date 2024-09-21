// server.js

require('dotenv').config();

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
const allowedOrigin = process.env.FRONTEND_ORIGIN || 'https://cgodom.github.io';

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true, // Allow credentials (cookies) to be sent
  })
);

// Middleware to parse incoming JSON requests
app.use(express.json());

// Initialize session middleware with MongoDB session store
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
      secure: process.env.NODE_ENV === 'production', // Enable in production (HTTPS)
      sameSite: 'lax', // 'lax' is generally a good balance between security and usability
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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
