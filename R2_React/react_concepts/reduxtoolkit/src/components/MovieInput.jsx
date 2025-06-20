import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addMovie } from '../movieSlice'
import './MovieInput.css'

export const MovieInput = () => {
  const [movieName, setMovieName] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (movieName.trim()) {
      dispatch(addMovie(movieName.trim()))
      setMovieName('')
    }
  }

  return (
    <div className="movie-input">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
          placeholder="Enter movie name"
          className="movie-input-field"
        />
        <button type="submit" className="add-button">
          Add Movie
        </button>
      </form>
    </div>
  )
}

