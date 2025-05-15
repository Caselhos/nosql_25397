import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import MovieList from "./MovieList";
import MovieSearch from "./MovieSearch";
import MovieStats from "./MovieStats";

const MovieTabs = () => {
  const [tab, setTab] = useState(0);

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs value={tab} onChange={(_, v) => setTab(v)} centered>
        <Tab label="Movie List" />
        <Tab label="Full-Text Search" />
        <Tab label="Statistics" />
      </Tabs>
      <Box sx={{ mt: 3 }}>
        {tab === 0 && <MovieList />}
        {tab === 1 && <MovieSearch />}
        {tab === 2 && <MovieStats />}
      </Box>
    </Box>
  );
};

export default MovieTabs;