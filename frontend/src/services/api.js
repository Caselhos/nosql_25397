// src/services/api.js
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchMovies = async (page = 1, limit = 10) => {
  const res = await axios.get(`${API_BASE_URL}/api/movies?page=${page}&limit=${limit}`);
  return res.data;
};
