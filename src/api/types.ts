type genres = {
    name: string;
}

type countries = {
    name: string
}

type releaseYears = {
    start: number,
    end: number
}

export interface movie {
    id: number,
    name: null | string,
    alternativeName: null | "Spyder Games",
    type: string,
    typeNumber: number,
    year: number,
    description: null | string,
    shortDescription: null | string,
    status: string,
    rating: {
        kp: number,
        imdb: number,
        filmCritics: number,
        russianFilmCritics: number,
        await: number
    },
    votes: {
        kp: number,
        imdb: number,
        filmCritics: number,
        russianFilmCritics: number,
        await: number
    },
    movieLength: null | number,
    totalSeriesLength: 30 | null,
    seriesLength: null | number,
    ratingMpaa: null | number,
    ageRating: null | number,
    genres: genres[],
    countries: countries[],
    releaseYears: releaseYears[] 
    top10: null | number,
    top250: null | number,
    isSeries: boolean,
    ticketsOnSale: boolean,
}

export interface MovieResponse {
    docs: movie[],
    total: number,
    limit: number,
    page: number,
    pages: number,
}