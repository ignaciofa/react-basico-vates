import React, { useEffect, useState } from "react";
import MoviesCard from "../layout/MoviesCard";
import { Typography, Grid } from "@mui/material";

function Home() {
  const [movies, setMovies] = useState([]);
  const [favorito, setFavorito] = useState([]);

  // Moved apiKey to the outer scope
  const apiKey = "6d1ec401313d6af8bc4ab6abd9c8b8ca";
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZDFlYzQwMTMx2D2Q2YWY4YmC4YWI2YWJkOWM4YjhjYSIsInS1YiI6IjY1MWYxZTVhNWIxMjQwMDBhZDY4NzE2YiIsInS1YiI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WL97YL2lNw0v3uNZjrsbJ-1upUH5T12-ZPKEOZwiXeU";

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`, {
      headers,
    })
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
      })
      .catch((error) => {
        console.error("Error fetching movie:", error);
      });

    const storedFavorito = JSON.parse(localStorage.getItem("favorito"));
    storedFavorito && setFavorito(storedFavorito);
  }, []);

  return (
    <section>
      <br></br>
      <Grid container justifyContent="center" spacing={2}>
        {movies.length > 0 ? (
          movies.slice(0, 20).map((movie) => (
            <Grid item key={movie.id}>
              <MoviesCard
                movie={movie}
                favorito={favorito}
                setFavorito={setFavorito}
              />
            </Grid>
          ))
        ) : (
          <Typography variant="body1" align="center">
            Loading...
          </Typography>
        )}
      </Grid>
    </section>
  );
}

export default Home;
