// src/components/Navbar.js
import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ textDecoration: "none", color: "#fff" }}
        >
          Movie App
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
