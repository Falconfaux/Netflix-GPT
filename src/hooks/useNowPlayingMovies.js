import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTION } from "../utils/constant";
import { addNowPlayingMovies } from "../utils/moviesSlice";

const useNowPlayingMovies = () => {
    const dispatch = useDispatch();

    const getNowPlaying = async () => {
        const data = await
            fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1',
                API_OPTION
            )
        const json = await data.json();
        
        dispatch(addNowPlayingMovies(json.results));
    };

    useEffect(() => {
        getNowPlaying();
    }, []);
}
export default useNowPlayingMovies;