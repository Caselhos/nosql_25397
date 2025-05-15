// routes/movieRoutes.js
const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");

// Route: GET /api/movies?page=1&limit=10
router.get("/movies", movieController.getMovies);
router.get("/movies/:id", movieController.getMovieById); 
router.post("/movies", movieController.createMovie);
router.put("/movies/:id", movieController.updateMovie);
router.delete("/movies/:id", movieController.deleteMovie);
router.get("/movies/search", movieController.searchMovies);
router.get("/movies/stats", movieController.getMovieStats);

module.exports = router;
