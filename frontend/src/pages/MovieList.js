// src/components/MovieList.js
import React, { useEffect, useState } from "react";
import { Grid, Container, CircularProgress, Pagination, Box } from "@mui/material";
import MovieCard from "../components/MovieCard";
import { fetchMovies } from "../services/api";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadMovies = async (pageNum = 1) => {
    setLoading(true);
    try {
      const data = await fetchMovies(pageNum, 10);
      setMovies(data.data);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies(page);
    // eslint-disable-next-line
  }, [page]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

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
      <Box display="flex" justifyContent="center" mt={4}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Container>
  );
};

export default MovieList;
