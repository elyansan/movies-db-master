import React, { useEffect, useState } from 'react';
import { IMovieResponse } from '../../services/movies/types';
import { getNowPlayingMovies } from '../../services/movies/getNowPlayingMovies';
import { MovieCard } from '../../components';
import './NowPlaying.css'  


const NowPlaying: React.FC = () => {
  const [movies, setMovies] = useState<IMovieResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMovies, setErrorMovies] = useState<boolean>(false);

  const getNowPlaying = async () => {
    await getNowPlayingMovies()
      .then((res) => {
        if (res && res.data){
          console.log(res.data, "res")
          setMovies(res.data.results);
        }
      })
      .catch((err) => {
        console.log(err, "err")
      });
    setLoading(false);
    };

    useEffect(() => {
      setLoading(true);
      getNowPlaying();
    }, []);

    return (
      <div className="p-4">
        <h1 className="text-4xl mb-2 ml-2">NOW PLAYING</h1>
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

  


export default NowPlaying;