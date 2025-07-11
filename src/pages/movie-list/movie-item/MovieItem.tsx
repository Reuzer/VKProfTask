import type { FC } from "react";
import type { Movie } from "../../../api/types";
import styles from './MovieItem.module.css'

interface Props {
    movie: Movie
}
 
const MovieItem: FC<Props> = ({movie}) => {

    return (
        <div className={styles.wrapper} >
            <img className={styles.img} src={movie.poster ? movie.poster.previewUrl : ''} alt="Нет изображения" />
            <h3>{movie.name ? movie.name : movie.alternativeName}</h3>
            <p>Год выпуска: {movie.year}</p>
            <p>Рейтинг: {movie.rating.imdb ? movie.rating.imdb : movie.rating.kp}</p>
        </div>
    );
}
 
export default MovieItem;