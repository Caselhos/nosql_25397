// controllers/movieController.js
const Movie = require("../models/Movie");

// Get all movies with pagination
exports.getMovies = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const movies = await Movie.find()
      .select("_id title year poster genres")
      .skip(skip)
      .limit(limit)
      .sort({ year: -1 });

    const count = await Movie.countDocuments();

    res.json({
      data: movies,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalMovies: count
    });
  } catch (err) {
    console.error("Error fetching movies:", err);
    res.status(500).json({ error: "Server error while fetching movies" });
  }
};

exports.getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ error: "Movie not found" });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: "Server error while fetching movie" });
  }
};

// Create a new movie
exports.createMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json(movie);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a movie
exports.updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!movie) return res.status(404).json({ error: "Movie not found" });
    res.json(movie);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a movie
exports.deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).json({ error: "Movie not found" });
    res.json({ message: "Movie deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
