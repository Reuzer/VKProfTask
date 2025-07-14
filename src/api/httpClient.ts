import axios, { AxiosError } from "axios";

const api = axios.create({
    baseURL: 'https://api.kinopoisk.dev/v1.4/'
})

api.interceptors.request.use(
    (config) => {
        if(config.headers) {
            config.headers['X-API-KEY'] = '6AYGK4P-DSH48A6-KPHZK93-W78T4H8' // Не должно быть так в проектах, обычно создается файл с секретными ключами, который помещается в .gitignore
        }
        return config
    }, 
    (error: AxiosError) => {
        return Promise.reject(error);
    }
)

export default api