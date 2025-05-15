// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MovieList from "./pages/MovieList";
import MovieDetail from "./pages/MovieDetail";
import AddMovie from "./pages/AddMovie";
import EditMovie from "./pages/EditMovie";
import MovieTabs from "./pages/MovieTabs";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<MovieTabs />} />
        <Route path="/movies/:id" element={<MovieDetail />} />
        <Route path="/add" element={<AddMovie />} />
        <Route path="/edit/:id" element={<EditMovie />} />
      </Routes>
    </Router>
  );
}

export default App;
