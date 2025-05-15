// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MovieList from "./pages/MovieList";
import MovieDetail from "./pages/MovieDetail"; // You can build this next

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/movies/:id" element={<MovieDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
