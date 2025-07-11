import { type RouteObject } from "react-router";
import MovieList from "../pages/movie-list/MovieList";
import FavMovies from "../pages/fav-movies/FavMovies";
import MovieDetail from "../pages/movie-detail/MovieDetail";

const routesConfig: RouteObject[] = [
    {
        path: '',
        Component: MovieList
    },
    {   
        path: '/favourite',
        Component: FavMovies,
    },
    {
        path: '/:id',
        Component: MovieDetail
    }
]

export default routesConfig;