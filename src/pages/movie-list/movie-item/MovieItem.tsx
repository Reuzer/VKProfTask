import { useEffect, useState, type FC } from "react";
import type { Movie } from "../../../api/types";
import styles from './MovieItem.module.css'
import { useNavigate } from "react-router";
import { favouriteStore } from "../../../stores/FavouriteStore";
import Modal from "../../../components/modal/Modal";

interface Props {
    movie: Movie
}

const MovieItem: FC<Props> = ({ movie }) => {

    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const handleMovieClick = () => {
        navigate(`/${movie.id}`)
    }

    const confirmBtnClick = (movie: Movie) => {
        favouriteStore.add(movie);
        setIsOpen(false);
    }

    const cancelBtnClick = () => {
        setIsOpen(false);
    }


    useEffect(() => {
        console.log(isOpen);

    }, [isOpen])
    return (
        <>
            <div className={styles.wrapper} onClick={handleMovieClick}>
                <img className={styles.img} src={movie.poster ? movie.poster.previewUrl : ''} alt="Нет изображения" />
                <h3>{movie.name ? movie.name : movie.alternativeName}</h3>
                <p>Год выпуска: {movie.year}</p>
                <p>Рейтинг: {movie.rating.imdb}</p>
                <button
                    className={styles.addBtn}
                    disabled={favouriteStore.isInFavouirites(movie.id)}
                    onClick={(e) => {
                        e.stopPropagation()
                        setIsOpen(true)
                    }}
                >{favouriteStore.isInFavouirites(movie.id) ? 'В избранном' : 'Добавить в избранное'}</button>
            </div>
            <Modal isOpen={isOpen}>
                <p> Вы хотите добавить {movie.name ? movie.name : movie.alternativeName} в избранное?</p>
                <div className={styles.modal__btns}>
                    <button
                        className={styles.confirmBtn}
                        onClick={() => confirmBtnClick(movie)}
                    >Да</button>
                    <button
                        className={styles.cancelBtn}
                        onClick={cancelBtnClick}
                    >Нет</button>
                </div>
            </Modal>
        </>
    );
}

export default MovieItem;

{/*  */ }