const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const connectToDB = require('./config/dbConfig');
const PORT = 6205;
const cors = require("cors");
require("dotenv").config();

// DB connection w/ mongoose
connectToDB();

// Setup
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV !== "production") {
	const morgan = require("morgan");
	app.use(morgan("dev"));
}

// Serve static files
app.use('/', express.static('dist'));

// Routes
app.use("/api/health", require("./routes/health"));
app.use("/api/classes", require("./routes/classes"));
app.use("/api/schedules", require("./routes/schedules"));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));
app.use("/api/distance", require("./routes/distance"));

if (process.env.NODE_ENV !== "production") {
  // Log routes for testing purposes
  console.log('Routes configured:');
  app._router.stack.forEach((r) => {
    if (r.route && r.route.path) {
      console.log(r.route.path);
    }
  });
}

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB.');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));
});
