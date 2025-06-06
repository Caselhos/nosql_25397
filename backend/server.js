// backend/server.js
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const movieRoutes = require("./routes/movieRoutes");

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const port = process.env.PORT || 3000;

const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use("/api", movieRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
