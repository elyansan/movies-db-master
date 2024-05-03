import React, { useEffect, useState } from "react";

import { IMovieResponse } from "../../services/movies/types";
import { MovieCard } from "../../components";
import { getPopularMovies } from "../../services/movies/getPopularMovies";
import "../NowPlaying/NowPlaying.css";

const Popular: React.FC = () => {
  const [movies, setMovies] = useState<IMovieResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMovies, setErrorMovies] = useState<boolean>(false);

  const getPopular = async () => {
    await getPopularMovies()
      .then((res) => {
        if (res && res.data) {
          console.log(res.data, "res");
          setMovies(res.data.results);
        }
      })
      .catch((err) => {
        console.log(err, "err");
      });
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getPopular();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-4xl mb-2 ml-2">POPULAR</h1>
      {loading && <div> Loading...</div>}
      {errorMovies && <div> Error...</div>}
      <div className="movie-grid">
      {movies?.length > 0 &&
        movies.map((movie) => (
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
    </div>
  );
};

export default Popular;