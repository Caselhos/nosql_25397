// routes/movieRoutes.js
const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");

// Route: GET /api/movies?page=1&limit=10
router.get("/movies", movieController.getMovies);
router.get("/movies/:id", movieController.getMovieById); 

module.exports = router;
