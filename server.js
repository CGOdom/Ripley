require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((err) => console.error('Failed to connect to MongoDB Atlas', err));

app.get('/', (req, res) => {
    res.send('Alien Forum API is running');
});