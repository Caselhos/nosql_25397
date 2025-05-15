// server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const movieRoutes = require("./routes/movieRoutes");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Routes
app.use("/api", movieRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Connected to MongoDB");
  app.listen(port, () => console.log(`Server running on port ${port}`));
})
.catch(err => {
  console.error("MongoDB connection error:", err);
});
