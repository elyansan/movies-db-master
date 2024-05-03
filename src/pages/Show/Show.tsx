import React, { useEffect, useState} from "react";

import { useLocation, useParams, useNavigate } from "react-router-dom";
import { getShowDetails } from "../../services";
import { IMovieResponse } from "../../services/movies/types";   

const Show: React.FC = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [movies, setMovies] = useState<IMovieResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [errorMovies, setErrorMovies] = useState<boolean>(false);

    const getShow = async () => {
        if (id)
        await getShowDetails(id)
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
    
    const goBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        
    }, []);

    return (
        <div>
            {loading && <div> Loading...</div>}
            {errorMovies && <div> Error...</div>}
            {movies?.length > 0 &&}
            <div>Show id: { id } </div>
            <div>Título desde el state: { location.state.name }</div>
            <button onClick={goBack}>Ir atrás</button>
        </div>
    );
};

export default Show;