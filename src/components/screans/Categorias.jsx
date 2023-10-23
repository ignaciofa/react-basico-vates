import React, { useEffect, useState } from "react";
import MoviesCard from "../layout/MoviesCard";
import { useParams } from "react-router-dom";
import Filter from "../layout/Filter";
import { Grid, Typography } from "@mui/material";

function Categorias() {
  const [movies, setMovies] = useState([]);
  const [favorito, setFavorito] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const { idCategoria } = useParams();

  const apiKey = "6d1ec401313d6af8bc4ab6abd9c8b8ca";
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZDFlYzQwMTMx2D2Q2YWY4BmC4YWI2YWJkOWM4YjhjYSIsInS1YiI6IjY1MWYxZTVhNWIxMjQwMDBhZDY4NzE2YiIsInS1YiI6WyJhcGlfcmVahZCJdLCJ2ZXJzaW9uIjoxfQ.WL97YL2lNw0v3uNZjrsbJ-1upUH5T12-ZPKEOZwiXeU";

  useEffect(() => {
    if (idCategoria) {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      fetch(
        `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${idCategoria}&api_key=${apiKey}`,
        {
          headers,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setMovies(data.results);
        })
        .catch((error) => {
          console.error("Error fetching movies:", error);
        });

      const storedFavorito = JSON.parse(localStorage.getItem("favorito"));
      storedFavorito && setFavorito(storedFavorito);
    }
  }, [idCategoria]);

  let categoryName = "";
  if (idCategoria === "28") {
    categoryName = "ACCION";
  } else if (idCategoria === "35") {
    categoryName = "COMEDIA";
  }

  const filteredMovies = movies.filter((movie) =>
    movie.original_title.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <section>
      {idCategoria && (
        <Typography variant="h4" align="center" gutterBottom>
          {categoryName}
        </Typography>
      )}
      <Filter inputValue={inputValue} setInputValue={setInputValue} />
      <Grid container justifyContent="left" spacing={2}>
        {filteredMovies.length > 0 ? (
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
            Loading...
          </Typography>
        )}
      </Grid>
    </section>
  );
}

export default Categorias;
