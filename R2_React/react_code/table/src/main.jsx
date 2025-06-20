import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import SortableFilterableTable from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SortableFilterableTable />
  </StrictMode>,
)
