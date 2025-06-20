import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ChipsInput from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChipsInput />
  </StrictMode>,
)
