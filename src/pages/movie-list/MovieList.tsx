import { useCallback, useEffect, useRef, useState } from 'react';
import ServiceApi from '../../api/ServiceApi';
import styles from './MovieList.module.css';
import type { Movie } from '../../api/types';
import MovieItem from './movie-item/MovieItem';
import { useSearchParams } from 'react-router-dom';

const LIMIT = 50;
const GENRES = ['комедия', 'приключения', 'фантастика', 'фэнтези', 'криминал']; //В доках апи нет запросов, позволяющих получить все фильтры


const MovieList = () => {
    const currYear = new Date().getFullYear()
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedGenres, setSelectedGenres] = useState<string[]>(
        searchParams.has('genres.name') ?
            searchParams.getAll('genres.name') :
            []
    );
    const [ratingRange, setRatingRange] = useState({
        from: searchParams.has('rating.imdb') ? searchParams.get('rating.imdb')?.split('-')[0] : '0',
        to: searchParams.has('rating.imdb') ? searchParams.get('rating.imdb')?.split('-')[1] : '10',
    })
    const [yearRange, setYearRange] = useState({
        from: searchParams.has('year') ? searchParams.get('year')?.split('-')[0] : '1990',
        to: searchParams.has('year') ? searchParams.get('year')?.split('-')[1] : `${currYear}`,
    })
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [movies, setMovies] = useState<Movie[]>([]);
    const observerRef = useRef<HTMLDivElement | null>(null);

    const fetching = useCallback(async () => {
        const isSearchParameters = searchParams.has('genres.name') || searchParams.has('year') || searchParams.has('rating.imdb');
        if (isLoading || !hasMore) return;
        setIsLoading(true);
        const responseData = isSearchParameters ? await ServiceApi.getMovies(page, LIMIT, searchParams.toString()) : await ServiceApi.getMovies(page, LIMIT);
        console.log(responseData)
        setMovies((prev) => [...prev, ...responseData.data.docs])
        setHasMore(responseData.data.docs.length === LIMIT);
        setPage((prev) => prev + 1)
        setIsLoading(false);
    }, [page, isLoading, hasMore, searchParams])

    const toggleGenre = (genre: string) => {
        if (searchParams.has('genres.name')) {
            setSearchParams(prev => {
                const p = new URLSearchParams(prev);
                const list = p.getAll('genres.name').filter(g => g !== genre);
                p.delete('genres.name');
                list.forEach(g => p.append('genres.name', g));
                return p;
            }, { replace: true });
        }
        setSelectedGenres((prev) => selectedGenres.includes(genre)
            ? prev.filter(item => item !== genre)
            : [...prev, genre]
        )
    }

    useEffect(() => {
        fetching()
    }, [])

    useEffect(() => {
        if (!observerRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !isLoading) {
                    fetching()
                }
            },
            { threshold: 1 }
        );

        observer.observe(observerRef.current)

        return () => {
            observer.disconnect()
        }
    }, [fetching, hasMore, isLoading])

    const handleFilterClick = () => {
        if (Number(ratingRange.from) < 0 || Number(ratingRange.to) > 10) {
            throw new Error('Неверный ввод рейтинга')
        } else if (Number(yearRange.from) < 1990 || Number(yearRange.to) > 2025) {
            throw new Error('Неверный ввод года выпуска')
        }

        const newParams = new URLSearchParams();
        newParams.append('year', `${yearRange.from}-${yearRange.to}`)
        newParams.append('rating.imdb', `${ratingRange.from}-${ratingRange.to}`)
        selectedGenres.forEach(genre => newParams.append('genres.name', genre));

        setSearchParams(newParams, { replace: true });
        setPage(1);
        setMovies([]);
        fetching();
    }

    return (
        <>
            <h3 className={styles.filters__title}>ФИЛЬТРЫ</h3>
            <div className={styles.filters}>
                <div className={styles.genres}>
                    <h4 className={styles.genres__title}>Жанры</h4>
                    {GENRES.map(genre =>
                        <label key={genre} >
                            <input
                                type="checkbox"
                                checked={selectedGenres.includes(genre) || searchParams.getAll('genres.name').includes(genre)}
                                onChange={() => toggleGenre(genre)}
                            />
                            {genre}
                        </label>
                    )}
                </div>

                <div className={styles.rating}>
                    <h4 className={styles.rating__title}>Рейтинг</h4>
                    <input
                        className={styles.rating__input}
                        type="text"
                        value={ratingRange.from}
                        onChange={(e) => setRatingRange({ ...ratingRange, from: e.target.value })}
                    />
                    <span>-</span>
                    <input
                        className={styles.rating__input}
                        type="text"
                        value={ratingRange.to}
                        onChange={(e) => setRatingRange({ ...ratingRange, to: e.target.value })}
                    />
                </div>

                <div className={styles.year}>
                    <h4 className={styles.year__title}>Год выпуска</h4>
                    <input
                        className={styles.year__input}
                        type="text"
                        value={yearRange.from}
                        onChange={(e) => setYearRange({ ...yearRange, from: e.target.value })}
                    />
                    <span>-</span>
                    <input
                        className={styles.year__input}
                        type="text"
                        value={yearRange.to}
                        onChange={(e) => setYearRange({ ...yearRange, to: e.target.value })}
                    />
                </div>
                <button className={styles.filters__button} onClick={handleFilterClick}>Применить</button>
            </div>
            <div className={styles.wrapper}>
                {movies?.map(item =>
                    <MovieItem key={item.id} movie={item} />
                )}
                {isLoading && <p>Загрузка...</p>}
                <div ref={observerRef} style={{ height: '1px' }}></div>
                {!hasMore && <p>Все элементы загружены</p>}
            </div>
        </>
    );
}

export default MovieList;