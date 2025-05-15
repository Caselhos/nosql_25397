// components/MovieCard.js
import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  CardActions,
  Chip,
  Box
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();

  const handleMovieClick = () => {
    navigate(`/movies/${movie._id}`);
  };

  // Default poster if none is available
  const posterUrl = movie.poster || "https://via.placeholder.com/300x450";

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <CardMedia
        component="img"
        sx={{ height: 300 }}
        image={posterUrl}
        alt={movie.title}
      />
      <CardContent>
        <Typography variant="h6" noWrap>
          {movie.title}
        </Typography>
        <Typography variant="body2">{movie.year}</Typography>
        <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {movie.genres &&
            movie.genres.slice(0, 3).map((genre, index) => (
              <Chip key={index} label={genre} size="small" />
            ))}
        </Box>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleMovieClick}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default MovieCard;
