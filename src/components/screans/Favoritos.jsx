import React, { useEffect, useState } from "react";
import MoviesCard from "../layout/MoviesCard";
import { Typography, Grid, CircularProgress } from "@mui/material";

function Favoritos() {
  const [favoritoMovies, setFavoritoMovies] = useState([]);
  const [favorito, setFavorito] = useState([]);

  const apiKey = "6d1ec401313d6af8bc4ab6abd9c8b8ca";
  const token = "YOUR_TOKEN";

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const storedFavorito = JSON.parse(localStorage.getItem("favorito")) || [];

    if (storedFavorito.length > 0) {
      Promise.all(
        storedFavorito.map((id) =>
          fetch(
            `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${apiKey}`
          ).then((res) => res.json())
        )
      )
        .then((data) => {
          setFavoritoMovies(data);
          setFavorito(storedFavorito);
        })
        .catch((error) => console.error(error));
    }
  }, []);

  const removeFavorito = (movieId) => {
    const updatedFavoritos = favorito.filter((id) => id !== movieId);
    setFavorito(updatedFavoritos);
    localStorage.setItem("favorito", JSON.stringify(updatedFavoritos));
    setFavoritoMovies(favoritoMovies.filter((movie) => movie.id !== movieId));
  };

  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom>
        FAVORITOS
      </Typography>
      <Grid container justifyContent="center" spacing={2}>
        {favoritoMovies.length > 0 ? (
          favoritoMovies.map((movie) => (
            <Grid item key={movie.id}>
              <MoviesCard
                movie={movie}
                favorito={favorito}
                setFavorito={setFavorito}
                removeFavorito={removeFavorito}
              />
            </Grid>
          ))
        ) : (
          <Typography variant="body1" align="center">
            No hay películas favoritas guardadas.
          </Typography>
        )}
      </Grid>
    </div>
  );
}

export default Favoritos;
