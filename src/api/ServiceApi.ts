import type { AxiosResponse } from "axios";
import type { GetProduct, PostProduct } from "./types";
import axios from "axios";


class ServiceApi {
    static async getProducts(limit = 10, page = 1) : Promise<AxiosResponse<GetProduct[]>> {
        const response = await axios.get('http://localhost:3000/products', {
            params: {
                _limit: limit,
                _page: page,
            }
        })
        return response.data;
    }

    static async postProduct(product: PostProduct) {
        const response = await axios.post('http://localhost:3000/products', product);
        return response
    }
}

export default ServiceApi;