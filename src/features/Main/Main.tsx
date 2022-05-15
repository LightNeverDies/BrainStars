import React from "react"
import Header from '../../components/Header/Header'
import Movies from "../Movies/Movies"
import Edit from '../Movies/EditMovies'
import Add from '../Movies/AddMovies'

const Main = (props: any) => {

    const bodyRender = () => {
        switch(props.type) {
            case "normal":
                return (
                    <Movies/>
                )
            case "add":
                return (
                    <Add/>
                )
            case "edit":
                return (
                    <Edit/>
                )
        }
    }

    return (
        <>
            <Header/>
            {bodyRender()}
        </>
    )
}

export default Main