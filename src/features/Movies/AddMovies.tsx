import React from "react"
import style from './movies.module.css'
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { addMovie } from "./moviesSlice";

const Add = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch();
    const { register, handleSubmit, formState: {errors} } = useForm()

    const onSubmitForm = (e: any) => {
        dispatch(addMovie(e))
        navigate('/')
    }

    return (
        <div className={style.formStyle}>
            <form onSubmit={handleSubmit(onSubmitForm)}>
                <h1 className={style.topHeader}>Create Movie</h1>
                <div className={style.formGroup}>
                    <label>Id:</label>
                    <input className={style.inputField} type="text"
                    {...register("id", {
                    pattern: { value: /\d+/, 
                    message: "Imdb_votes field should contains only numbers!" }, required: "Title is required"
                    })}
                    />
                    {errors.id?.type === "required" ?
                    <p className={style.error}>{errors.id.message}</p> : 
                    null}
                    {errors.id?.type === "pattern" ? 
                    <p className={style.error}>{errors.id.message}</p> :
                    null}
                </div>
                <div className={style.formGroup}>
                    <label>Title:</label>
                    <input className={style.inputField} type="text" 
                    {...register("title", {required: "Title is required"})}/>
                    {errors.title?.type === "required" ? 
                    <p className={style.error}>{errors.title.message}</p> : 
                    null}
                </div>
                <div className={style.formGroup}>
                    <label>Director:</label>
                    <input className={style.inputField} type="text" 
                    {...register("director", {required: "Director is required"})} 
                    />
                    {errors.director?.type === "required" ? 
                    <p className={style.error}>{errors.director.message}</p> : 
                    null}
                </div>
                <div className={style.formGroup}>
                    <label>Distributor:</label>
                    <input className={style.inputField} type="text" 
                    {...register("distributor", 
                    {required: "Distributor is required"})} 
                    />
                    {errors.distributor?.type === "required" ? 
                    <p className={style.error}>{errors.distributor.message}</p> : 
                    null}
                </div>
                <div className={style.formGroup}>
                    <label>Imdb_rating:</label>
                    <input className={style.inputField} type="text" 
                    {...register("imdb_rating", {required: "Imdb_rating is required", 
                    pattern: { value: /^[\d]{1}.[\d]{1}/, 
                    message: "Imdb_rating field should contains only numbers!"} } )} 
                    />
                    {errors.imdb_rating?.type === "required" ? 
                    <p className={style.error}>{errors.imdb_rating.message}</p> : 
                    null}
                    {errors.imdb_rating?.type === "pattern" ? 
                    <p className={style.error}>{errors.imdb_rating.message}</p> : 
                    null}
                </div>
                <div className={style.formGroup}>
                    <label>Imdb_votes:</label>
                    <input className={style.inputField} type="text" 
                    {...register("imdb_votes", {required: "Imdb_votes is required", 
                    pattern: { value: /\d+/, message: "Imdb_votes field should contains only numbers!" } })} 
                    />
                    {errors.imdb_votes?.type === "required" ? 
                    <p className={style.error}>{errors.imdb_votes.message}</p> : 
                    null}
                    {errors.imdb_votes?.type === "pattern" ? 
                    <p className={style.error}>{errors.imdb_votes.message}</p> : 
                    null}
                </div>
                <div className={style.buttonGroup}>
                    <input className={style.submitButton} type="submit" value="Save movie"/>
                </div>
                
            </form>
        </div>
    )
}

export default Add