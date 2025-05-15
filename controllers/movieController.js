// controllers/movieController.js
const Movie = require("../models/Movie");

// Get all movies with pagination
exports.getMovies = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const movies = await Movie.find()
      .select("title year poster genres")
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
