// src/components/MovieDetail.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Box, Chip, CircularProgress } from "@mui/material";
import axios from "axios";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/${id}`);
        setMovie(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <CircularProgress sx={{ m: 4 }} />;

  if (!movie) return <Typography>Movie not found.</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {movie.title} ({movie.year})
      </Typography>
      <Box component="img" src={movie.poster} alt={movie.title} sx={{ width: 300, mb: 2 }} />
      <Box sx={{ mb: 2 }}>
        {movie.genres.map((genre, idx) => (
          <Chip key={idx} label={genre} sx={{ mr: 1 }} />
        ))}
      </Box>
      <Typography variant="body1">
        {/* You can expand this later with description, cast, etc. */}
        More details coming soon!
      </Typography>
    </Container>
  );
};

export default MovieDetail;
