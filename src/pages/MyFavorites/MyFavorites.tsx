import React, { useEffect, useState } from 'react'

import { IMovieDetail } from './types';
import { MovieCard } from '../../components';
import { getShowDetails } from '../../services/movies/getShowDetails';
import "../NowPlaying/NowPlaying.css";
import { UserObject } from '../../store/app-context/types';
import { useAppContext } from '../../store/app-context/app-context';

const Favorites = () => {
  const {setUser} = useAppContext();
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
    const user: UserObject = {
      id: "1",
      firstName: "John",
      lastName: "Doe",
      email: "email@test.com",
    };
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
    console.log("se guardó user en el app context");
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
                <div>Oops, it seems that you don't any favorite movie yet...</div>
              )}
            </div>
          ) : (
            <div>
              <h3>Error fetching movies...</h3>
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
