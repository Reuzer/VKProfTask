import type { AxiosResponse } from "axios";
import api from "./httpClient";
import type { Movie, MovieResponse } from "./types";

const currYear = new Date().getFullYear();

class ServiceApi {
    
    static async getMovies (page: number, limit: number, filters:string = `year=1990-${currYear}`): Promise<AxiosResponse<MovieResponse>> {
        const response = await api.get('movie?'+filters, {
            params: {
                page: page,
                limit: limit,
            }
        })
        return response;
    }

    static async getMovie (id: string): Promise<AxiosResponse<Movie>> {
        const response = await api.get(`movie/${id}`);
        return response;
    }
}

export default ServiceApi;

//rating.imdb=8-10&genres.name=%2Bкомедия&genres.name=%2Bкриминал&year=2015-2025