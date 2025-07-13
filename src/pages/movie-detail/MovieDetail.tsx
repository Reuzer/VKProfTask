import { useParams } from 'react-router-dom';
import type { Movie } from '../../api/types';
import styles from './MovieDetail.module.css'
import { useEffect, useState } from 'react';
import ServiceApi from '../../api/ServiceApi';

const MovieDetail = () => {

    const {id} = useParams();
    const [movie, setMovie] = useState<Movie>()

    const fetching = async () => {
        try {
            if (id) {
                const response = await ServiceApi.getMovie(id)
                setMovie(response.data);
            } else {
                throw new Error('no id')
            }
        } catch (e) {
            if (e instanceof Error) {
                throw new Error(e.message)
            } else {
                console.error(e)
            }
        }
    }

    useEffect(()=>{
        fetching();
    },[])

    return (
        <div className={styles.wrapper}>
            <div>
                <img className={styles.movie__img} src={movie?.poster ? movie.poster.previewUrl : ''} alt="Нет изображения" /><br />
                <button className={styles.favBtn}>Добавить в избранное</button>
            </div>
            <div className={styles.movie__info}>
                <h3 className={styles.movie__name}>{movie?.name ? movie.name : movie?.alternativeName}</h3>
                <p className={styles.movie__description}>Описание: <br/>{movie?.description ? movie.description : 'Нет описания'}</p>
                <p className={styles.movie__rating}>Рейтинг: {movie?.rating.imdb}</p>
                <p className={styles.movie__year}>Год выпуска: {movie?.year}</p>
                <div className={styles.genres}>
                    <p className={styles.genres__title}>Жанры:</p>
                    {movie?.genres.map(item => 
                        <p key={item.name} className={styles.genres__genre}>{item.name}</p>
                    )}
                </div>
            </div>
            
        </div>
    );
}
 
export default MovieDetail;