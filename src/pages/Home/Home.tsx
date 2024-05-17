import React, { useEffect, useState } from 'react';
import MoviesCarousel from '../../components/MoviesCarousel/MoviesCarousel';
import { getPopularMovies } from '../../services/movies/getPopularMovies';
import { getTopRatedMovies } from '../../services/movies/getTopRatedMovies';
import { getNowPlayingMovies } from '../../services/movies/getNowPlayingMovies';
import { useAppContext } from '../../store/app-context/app-context';


const Home: React.FC = () => {
  const { user, setUser, logOut } = useAppContext();
  console.log(user, "user");
   
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);

const getData = async () => {
  const popular = await getPopularMovies();
  const topRated = await getTopRatedMovies();
  const nowPlaying = await getNowPlayingMovies();
  setPopularMovies(popular.data.results);
  setTopRatedMovies(topRated.data.results);
  setNowPlayingMovies(nowPlaying.data.results);
}
  useEffect(() => {   
    if (typeof user === "undefined") {
      const localUser = localStorage.getItem("user");
      if (localUser){
        setUser(JSON.parse(localUser));
      }
      //aquí en else, llamar a la función de login
    } 
    getData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="font-semibold text-4xl mb-2 ml-2">POPULAR</h1>
      <MoviesCarousel movies={popularMovies}/>
      <h1 className="font-semibold text-4xl mt-8 mb-2 ml-2">TOP RATED</h1>
      <MoviesCarousel movies={topRatedMovies}/>
      <h1 className="font-semibold text-4xl mt-8 mb-2 ml-2">NOW PLAYING</h1>
      <MoviesCarousel movies={nowPlayingMovies}/>
    </div>
  );
};

export default Home;