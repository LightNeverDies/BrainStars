import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";

export const fetchMovies = createAsyncThunk("getMovies/movies", async() => {
    try {
        const response = await fetch("https://gist.githubusercontent.com/bstech-ux/e717b74dbd7cc95a8429eadc83a5c882/raw/ca85214d461ef93c316a47a6770c4b9ba678a6b3/movies.json")
        
        const data = await response.json()
        
        return data
    } catch(error) {
        return error
    }
})

export const addMovie = createAsyncThunk("getMovies/addMovies", async(data:any, {dispatch}) => {
    setTimeout(() => {
        dispatch(clearMessage())
    }, 2000)
    return data
})

export const editMovie = createAsyncThunk("getMovies/editMovies", async(data:any, {dispatch}) => {
    setTimeout(() => {
        dispatch(clearMessage())
    }, 2000)

    return data
})

export const deleteMovie = createAsyncThunk("getMovies/deleteMovies", async(data: any, {dispatch}) => {
    dispatch(deleteItem(data))

    return data
})

export const searchMovie = createAsyncThunk("getMovies/searchMovie", async(item: any, {dispatch}) => {
    dispatch(searchItem(item))

    return item
})

export const getMovieForEdit = createAsyncThunk("getMovies/getMovieForEdit", async(item: any, {dispatch}) => {
    dispatch(getItem(item))

    return item
})

const sliceMovie = createSlice({
    name: "getMovies",
    initialState: {
        error: '',
        data: [],
        filterData: [],
        loading: false,
        editField: {
            id: '',
            title: '',
            director: '',
            distributor: '',
            imdb_rating: '',
            imdb_votes: ''
        },
        successfulMessage: ''
    },
    reducers: {
        getItem: (state, action) => {
            const { id, title, director, distributor, imdb_rating, imdb_votes} = action.payload
            
            state.editField.id = id
            state.editField.director = director
            state.editField.title = title
            state.editField.distributor = distributor
            state.editField.imdb_rating = imdb_rating
            state.editField.imdb_votes = imdb_votes
        },

        deleteItem: (state, action) => {
            const currentData = current(state.filterData)
            const newData = currentData.filter((element: any) => action.payload !== element)
            state.filterData = newData
            state.data = newData
            state.successfulMessage = ""
        },

        searchItem: (state, action) => {
            if(action.payload !== '') {
                const currentData = current(state.filterData)
                const newFilteredData = currentData.filter((element: any) => 
                Object.values(element)
                .findIndex((val: any) => val.toString().startsWith(action.payload)) >= 0)
                state.filterData = newFilteredData
                state.data = current(state.data)
            } else {
                state.filterData = current(state.data)
            }
        },
        
        clearMessage: (state) => {
            if(state.successfulMessage !== "") {
                state.successfulMessage = ""
            }
        }
    },
    extraReducers: {
        [fetchMovies.fulfilled.toString()]:(state: any, action: any) => {
            state.loading = false

            if(state.filterData.length > 0) {
                const currentData = current(state.filterData)
                state.filterData = currentData
            } else {
                state.filterData = action.payload
                state.data = action.payload
            }

        },
        [fetchMovies.pending.toString()]:(state: any) => {
            state.loading = true
        },
        [fetchMovies.rejected.toString()]:(state: any, action: any) => {
            state.loading = false
            state.error = action.payload
        },
        [addMovie.fulfilled.toString()]:(state: any, action: any) => {
            return {
                loading: false,
                filterData: [...state.filterData, action.payload].sort((a, b) => a.id - b.id),
                data: [...state.data, action.payload],
                successfulMessage: "New record has been added!",
                editField: {},
                error: ""
            }
        },
        [addMovie.pending.toString()]:(state: any) => {
            state.loading = true
            state.successfulMessage = "New record has been added!"
        },
        [addMovie.rejected.toString()]:(state:any) => {
            state.loading = false
            state.error = "Something went wrong!"
        },
        [editMovie.fulfilled.toString()]:(state:any, action: any) => {
            return {
                loading: false,
                filterData: [...state.filterData.filter((x: any) => x.id !== action.payload.previousId), 
                    action.payload.editField].sort((a, b) => a.id - b.id),
                successfulMessage: "Record has been changed!",
                error: "",
                data: [...state.data.filter((x: any) => x.id !== action.payload.previousId), action.payload.editField],
                editField: {}
            }
        },
        [editMovie.pending.toString()]: (state: any) => {
            state.loading = true
            state.successfulMessage = "Record has been changed!"
        },
        [editMovie.rejected.toString()]: (state: any) => {
            state.loading = false
            state.error = "Something went wrong!"
        }
    }
})

const fetchingMovies = sliceMovie.reducer

export const {searchItem, deleteItem, getItem, clearMessage} = sliceMovie.actions
export const getMovies = (state: any) => state.movies
export default fetchingMovies