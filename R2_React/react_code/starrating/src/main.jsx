import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import StarRating from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StarRating totalStars={5} />
  </StrictMode>,
)
