import React, { useEffect, useState } from 'react'

import { IMovieDetail } from './types';
import { MovieCard } from '../../components';
import { getShowDetails } from '../../services/movies/getShowDetails';
import "../NowPlaying/NowPlaying.css";

const Favorites = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [shows, setShows] = useState<IMovieDetail[]>([]);
  const favorites: string = localStorage.getItem("favorites") || "";

  const runGetFavorites = async () => {
    if (favorites.length) {
      const favoritesArray = JSON.parse(favorites);
      const newShow = await Promise.all(
        favoritesArray.map(async (favoritesId: string) => {
          return getShowDetails(favoritesId)
            .then((res) => {
              if (res && res.data) {
                return res.data;
              }
            })
            .catch((err) => {
              console.log(err, "err");
            });
        })
      );
      setShows(newShow);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    runGetFavorites();
  }, []);

  return (
    <div>
      {!loading ? (
        <div className="p-4">
          <div className="font-semibold text-4xl mb-2 ml-2">MY FAVORITES</div>
          {favorites && favorites.length > 0 ? (
            <div>
              {shows && shows.length > 0 ? (
                <div className="movie-grid">
                  {shows.map((show: IMovieDetail) => (
                    <MovieCard
                      key={show.id}
                      movieId={show.id}
                      title={show.title}
                      genre_ids={[show.genres[0].id]}
                      vote_average={show.vote_average}
                      posterPath={show.poster_path}
                    />
                  ))}
                </div>
              ) : (
                <div>Error fetching movies...</div>
              )}
            </div>
          ) : (
            <div>
              <h3>Oops, it seems that you don't any favorite movie yet...</h3>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2>Loading...</h2>
        </div>
      )}
    </div>
  );
};

export default Favorites;
