import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTION } from "../utils/constant";
import {  addPopularMovies } from "../utils/moviesSlice";

const usePopularMovies = () => {
    const dispatch = useDispatch();

    const getPopular = async () => {
        const data = await
            fetch('https://api.themoviedb.org/3/movie/popular?page=1',
                API_OPTION
            )
        const json = await data.json();
        
        dispatch(addPopularMovies(json.results));
    };

    useEffect(() => {
        getPopular();
    }, []);
}
export default usePopularMovies;