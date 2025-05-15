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

// Aggregation/statistics: genre counts and average IMDB rating
exports.getMovieStats = async (req, res) => {
  try {
    const stats = await Movie.aggregate([
      { $unwind: "$genres" },
      {
        $group: {
          _id: "$genres",
          count: { $sum: 1 },
          avgRating: { $avg: { $ifNull: ["$imdb.rating", 0] } }
        }
      },
      { $sort: { count: -1 } }
    ]);
    const overall = await Movie.aggregate([
      {
        $group: {
          _id: null,
          avgImdbRating: { $avg: { $ifNull: ["$imdb.rating", 0] } },
          totalMovies: { $sum: 1 }
        }
      }
    ]);
    res.json({ genreStats: stats, overall: overall[0] });
  } catch (err) {
    res.status(500).json({ error: "Failed to aggregate statistics", details: err.message });
  }
};

// Full-text search
exports.searchMovies = async (req, res) => {
  try {
    const q = req.query.q;
    if (!q) return res.status(400).json({ error: "Missing search query" });
    const movies = await Movie.find(
      { $text: { $search: q } },
      { score: { $meta: "textScore" } }
    )
      .sort({ score: { $meta: "textScore" } })
      .limit(20);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: "Failed to search movies" });
  }
};
