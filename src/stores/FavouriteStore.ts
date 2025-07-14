import { makeAutoObservable, runInAction } from "mobx";
import type { Movie } from "../api/types";

export class FavouriteStore {
    favourites: Movie[] = []

    constructor() {
        makeAutoObservable(this);
        this.loadFromLocalStorage();
    }

    add(movie: Movie) {
        if (!this.isInFavouirites(movie.id)) {
            this.favourites.push(movie);
            this.saveToLocalStorage();
        }
    }

    remove(id: number) {
        this.favourites = this.favourites.filter((movie) => movie.id !== id);
        this.saveToLocalStorage();
    }

    isInFavouirites(id: number) {
        return this.favourites.some((m) => m.id === id)
    }

    private saveToLocalStorage() {
        localStorage.setItem('favourites', JSON.stringify(this.favourites))
    }

    private loadFromLocalStorage() {
        const stored = localStorage.getItem('favourites')
        if (stored) {
            runInAction(() => {
                this.favourites = JSON.parse(stored);
            })
        }
    }
}

export const favouriteStore = new FavouriteStore();