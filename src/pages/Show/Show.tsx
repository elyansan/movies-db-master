import React, { useEffect, useState } from "react";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getShowDetails } from "../../services/movies/getShowDetails";
import { getRecommsMovies } from "../../services";
import Config from "../../config";
import "./Show.css";
import { Pill } from "../../components";
import MoviesCarousel from "../../components/MoviesCarousel/MoviesCarousel";
import { IMovieResponse } from "../../services/movies/types";


const Show = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [show, setShow] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [favorites, setFavorites] = useState<string>("");
  const [recommendations, setRecommendations] = useState<IMovieResponse[]>([]);

  const goBack = () => {
    navigate(-1);
  };

  const addFavorite = () => {
    const favs = favorites.length > 0 ? JSON.parse(favorites) : [];
    const newFavorites = [...favs, id];
    setFavorites(JSON.stringify(newFavorites));
    setIsFavorite(true);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  const removeFavorite = () => {
    const favs = favorites.length > 0 ? JSON.parse(favorites) : [];
    let newFavorites = [...favs];
    newFavorites = newFavorites.filter((e) => e !== id);
    setFavorites(JSON.stringify(newFavorites));
    setIsFavorite(false);
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  const getMovieDetail = async () => {
    await getShowDetails(String(id))
      .then((res) => {
        if (res && res.data) {
          setShow(res.data);
        }
      })
      .catch((err) => {
        console.log(err, "err");
      });
    await getRecommsMovies(String(id))
      .then((res) => {
        console.log(res, "res");
        if (res && res.results)
          setRecommendations(res.results);
      }).catch((err) => {
        console.log(err, "err");
      });
    setLoading(false);
  }

  useEffect(() => {
    const favs = localStorage.getItem("favorites") || "";
    setFavorites(favs);
    if (favs.includes(String(id))) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
    setLoading(true);
    getMovieDetail();
  }, [id]);

  return (
    <div>
      {loading ? (
        <span>loading...</span>
      ) : (
        <>
          <div id="movie" className="p-4 flex flow-row">
            <img id="poster"
              src={Config.IMAGE_SOURCE + show?.poster_path}
              alt={show.title} />
            <div className="p-8 flex flex-col w-full space-y-8">
              <div className="flex w-full justify-between">
                <div className="text-4xl uppercase font-bold"> {show.title}</div>
                <button className="p-2 text-white font-bold rounded-full shadow-md bg-purple-800" onClick={goBack}>Go back</button>
              </div>
              <div className="flex space-x-3 font-medium">
                <div>{show.adult ? "🔞+18" : "👥 E"}</div>
                <div>⏱{show.runtime} min.</div>
                <div>📅{show.release_date}</div>
                <div>⭐{show.vote_average}</div>
                <div>🗳️{show.vote_count}</div>
              </div>
              <p>"{show.tagline}"</p>
              <p className="text-justify">{show.overview}</p>
              <div className="flex w-full justify-between">
                <div id="movie-genres" className="flex flex-col space-y-4">
                  <h3 className="font-bold text-xl">Genres</h3>
                  <ul className="flex space-x-2">
                    {show.genres && show.genres.map((genre: any) => (
                      <Pill key={genre.id} genre={genre.name} colorPill={"purple"} />
                    ))}
                  </ul>
                </div>
                {isFavorite ? (
                  <div>
                    <button className="p-2 text-white  font-bold rounded-lg shadow-md bg-blue-500" onClick={removeFavorite}>
                      &#128148; Remove from favorites
                    </button>
                  </div>
                ) : (
                  <div>
                    <button className="p-2 text-white font-bold rounded-lg shadow-md bg-purple-800" onClick={addFavorite}>
                      &#10084; Add to favorites
                    </button>
                  </div>

                )}
              </div>
            </div>
          </div>
          <div className="p-6 flex flex-col space-y-6">
            <h2 className="uppercase text-4xl font-semibold">Recommendations</h2>
            {recommendations && <MoviesCarousel movies={recommendations} />}
          </div>
        </>
      )}
    </div>
  );
};

export default Show;