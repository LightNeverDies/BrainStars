import { configureStore } from "@reduxjs/toolkit";
import fetchingMovies from "./features/Movies/moviesSlice"

const store = configureStore({
    reducer: {
        movies: fetchingMovies
    }
})

export default store