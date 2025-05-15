// src/services/api.js
import axios from "axios";

const API_BASE_URL = process.env.API_BASE_URL;

export const fetchMovies = async (page = 1, limit = 10) => {
  const res = await axios.get(`${API_BASE_URL}?page=${page}&limit=${limit}`);
  return res.data;
};
