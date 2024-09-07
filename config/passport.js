// config/passport.js

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Ensure correct path and model name

// Passport local strategy for handling login
passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      console.error('User not found:', email);
      return done(null, false, { message: 'Invalid email or password.' });
    }

    // Compare the password using bcrypt
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      console.error('Password does not match for user:', email);
      return done(null, false, { message: 'Invalid email or password.' });
    }

    console.log('User authenticated successfully:', user.email);
    return done(null, user);
  } catch (error) {
    console.error('Error in authentication:', error);
    return done(error);
  }
}));

// Serialize user ID for the session
passport.serializeUser((user, done) => {
  console.log('Serializing user:', user.id);
  done(null, user.id);
});

// Deserialize user from the session by ID
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    console.log('Deserialized user:', user.id);
    done(null, user);
  } catch (error) {
    console.error('Error deserializing user:', error);
    done(error);
  }
});
