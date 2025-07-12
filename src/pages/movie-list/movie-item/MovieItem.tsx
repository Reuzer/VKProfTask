import type { FC } from "react";
import type { Movie } from "../../../api/types";
import styles from './MovieItem.module.css'
import { useNavigate } from "react-router";

interface Props {
    movie: Movie
}
 
const MovieItem: FC<Props> = ({movie}) => {

    const navigate = useNavigate();

    const handleMovieClick = () => {
        navigate(`/${movie.id}`)
    }
    return (
        <div className={styles.wrapper} onClick={handleMovieClick}>
            <img className={styles.img} src={movie.poster ? movie.poster.previewUrl : ''} alt="Нет изображения" />
            <h3>{movie.name ? movie.name : movie.alternativeName}</h3>
            <p>Год выпуска: {movie.year}</p>
            <p>Рейтинг: {movie.rating.imdb}</p>
        </div>
    );
}
 
export default MovieItem;