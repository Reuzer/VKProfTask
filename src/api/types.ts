export interface GetProduct {
    id: string;
    name: string;
    factory: string;
    price: number;
    category: 'Бакалея' | 'Газировки' | 'Сладости' | 'Овощи и фрукты' | 'Снеки';
    quantity: number;
}

export interface PostProduct {
    name: string;
    factory: string;
    price: number;
    category: 'Бакалея' | 'Напитки' | 'Сладости' | 'Овощи и фрукты' | 'Снеки' | '';
    quantity: number;
}

export interface error {
    message: string;
    status: number | undefined;
}

export interface UseFetchReturn {
    isLoading: boolean;
    error: error;
    fetching: () => Promise<void>
}
