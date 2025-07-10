import axios, { AxiosError } from "axios";

const api = axios.create({
    baseURL: 'https://api.kinopoisk.dev/v1.4/'
})

api.interceptors.request.use(
    (config) => {
        if(config.headers) {
            config.headers['X-API-KEY'] = 'WKNM0MN-KGTMRAD-HEYKYV0-8NZ8W92'
        }
        return config
    }, 
    (error: AxiosError) => {
        return Promise.reject(error);
    }
)

export default api