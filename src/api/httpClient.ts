import axios, { AxiosError } from "axios";

const api = axios.create({
    baseURL: 'https://api.kinopoisk.dev/v1.4/'
})

api.interceptors.request.use(
    (config) => {
        if(config.headers) {
            config.headers['X-API-KEY'] = '6AYGK4P-DSH48A6-KPHZK93-W78T4H8'
        }
        return config
    }, 
    (error: AxiosError) => {
        return Promise.reject(error);
    }
)

export default api