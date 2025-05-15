const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  poster: String,
  genres: [String],
  plot: String,
  imdb: {
    rating: Number,
    votes: Number,
    id: Number,
  },
  // ...other fields as needed
});

module.exports = mongoose.model("Movie", movieSchema, "movies");