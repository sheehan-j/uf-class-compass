const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const connectToDB = require('./config/dbConfig');
const PORT = 6205;
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const userRoutes = require('./routes/user.js');
const authRoutes = require('./routes/auth.js');

// DB connection w/ mongoose
connectToDB();

// Setup
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);

// Serve static files
app.use('/', express.static('dist'));

// Routes
app.use('/api/health', require('./routes/health'));
app.use('/api/classes', require('./routes/classes'));

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB.');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));
});

// Log routes for testing purposes
console.log('Routes configured:');
app._router.stack.forEach((r) => {
  if (r.route && r.route.path) {
    console.log(r.route.path);
  }
});
