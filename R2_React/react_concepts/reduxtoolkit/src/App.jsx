import React from 'react'
import { MovieList } from './components/MovieList'
import { MovieInput } from './components/MovieInput'
import './App.css'

const App = () => {
  return (
    <div className="app-container">
      <h1>Movie Manager</h1>
      <MovieInput />
      <MovieList />
    </div>
  )
}

export default App