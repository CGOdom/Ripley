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

// Enable Mongoose Debug Mode (optional, useful for debugging)
mongoose.set('debug', true);

// MongoDB connection with enhanced TLS options
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tls: true, // Ensure TLS is used
    tlsAllowInvalidCertificates: false, // Validate SSL certificates
    serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
    // Additional options can be added here if needed
  })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((error) => {
    console.error('❌ Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if unable to connect
  });

// Parse allowed origins from environment variables
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim())
  : [];

// Middleware to log incoming request origins (optional, useful for debugging)
app.use((req, res, next) => {
  console.log(`🔍 Incoming request from origin: ${req.headers.origin}`);
  next();
});

// Enable CORS for all routes
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or CURL)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `🚫 The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);

// Handle preflight requests for all routes
app.options('*', cors({
  origin: function (origin, callback) {
    // Allow requests with no origin
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `🚫 The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

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
      ttl: 14 * 24 * 60 * 60, // Sessions expire in 14 days
      autoRemove: 'native', // Let MongoDB handle session removal
    }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Ensure cookies are only sent over HTTPS in production
      sameSite: 'lax', // Adjust sameSite based on your requirements
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

// Endpoint to check if the user is authenticated
app.get('/users/check-auth', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ isAuthenticated: true, user: req.user });
  } else {
    res.json({ isAuthenticated: false });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❗ Unhandled error:', err);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});
