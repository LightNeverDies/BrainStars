import React, { useMemo } from "react"
import style from './movies.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMovies, editMovie } from './moviesSlice';
import { useForm } from "react-hook-form";

const Edit = () => {

    const navigate = useNavigate()
    
    const dispatch = useDispatch()
    const { editField } = useSelector(getMovies)
    const { register, handleSubmit, formState: {errors} } = useForm({
        defaultValues: useMemo(() => {
            return editField
        },[editField]),
        criteriaMode: 'all',
        mode: 'onBlur'
    })

    const onSubmitForm = (e:any) => {
        const data = {editField: e, previousId: editField.id}
        dispatch(editMovie(data))
        navigate('/')
    }

    return (
        <div className={style.formStyle}>
        <form onSubmit={handleSubmit(onSubmitForm)}>
            <h1 className={style.topHeader}>Edit Movie with ID {editField?.id}</h1>
            <div className={style.formGroup}>
                <label>Id:</label>
                <input className={style.inputField}
                {...register("id", {required: "Id is required",
                pattern: { value: /^[0-9]+$/, 
                message: "Imdb_votes field should contains only numbers!" }})} 
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
                {...register("title", {required: "Title is required"})} 
                />
                {errors.title?.type === "required" ? 
                <p className={style.error}>{errors.title.message}</p> : 
                null}
            </div>
            <div className={style.formGroup}>
                <label>Director:</label>
                <input className={style.inputField} type="text" 
                {...register("director", {required: "Director is required"})} 
                />
                {errors.director?.type === "required" ? <p className={style.error}>{errors.director.message}</p> : null}
            </div>
            <div className={style.formGroup}>
                <label>Distributor:</label>
                <input className={style.inputField} type="text" 
                {...register("distributor", {required: "Distributor is required"})} 
                />
                {errors.distributor?.type === "required" ? 
                <p className={style.error}>{errors.distributor.message}</p> : 
                null}
            </div>
            <div className={style.formGroup}>
                <label>Imdb_rating:</label>
                <input className={style.inputField} type="text" 
                {...register("imdb_rating", {required: "Imdb_rating is required", 
                pattern: { value: /^[\d]{1}.[\d]{1}$/, message: "Imdb_rating field should contains only numbers!"} } )} 
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
                pattern: { value: /^[0-9]+$/, message: "Imdb_votes field should contains only numbers!" } })} 
                />
                {errors.imdb_votes?.type === "required" ? 
                <p className={style.error}>{errors.imdb_votes.message}</p> : 
                null}
                {errors.imdb_votes?.type === "pattern" ? 
                <p className={style.error}>{errors.imdb_votes.message}</p> : 
                null}
            </div>
            <div className={style.buttonGroup}>
                <input className={style.submitButton} type="submit" value="Update movie"/>
            </div>
            
        </form>
    </div>
    )
}

export default Edit