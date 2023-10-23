import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";

function MoviesDetailCard(props) {
  const [favorito, setFavorito] = useState(false);

  const handleFavorito = () => {
    const updatedFavoritos = props.favorito.includes(props.movie.id)
      ? props.favorito.filter((id) => id !== props.movie.id)
      : [...props.favorito, props.movie.id];

    props.setFavorito(updatedFavoritos);
    localStorage.setItem("favorito", JSON.stringify(updatedFavoritos));

    setFavorito(!favorito);
  };

  return (
    <Card variant="outlined" style={{ maxWidth: 500, paddingTop: "1%" }}>
      <CardMedia
        component="img"
        image={`https://image.tmdb.org/t/p/w500/${props.movie.poster_path}`}
        alt={props.movie.title}
        style={{ width: "100%" }}
      />
      <CardContent>
        <Typography variant="h6" component="div">
          {props.movie.title}
        </Typography>
        <Typography variant="body2">{props.movie.overview}</Typography>
      </CardContent>
      <CardActions>
        <Button variant="outlined" color="primary" onClick={handleFavorito}>
          {props.favorito.includes(props.movie.id) ? "❤" : "🤍"}
        </Button>
      </CardActions>
    </Card>
  );
}

export default MoviesDetailCard;
