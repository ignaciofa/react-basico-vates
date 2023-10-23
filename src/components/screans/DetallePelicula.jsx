import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MoviesDeatilCard from "../layout/MoviesDeatilCard";
import { Typography } from "@mui/material";
import { Grid } from "@mui/material";

function DetallePelicula() {
  const [movie, setMovie] = useState({});
  const [favorito, setFavorito] = useState([]);
  const { idDetail } = useParams();
  const apiKey = "6d1ec401313d6af8bc4ab6abd9c8b8ca";

  useEffect(() => {
    const token =
      "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZDFlYzQwMTMx3D2Q2YWY4YmC4YWI2YWJkOWM4YjhjYSIsInS1YiI6IjY1MWYxZTVhNWIxMjQwMDBhZDY4NzE2YiIsInS1YiI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WL97YL2lNw0v3uNZjrsbJ-1upUH5T12-ZPKEOZwiXeU";

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    fetch(`https://api.themoviedb.org/3/movie/${idDetail}?api_key=${apiKey}`, {
      headers,
    })
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
      })
      .catch((error) => {
        console.error("Error fetching movie:", error);
      });

    const storedFavorito = JSON.parse(localStorage.getItem("favorito"));
    storedFavorito && setFavorito(storedFavorito);
  }, [idDetail]);

  return (
    <article>
      {movie && movie.title ? (
        <Grid container justifyContent="center">
          <MoviesDeatilCard
            movie={movie}
            favorito={favorito}
            setFavorito={setFavorito}
          />
        </Grid>
      ) : (
        <Typography variant="body1" align="center">
          Loading...
        </Typography>
      )}
    </article>
  );
}

export default DetallePelicula;
