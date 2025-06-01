import type { RouteObject } from "react-router-dom";
import ProductList from "../pages/product-list/ProductList";
import ProductForm from "../pages/product-form/ProductForm";

export const routesConfig: RouteObject[] = [
    {
        path: '',
        Component: ProductList
    },
    {
        path: '/post',
        Component: ProductForm,
    }
]