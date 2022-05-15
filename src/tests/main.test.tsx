import 'jsdom-global/register'
import '@testing-library/jest-dom'
import React from "react"
import { mount, shallow } from 'enzyme'

import { Provider } from 'react-redux'
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetch from 'jest-fetch-mock'

import reducer, { deleteItem, getItem, clearMessage, 
    searchItem, fetchMovies, addMovie, editMovie, 
    deleteMovie, searchMovie, getMovieForEdit } from '../features/Movies/moviesSlice'
import { BrowserRouter as Router, useNavigate } from 'react-router-dom'

import Main from "../features/Main/Main"
import Header from "../components/Header/Header"
import Add from "../features/Movies/AddMovies"
import Movies from "../features/Movies/Movies"
import Edit from "../features/Movies/EditMovies"

const data = require('./data.json')
const mockStore = configureStore([thunk])

import { changedData, searchData } from './changedData'

describe("Rendering Main", () => {
    const dataStore = {
        error: '',
        data,
        filterData: data,
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
    }

    const storeData = mockStore({movies: dataStore})

    describe("Render Components without crashing", () => {
        it("render Main component without crashing ", () => {
            shallow(<Main/>)
        })
        it("renders Header component without crashing", () => {
            shallow(<Header/>)
        })
        it("renders Movies component without crashing", () => {
            expect(shallow(<Main type={'normal'}/>))
        })
        it("renders Add component without crashing", () => {
            expect(shallow(<Main type={'add'}/>))
        })
        it("renders Edit component without crashing", () => {
           expect(shallow(<Main type={'edit'}/>))
        })
    })

    describe("moviesSlice Test", () => {

        const initialState = {
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
        }

        const payload = {
            id: 1,
            director: 'None',
            title: 'None',
            distributor: 'None',
            imdb_rating: 2.2,
            imdb_votes: 10000,
        }

        describe("Reducers test", () => {
            it("should return the initial state", () => {
                expect(reducer(undefined, {type: undefined})).toEqual(initialState)
            })
    
            it("should return getItem", () => {
                expect(reducer(undefined, getItem(payload))).toEqual({
                    data: [],
                    editField: payload,
                    error: '',
                    filterData: [],
                    loading: false,
                    successfulMessage: ''
                })
            })
    
            it("should remove item", () => {
    
                const insideState = {
                    error: '',
                    data,
                    filterData: data,
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
                }
    
                const insidePayload = data[0]
    
                expect(reducer(insideState, deleteItem(insidePayload))).toEqual(changedData)
            })
    
            it("should clear message", () => {
                const insideState = {
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
                    successfulMessage: 'Change has been made!'
                }
    
                expect(reducer(insideState, clearMessage())).toEqual(initialState)
            })
    
            it("should search for item", () => {
                const insideState = {
                    error: '',
                    data: [],
                    filterData: data,
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
                }
    
                const insidePayload = "1941"
    
                expect(reducer(insideState, searchItem(insidePayload))).toEqual(searchData)
            })
        })

        describe("ExtraReducers test", () => {
            const insideTest = {
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
            }

            it('should fetch action pending', () => {

                const expectedResult = {
                    error: '',
                    data: [],
                    filterData: [],
                    loading: true,
                    editField: {
                        id: '',
                        title: '',
                        director: '',
                        distributor: '',
                        imdb_rating: '',
                        imdb_votes: ''
                    },
                    successfulMessage: ''
                }

                expect(reducer(insideTest, { type: fetchMovies.pending})).toEqual(expectedResult)
            })

            it('should fetch action fulfilled - empty data', async() => {
                const expectedResult = {
                    error: '',
                    data: undefined,
                    filterData: undefined,
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
                }

                expect(reducer(insideTest, { type: fetchMovies.fulfilled})).toEqual(expectedResult)
            })

            it('should fetch action rejected', () => {
                const expectedResult = {
                    error: undefined,
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
                }

                expect(reducer(insideTest, { type: fetchMovies.rejected})).toEqual(expectedResult)
            })

            it('should addMovie action pending', () => {
                const expectedResult = {
                    error: "",
                    data: [],
                    filterData: [],
                    loading: true,
                    editField: {
                        id: '',
                        title: '',
                        director: '',
                        distributor: '',
                        imdb_rating: '',
                        imdb_votes: ''
                    },
                    successfulMessage: "New record has been added!"
                }
                expect(reducer(insideTest, { type: addMovie.pending})).toEqual(expectedResult)
            })
            
            it('should addMovie action rejected', () => {
                const expectedResult = {
                    error: "Something went wrong!",
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
                }
                expect(reducer(insideTest, { type: addMovie.rejected})).toEqual(expectedResult)
            })

            it('should editMovie action pending', () => {
                const expectedResult = {
                    error: "",
                    data: [],
                    filterData: [],
                    loading: true,
                    editField: {
                        id: '',
                        title: '',
                        director: '',
                        distributor: '',
                        imdb_rating: '',
                        imdb_votes: ''
                    },
                    successfulMessage: "Record has been changed!"
                }

                expect(reducer(insideTest, { type: editMovie.pending})).toEqual(expectedResult)
            })

            it('should editMovie action rejected', () => {
                const expectedResult = {
                    error: "Something went wrong!",
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
                    successfulMessage: ""
                }

                expect(reducer(insideTest, { type: editMovie.rejected})).toEqual(expectedResult)
            })
        })

        describe("Actions test", () => {
            const insidePayload = {
                id: 1,
                director: 'None',
                title: 'None',
                distributor: 'None',
                imdb_rating: 2.2,
                imdb_votes: 10000,
            }

            const expectedResult = {
                "id": 4,
                "title": 1941,
                "director": "Steven Spielberg",
                "distributor": "Universal",
                "imdb_rating": 5.6,
                "imdb_votes": 13364
            }
    

            it('should fetchMovies - resolve', async() => {
                fetch.mockResponseOnce(JSON.stringify(data))
                const result = await storeData.dispatch(fetchMovies() as any)
                expect(result.payload).toEqual(data)
            })

            it('should fetchMovies - rejected', async() => {
                fetch.mockRejectOnce(new Error("Something went wrong"))
                const result = await storeData.dispatch(fetchMovies() as any)
                expect(result.payload).toEqual(new Error("Something went wrong"))
            })

            it('should addMovie - correct', async() => {
                const result = await storeData.dispatch(addMovie(insidePayload) as any)
                expect(result.payload).toEqual(insidePayload)
            })

            it('should editMovie - correct', async() => {
                const result = await storeData.dispatch(editMovie(insidePayload) as any)
                expect(result.payload).toEqual(insidePayload)
            })

            it('should deleteMovie - correct', async() => {
                const result = await storeData.dispatch(deleteMovie(expectedResult) as any)
                expect(result.payload).toEqual(expectedResult)
            })

            it('should editMovie - correct', async() => {
                const result = await storeData.dispatch(searchMovie(expectedResult) as any)
                expect(result.payload).toEqual(expectedResult)
            })

            it('should getMovieForEdit - correct', async() => {
                const result = await storeData.dispatch(getMovieForEdit(expectedResult) as any)
                expect(result.payload).toEqual(expectedResult)
            })
        })

    })

    describe("Render Movie Component", () => {
        describe('Render Component', () => {
            let wrapper: any
            beforeEach(() => {
                wrapper = render(
                    <Provider store={storeData}>
                        <Router>
                            <Movies/>
                        </Router>
                    </Provider>
                )
            })
    
            it('render component', () => {
                const { asFragment } = wrapper
                expect(asFragment()).toMatchSnapshot()
            })
        })
       
        describe('Function in component' , () => {
            let mockedFunction: any, wrapper: any
            beforeEach(() => {
                mockedFunction = jest.fn();
                wrapper = mount
                    ( 
                        <Provider store={storeData}>
                            <Router>
                                <Movies item={mockedFunction}/>
                            </Router>
                        </Provider>
                    )
            })


            it('test Delete Button', () => {
                wrapper.find('#delete').at(0).simulate('click')
                expect(mockedFunction.mock.calls.length).toEqual(0)
            })

            it('test Table Movies', () => {
                const table = wrapper.find('table')
                expect(table).toHaveLength(1)
            })

            it('test Search Input field', () => {
                const onSearchMock = jest.fn();
                wrapper.find("#search").simulate('change')
                expect(onSearchMock).toBeCalledTimes(0)
            })
        })



    })

    describe("Render AddMovies Component", () => {
        it('render component', () => {
            const wrapper = render(
                <Provider store={storeData}>
                    <Router>
                        <Add/>
                    </Router>
                </Provider>
            )
            const { asFragment } = wrapper
            expect(asFragment()).toMatchSnapshot()
        })
    })

    describe("Render EditMovies Component", () => {
        it('render component', () => {
            const wrapper = render(
                <Provider store={storeData}>
                    <Router>
                        <Edit/>
                    </Router>
                </Provider>
            )
            const { asFragment } = wrapper
            expect(asFragment()).toMatchSnapshot()
        })
    })


})
