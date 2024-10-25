import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MovieDetailType, MovieType, UserType } from '../types/Types'

export interface AppSliceType {
    currentUser: UserType | null,
    loading: boolean,
    movies: MovieType[],
    drawer: boolean,
    currentMovie: MovieDetailType | null,
    randommovies: MovieType[] | null,
    likedMovies: MovieDetailType[],
    watchedMovies: MovieDetailType[],
    filteredmovies: MovieType[]
}

const initialState: AppSliceType = {
    currentUser: null,
    loading: false,
    movies: [],
    drawer: false,
    currentMovie: null,
    randommovies: null,
    likedMovies: JSON.parse(localStorage.getItem("basket") as string) || [],
    watchedMovies: [],
    filteredmovies: []
}

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setloading: (state: AppSliceType, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        setCurrentuser: (state: AppSliceType, action: PayloadAction<UserType | null>) => {
            state.currentUser = action.payload
        },
        setMovies: (state: AppSliceType, action: PayloadAction<MovieType[]>) => {
            state.movies = action.payload
        },
        setCurrentMovie: (state: AppSliceType, action: PayloadAction<MovieDetailType>) => {
            state.currentMovie = action.payload
        },
        setrandomMovies: (state: AppSliceType, action: PayloadAction<MovieType[]>) => {
            state.randommovies = action.payload
        },
        filterMovies: (state: AppSliceType, action: PayloadAction<string>) => {
            const tempMovies: MovieType[] = []
            state.movies.map((movie: MovieType) => {
                if (movie.title.toLowerCase().includes(action.payload.toLowerCase())) {
                    tempMovies.push(movie)
                }

            })
            state.movies = [...tempMovies]
        },
        setdrawer: (state: AppSliceType) => {
            state.drawer = !state.drawer
        },
        addLikedMovies: (state: AppSliceType, action: PayloadAction<MovieDetailType>) => {

            const existingMovieIndex = state.likedMovies.findIndex(movie => movie.id === action.payload.id);

            if (existingMovieIndex >= 0) {
                state.likedMovies.splice(existingMovieIndex, 1);
            } else {
                state.likedMovies.push(action.payload);
            }

            // Ensure liked movies are saved to local storage  
            localStorage.setItem("basket", JSON.stringify(state.likedMovies));
        },
        setLikedMovies: (state: AppSliceType, action: PayloadAction<MovieDetailType[]>) => {
            state.likedMovies = [...action.payload]
        },
        addWatchedMovies: (state: AppSliceType, action: PayloadAction<MovieDetailType>) => {

            const existingMovieIndex = state.watchedMovies.findIndex(movie => movie.id === action.payload.id);

            if (existingMovieIndex >= 0) {
                state.watchedMovies.splice(existingMovieIndex, 1);
            } else {
                state.watchedMovies.push(action.payload);
            }

            // Ensure liked movies are saved to local storage  
            localStorage.setItem("basket", JSON.stringify(state.watchedMovies));
        },
        setWatchedMovies: (state: AppSliceType, action: PayloadAction<MovieDetailType[]>) => {
            state.watchedMovies = [...action.payload]
        },
        setfilteredMovies: (state: AppSliceType, action: PayloadAction<MovieType[]>) => {
            state.filteredmovies = action.payload
        }

    }
})

export const { setloading, setCurrentuser, setMovies, setCurrentMovie, setrandomMovies, filterMovies, setdrawer, addLikedMovies, setLikedMovies, addWatchedMovies, setWatchedMovies, setfilteredMovies } = appSlice.actions

export default appSlice.reducer
