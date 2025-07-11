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

export interface Movie {
    id: number,
    name: null | string,
    alternativeName: null | string,
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
    totalSeriesLength: number | null,
    seriesLength: null | number,
    ratingMpaa: null | number,
    ageRating: null | number,
    poster: {
        url: string,
        previewUrl: string
    } | null,
    genres: genres[],
    countries: countries[],
    releaseYears: releaseYears[]
    top10: null | number,
    top250: null | number,
    isSeries: boolean,
    ticketsOnSale: boolean,
}

export interface MovieResponse {
    docs: Movie[],
    total: number,
    limit: number,
    page: number,
    pages: number,
}