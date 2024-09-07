const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User'); // Correct the path to import the User model

// Passport local strategy for handling login
passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return done(null, false, { message: 'Invalid email or password.' });
    }

    // Compare the password using bcrypt
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return done(null, false, { message: 'Invalid email or password.' });
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

// Serialize user ID for the session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from the session by ID
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
