import { useCallback, useEffect, useRef, useState } from 'react';
import ServiceApi from '../../api/ServiceApi';
import styles from './MovieList.module.css';
import type { Movie } from '../../api/types';
import MovieItem from './movie-item/MovieItem';

const LIMIT = 50;

const MovieList = () => {

    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [movies, setMovies] = useState<Movie[]>([]);
    const observerRef = useRef<HTMLDivElement | null>(null);

    const fetching = useCallback(async () => {
        if (isLoading || !hasMore) return;
        setIsLoading(true);
        const responseData = await ServiceApi.getMovies(page, LIMIT);
        console.log(responseData.data.docs);
        
        setMovies((prev) => [...prev, ...responseData.data.docs])
        setHasMore(responseData.data.docs.length === LIMIT);
        setPage((prev) => prev+1)
        setIsLoading(false);
    }, [page, isLoading, hasMore])

    useEffect(()=>{
        fetching()
    }, [])

    useEffect(()=>{
        if (!observerRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if(entries[0].isIntersecting && hasMore && !isLoading) {
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

    return (
        <div className={styles.wrapper}>
            {movies?.map(item => 
                <MovieItem movie={item} />
            )}
            {isLoading && <p>Загрузка...</p>}
            <div ref={observerRef} style={{height: '1px'}}></div>
            {!hasMore && <p>Все элементы загружены</p>}
        </div>
    );
}
 
export default MovieList;