import React, { useEffect, useState } from "react";
import MoviesCard from "../layout/MoviesCard";
import { useParams } from "react-router-dom";
import { Typography, Grid, CircularProgress } from "@mui/material";

function Resultados() {
  const [movies, setMovies] = useState([]);
  const [favorito, setFavorito] = useState([]);
  const { query } = useParams();

  // Moved apiKey to the outer scope
  const apiKey = "6d1ec401313d6af8bc4ab6abd9c8b8ca";
  const token = "YOUR_TOKEN"; // Replace with your actual token

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Configure the headers with the token
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        // Use the fetch method to make the API call with the headers
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${query}&page=1&api_key=${apiKey}`,
          {
            headers,
          }
        );

        if (response.ok) {
          const data = await response.json();
          setMovies(data.results);
        } else {
          console.error("Error fetching movies:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchData();

    const storedFavorito = JSON.parse(localStorage.getItem("favorito"));
    if (storedFavorito) {
      setFavorito(storedFavorito);
    }
  }, [query]);
  const filteredMovies = movies.filter((movie) =>
    movie.original_title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section>
      <br></br>
      <Typography variant="h4" align="center" gutterBottom>
        RESULTADOS PARA: {query}
      </Typography>
      <Grid container justifyContent="center" spacing={2}>
        {movies.length > 0 ? (
          filteredMovies.slice(0, 20).map((movie) => (
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
            <CircularProgress />
          </Typography>
        )}
      </Grid>
    </section>
  );
}

export default Resultados;
