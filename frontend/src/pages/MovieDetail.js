// src/components/MovieDetail.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Typography, Box, Chip, CircularProgress, Paper, Button } from "@mui/material";
import axios from "axios";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/movies/${id}`);
        setMovie(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      try {
        await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/movies/${movie._id}`);
        navigate("/");
      } catch (err) {
        alert("Failed to delete movie");
      }
    }
  };

  if (loading) return <CircularProgress sx={{ m: 4 }} />;
  if (!movie) return <Typography>Movie not found.</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {movie.title} ({movie.year})
      </Typography>
      <Box component="img" src={movie.poster} alt={movie.title} sx={{ width: 300, mb: 2 }} />
      <Box sx={{ mb: 2 }}>
        {movie.genres && movie.genres.map((genre, idx) => (
          <Chip key={idx} label={genre} sx={{ mr: 1 }} />
        ))}
      </Box>
      <Box sx={{ mb: 2 }}>
        <Button variant="outlined" sx={{ mr: 2 }} onClick={() => navigate(`/edit/${movie._id}`)}>
          Edit
        </Button>
        <Button variant="contained" color="error" onClick={handleDelete}>
          Delete
        </Button>
      </Box>
      {movie.plot && (
        <Paper sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle1" gutterBottom>Plot</Typography>
          <Typography variant="body1">{movie.plot}</Typography>
        </Paper>
      )}
      {movie.imdb && (
        <Typography variant="body2" sx={{ mb: 1 }}>
          <strong>IMDB Rating:</strong> {movie.imdb.rating} ({movie.imdb.votes} votes)
        </Typography>
      )}
      {/* Add more fields as needed, e.g. directors, cast, etc. */}
      <Typography variant="caption" color="text.secondary">
        MongoDB _id: {movie._id}
      </Typography>
    </Container>
  );
};

export default MovieDetail;
