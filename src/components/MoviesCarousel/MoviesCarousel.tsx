import "./MoviesCarousel.css";

import { MovieCard } from "..";
import React from "react";

const MoviesCarousel: React.FC<any> = ({ movies }) => {
  return (
    <div className="movies-carousel">
      {movies?.map((movie: any) => (
        <MovieCard
          key={movie.id}
          movieId={movie.id}
          posterPath={movie.poster_path}
          title={movie.title}
          vote_average={movie.vote_average}
          genre_ids={movie.genre_ids}
        />
      ))}
    </div>
  );
};

export default MoviesCarousel;
