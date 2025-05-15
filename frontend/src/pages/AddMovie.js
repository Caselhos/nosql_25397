import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Box, Typography } from "@mui/material";
import axios from "axios";

const AddMovie = () => {
  const [form, setForm] = useState({
    title: "",
    year: "",
    poster: "",
    genres: "",
    plot: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/movies`, {
        ...form,
        year: Number(form.year),
        genres: form.genres.split(",").map((g) => g.trim()),
      });
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add movie");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>Add New Movie</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField label="Title" name="title" value={form.title} onChange={handleChange} required />
        <TextField label="Year" name="year" value={form.year} onChange={handleChange} required type="number" />
        <TextField label="Poster URL" name="poster" value={form.poster} onChange={handleChange} />
        <TextField label="Genres (comma separated)" name="genres" value={form.genres} onChange={handleChange} />
        <TextField label="Plot" name="plot" value={form.plot} onChange={handleChange} multiline rows={3} />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained">Add Movie</Button>
      </Box>
    </Container>
  );
};

export default AddMovie;