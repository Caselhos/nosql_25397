// src/components/MovieList.js
import React, { useEffect, useState } from "react";
import { Grid, Container, CircularProgress } from "@mui/material";
import MovieCard from "../components/MovieCard";
import { fetchMovies } from "../services/api";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const data = await fetchMovies();
        setMovies(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, []);

  if (loading) return <CircularProgress sx={{ m: 4 }} />;

  return (
    <Container sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {movies.map((movie) => (
          <Grid item key={movie._id} xs={12} sm={6} md={4}>
            <MovieCard movie={movie} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default MovieList;
