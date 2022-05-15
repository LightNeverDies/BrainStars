import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import style from './movies.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, getMovies, 
  searchMovie, deleteMovie, getMovieForEdit } from './moviesSlice';

const Movies = (props?: any) => {

  const navigate = useNavigate()

  const dispatch = useDispatch();
  const getFilteredMovies = useSelector(getMovies);

  useEffect(() => {
      dispatch(fetchMovies())
  }, [dispatch]);

  const renderHeader = () => {
    return (
      <tr key={"header"}>
        <th className={style.rowHeader}>ID</th>
        <th className={style.rowHeader}>TITLE</th>
        <th className={style.rowHeader}>DIRECTOR</th> 
        <th className={style.rowHeader}>DISTRIBUTOR</th> 
        <th className={style.rowHeader}>IMDB_RATING</th> 
        <th className={style.rowHeader}>IMDB_VOTES</th> 
        <th className={style.rowHeader}>ACTIONS</th>  
      </tr>
    )
  }

  const renderBody = () => {
    return getFilteredMovies.filterData ? getFilteredMovies.filterData.map((item: any, index:number) => {
      return (
        <tr key={index} className={style.row}>
          <td>{item.id}</td>
          <td>{item.title}</td>
          <td>{item.director}</td>
          <td>{item.distributor}</td>
          <td>{item.imdb_rating}</td>
          <td>{item.imdb_votes}</td>
          <td>
            <button id="edit" onClick={() => navigateToEdit(item)}>Edit</button> 
            <button id="delete" onClick={() => deleteItem(item) }>Delete</button>
          </td>
        </tr>
      )
    }) : null
  }

  const deleteItem = (item: any) => {
    dispatch(deleteMovie(item))
  }

  const searchBy = (e: any) => {
    setTimeout(() => {
      dispatch(searchMovie(e.target.value))
    }, 1000)

  }

  const navigateToAdd = () => {
    navigate('/add')
  }

  const navigateToEdit = (item:any) => {
    navigate(`/edit/${item.id}`)
    dispatch(getMovieForEdit(item))
  }

  return (
    <div>
      <p className={style.successMessage}>{getFilteredMovies?.successfulMessage}</p>
      <div className={style.container}>
        <div className={style.sides}/>
        <div className={style.column}>
          <div className={style.searchContainer}>
            <input id="search" placeholder='Search' onChange={(e) => searchBy(e)}/>
          </div>
          <div className={style.innerContainer}>
            <h1>Movies</h1>
            <button id="add" className={style.buttonStyle} onClick={() => navigateToAdd()}>Add</button>
          </div>
        </div>
        <div className={style.sides}/>
      </div>
    
      <div className={style.tableFix}>
        <table>
            <thead>
              {renderHeader()}
            </thead>
            <tbody>
              {renderBody()}
            </tbody>
        </table>
      </div>
      
    </div>
    
  );
};

export default Movies;