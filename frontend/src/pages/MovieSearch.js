import React, { useState } from "react";
import { TextField, Button, Grid, CircularProgress, Container, Typography, Pagination, Box } from "@mui/material";
import MovieCard from "../components/MovieCard";
import axios from "axios";

const MovieSearch = () => {
  const [q, setQ] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleSearch = async (e, pageNum = 1) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/api/movies/search?q=${encodeURIComponent(q)}&page=${pageNum}&limit=10`
      );
      setResults(res.data.data);
      setTotalPages(res.data.totalPages);
      setPage(res.data.currentPage);
    } catch {
      setResults([]);
      setTotalPages(1);
    }
    setLoading(false);
  };

  const handlePageChange = (event, value) => {
    handleSearch(null, value);
  };

  return (
    <Container>
      <form onSubmit={handleSearch} style={{ marginBottom: 24 }}>
        <TextField
          label="Search movies"
          value={q}
          onChange={e => setQ(e.target.value)}
          sx={{ mr: 2, width: 300 }}
        />
        <Button type="submit" variant="contained">Search</Button>
      </form>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Grid container spacing={4}>
            {results.map(movie => (
              <Grid item key={movie._id} xs={12} sm={6} md={4}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
            {results.length === 0 && <Typography>No results.</Typography>}
          </Grid>
          {totalPages > 1 && (
            <Box display="flex" justifyContent="center" mt={4}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
};

export default MovieSearch;