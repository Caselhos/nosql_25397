import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, TextField, Button, Box, Typography, CircularProgress } from "@mui/material";
import axios from "axios";

const EditMovie = () => {
  const { id } = useParams();
  const [form, setForm] = useState({
    title: "",
    year: "",
    poster: "",
    genres: "",
    plot: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/movies/${id}`);
        setForm({
          title: res.data.title || "",
          year: res.data.year || "",
          poster: res.data.poster || "",
          genres: (res.data.genres || []).join(", "),
          plot: res.data.plot || "",
        });
      } catch (err) {
        setError("Failed to load movie");
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/movies/${id}`, {
        ...form,
        year: Number(form.year),
        genres: form.genres.split(",").map((g) => g.trim()),
      });
      navigate(`/movies/${id}`);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update movie");
    }
  };

  if (loading) return <CircularProgress sx={{ m: 4 }} />;

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>Edit Movie</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField label="Title" name="title" value={form.title} onChange={handleChange} required />
        <TextField label="Year" name="year" value={form.year} onChange={handleChange} required type="number" />
        <TextField label="Poster URL" name="poster" value={form.poster} onChange={handleChange} />
        <TextField label="Genres (comma separated)" name="genres" value={form.genres} onChange={handleChange} />
        <TextField label="Plot" name="plot" value={form.plot} onChange={handleChange} multiline rows={3} />
        {error && <Typography color="error">{error}</Typography>}
        <Button type="submit" variant="contained">Update Movie</Button>
      </Box>
    </Container>
  );
};

export default EditMovie;