import type { AxiosResponse } from "axios";
import api from "./httpClient";
import type { MovieResponse } from "./types";

class ServiceApi {
    
    static async getMovies (page: number, limit: number): Promise<AxiosResponse<MovieResponse>> {
        const response = await api.get('movie', {
            params: {
                page: page,
                limit: limit,
            }
        })
        return response;
    }
}

export default ServiceApi;

