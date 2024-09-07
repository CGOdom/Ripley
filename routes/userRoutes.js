// routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');

// User registration route
router.post('/register', registerUser);

// User login route
router.post('/login', loginUser);

module.exports = router;
