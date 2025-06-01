import { useState } from "react";
import { type error, type UseFetchReturn } from "../api/types";
import { AxiosError } from "axios";

export function useFetch(callback: () => Promise<any>): UseFetchReturn {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<error>({
        message: '',
        status: undefined,
    })
    const fetching = async () => {
        try {
            setIsLoading(true);
            await callback()
        } catch (e) {
            setError(
                e instanceof (AxiosError || Error)
                ? {message: e.message, status: e.response?.status}
                : {message: 'unknown error', status: undefined}
            );
        } finally {
            setIsLoading(false)
        }
    }

    return {fetching, isLoading, error}
}