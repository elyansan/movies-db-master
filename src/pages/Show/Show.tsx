import React, { useEffect, useState} from "react";

import { useLocation, useParams, useNavigate } from "react-router-dom";
import { getShowDetails, getRecommsMovies } from "../../services";
import { Pill } from "../../components";
import { MoviesCarousel } from "../../components/MoviesCarousel";
import { IMovie } from "./types"

const Show  = () => {
    const { id } = useParams<string>();
    const location = useLocation();
    const navigate = useNavigate();

    const [show, setShow] = useState<any>([]);
    const [recomms, setRecomms] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [favorites, setFavorites] = useState<string>(""); 
 
    const goBack = () => {
        navigate(-1);
    };

    const addFavorite = () => {
        const favs = favorites.length > 0 ? JSON.parse(favorites) : [];
        const newFavs = [...favs, id];
        setFavorites(JSON.stringify(newFavs));
        setIsFavorite(true);
        localStorage.setItem("favorites", JSON.stringify(newFavs));
    };

    const removeFavorite = () => {
        const favs = favorites.length > 0 ? JSON.parse(favorites) : [];
        let newFavs = [...favs];
        const index = newFavs.indexOf(id);
        newFavs = newFavs.filter((e) => e !== id);
        setFavorites(JSON.stringify(newFavs));    
        setIsFavorite(false);
        localStorage.setItem("favorites", JSON.stringify(newFavs));    
    };

    const getMovieDetails = async () => {
        await getShowDetails(String(id))
            .then((res) => {
                if (res && res.data) {
                    console.log(res.data, "res");
                    setShow(res.data.results);
                }
            })
            .catch((err) => {
                console.log(err, "err");
            });
        await getRecommsMovies(String(id))
            .then((res) => {
                if (res && res.data) {
                    console.log(res.data, "res");
                    setRecomms(res.data.results);
                }
            })
            .catch((err) => {
                console.log(err, "err");
            });
        setLoading(false);
    };
    

    useEffect(() => {
        const favs = localStorage.getItem("favorites") || "";
        setFavorites(favs);
        if (favs.includes(String(id))){
            setIsFavorite(true);
        }
        setLoading(true);
        getMovieDetails();
    }, []);

    return (
        <div>
            {loading ? (
                <span> Loading... </span>
            ) : (
            <>
            <div>Show id: { id } </div>
            <div>Título desde el state: { location.state.name }</div>
            <div>Titulo desde el servicio: {show.title}</div>
            <div>Para adultos desde servicio: {show.adult ? "yes" : "no"}</div>
            <button onClick={goBack}>Ir atrás</button>
            {isFavorite ? (
                <div>
                    <button className="p4 bg-blue-500" onClick={removeFavorite}>
                    Quitar de favoritos
                    </button> 
                </div>
            ) : (
            <div>
            <button className="p4 bg-red-500" onClick={addFavorite}>
            Añadir a favoritos
            </button>
            </div>
            )}
           </> 
         )}
        </div>
    );
};

export default Show;