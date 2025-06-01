const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

// Load environment variables
dotenv.config();

// Import routes (add later if needed)
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
require('./config/db')();

// Sample routes
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/api/auth', authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
