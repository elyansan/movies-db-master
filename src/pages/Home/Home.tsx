import React, { useEffect, useState } from 'react';
import MoviesCarousel from '../../components/MoviesCarousel/MoviesCarousel';
import { getPopularMovies } from '../../services/movies/getPopularMovies';
import { getTopRatedMovies } from '../../services/movies/getTopRatedMovies';
import { getNowPlayingMovies } from '../../services/movies/getNowPlayingMovies';


const Home: React.FC = () => {
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
    getData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-4xl mb-2 ml-2">POPULAR</h1>
      <MoviesCarousel movies={popularMovies}/>
      <h1 className="text-4xl mt-8 mb-2 ml-2">TOP RATED</h1>
      <MoviesCarousel movies={topRatedMovies}/>
      <h1 className="text-4xl mt-8 mb-2 ml-2">NOW PLAYING</h1>
      <MoviesCarousel movies={nowPlayingMovies}/>
    </div>
  );
};

export default Home;