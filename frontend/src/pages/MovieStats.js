import React, { useEffect, useState } from "react";
import { CircularProgress, Container, Typography, Box } from "@mui/material";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const MovieStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/movies/stats`);
        setStats(res.data);
      } catch {}
      setLoading(false);
    };
    fetchStats();
  }, []);

  if (loading) return <CircularProgress sx={{ m: 4 }} />;
  if (!stats) return <Typography>Failed to load statistics.</Typography>;

  const data = {
    labels: stats.genreStats.map(g => g._id),
    datasets: [
      {
        label: "Number of Movies",
        data: stats.genreStats.map(g => g.count),
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Avg IMDB Rating",
        data: stats.genreStats.map(g => g.avgRating?.toFixed(2)),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        yAxisID: "y1",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Movies by Genre & Avg IMDB Rating" },
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: "Number of Movies" } },
      y1: {
        beginAtZero: true,
        position: "right",
        title: { display: true, text: "Avg IMDB Rating" },
        grid: { drawOnChartArea: false },
      },
    },
  };

  return (
    <Container>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">
          Total Movies: {stats.overall?.totalMovies}
        </Typography>
        <Typography variant="h6">
          Overall Avg IMDB Rating: {stats.overall?.avgImdbRating?.toFixed(2)}
        </Typography>
      </Box>
      <Bar data={data} options={options} />
    </Container>
  );
};

export default MovieStats;