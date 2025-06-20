import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeMovie } from '../movieSlice'
import './MovieList.css'

export const MovieList = () => {
  const movies = useSelector((state) => state.movie.movies)
  const dispatch = useDispatch()

  const handleRemove = (index) => {
    dispatch(removeMovie(index))
  }

  return (
    <div className="movie-list">
      <h2>Movie List</h2>
      {movies.length === 0 ? (
        <p>No movies added yet</p>
      ) : (
        <ul>
          {movies.map((movie, index) => (
            <li key={index} className="movie-item">
              <span>{movie}</span>
              <button 
                onClick={() => handleRemove(index)}
                className="remove-button"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
