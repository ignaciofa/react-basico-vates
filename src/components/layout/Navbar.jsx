import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

function Navbar() {
  const [query, setQuery] = useState("");

  const navbarStyle = {
    backgroundColor: "darkgray",
  };

  const inputStyle = {
    backgroundColor: "lightgray",
  };

  return (
    <AppBar position="static" style={navbarStyle}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          VATES MOVIES APP
        </Typography>
        <div style={{ flex: 1 }} />
        <ul style={{ display: "flex", gap: "20px", listStyleType: "none" }}>
          <li>
            <Button component={Link} to="/" color="inherit">
              Home
            </Button>
          </li>
          <li>
            <Button component={Link} to="/categorias/35" color="inherit">
              Comedias
            </Button>
          </li>
          <li>
            <Button component={Link} to="/categorias/28" color="inherit">
              Accion
            </Button>
          </li>
          <li>
            <Button component={Link} to="/favoritos" color="inherit">
              Favoritos
            </Button>
          </li>
        </ul>
        <div style={{ display: "flex", gap: "10px" }}>
          <form
            onSubmit={(e) => e.preventDefault()}
            style={{ display: "flex" }}
          >
            <InputBase
              onChange={(e) => setQuery(e.target.value)}
              type="text"
              placeholder="Search"
              style={inputStyle}
            />
            <Button type="submit">
              <Link
                to={`/resultados/${query}`}
                style={{ textDecoration: "none" }}
              >
                <SearchIcon />
              </Link>
            </Button>
          </form>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
