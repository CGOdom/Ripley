// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser } = require('../controllers/userController');
const { ensureAuthenticated } = require('../middleware/authMiddleware'); // Import auth middleware

// User registration route
router.post('/register', registerUser);

// User login route
router.post('/login', loginUser);

// User logout route
router.post('/logout', ensureAuthenticated, logoutUser); // Ensure user is authenticated to logout

module.exports = router;
