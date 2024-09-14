// config/passport.js

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');

// Local Strategy for username (email) and password authentication
passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    // Find the user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return done(null, false, { message: 'Invalid credentials.' });
    }

    // Compare the password using bcrypt
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return done(null, false, { message: 'Invalid credentials.' });
    }

    // Authentication successful
    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

// Serialize user ID to the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from the session by ID
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).select('-password'); // Exclude password
    if (!user) {
      return done(new Error('User not found'), null);
    }
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
