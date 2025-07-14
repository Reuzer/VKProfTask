import styles from './FavMovies.module.css'
import { favouriteStore } from '../../stores/FavouriteStore';
import { observer } from 'mobx-lite';
import { useNavigate } from 'react-router';

const FavMovies = observer(() => {
    const navigate = useNavigate();

    const handleMovieClick = (id: number) => {
        navigate(`/${id}`)
    }

    return (
        <div className={styles.wrapper}>
            {favouriteStore.favourites.length === 0 && <p>Нет избранных</p>}
            {favouriteStore.favourites.map(movie => 
                <div className={styles.movie} onClick={() => handleMovieClick(movie.id)}>
                    <img className={styles.img} src={movie.poster ? movie.poster.previewUrl : ''} alt="Нет изображения" />
                    <h3>{movie.name ? movie.name : movie.alternativeName}</h3>
                    <p>Год выпуска: {movie.year}</p>
                    <p>Рейтинг: {movie.rating.imdb}</p>
                    <button 
                    className={styles.deleteBtn}
                    onClick={(e) => {
                        e.stopPropagation();    
                        favouriteStore.remove(movie.id)
                    }}
                    >Удалить из избранного</button>
                </div>
            )}
        </div>
    )
})
 
export default FavMovies;