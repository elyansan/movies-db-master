import "./MovieCard.css";

import { FaStar } from "react-icons/fa";
import { IMAGE_SOURCE } from "../../constants/moviesMock";
import { IMovieCard } from "./types";
import { Pill } from "..";
import { ROUTES } from "../../routes/constants";
import React from "react";
import genres from "../../constants/genres.json";
import { useNavigate } from "react-router-dom";

const MovieCard: React.FC<IMovieCard> = ({
  title,
  genre_ids,
  movieId,
  vote_average,
  posterPath,
}) => {
  const navigate = useNavigate();

  const poster = IMAGE_SOURCE + posterPath;

  const getGenre = (genreId: number): string => {
    const genre = genres.genres.find( (genre: { id: number }) => genre.id === genreId );
    return genre ? genre.name : "";
  };

  const navigateMovies = () => {
    navigate(`${ROUTES.SHOW}${movieId}`, { state: { name: title } });
  };

  return (
    <div className="movie-card" key={movieId} onClick={navigateMovies}>
      <div className="movie-card__img">
        <img src={poster} alt={title} />
      </div>

      <div className="info-show">
        <div className="movie-card__details">
          <Pill genre={getGenre(genre_ids[0])} colorPill="purple" />

          <p className="movie-title">{title}</p>

          <p className="movie-vote">
            <FaStar className="mr-1" />
            {vote_average.toFixed(1)} / 10
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
