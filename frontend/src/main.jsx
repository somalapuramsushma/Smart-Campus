
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './output.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"
import { BuildingContextProvider } from './context/buildingsContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <BuildingContextProvider>
        <App />
      </BuildingContextProvider>
    </BrowserRouter>
  </StrictMode>,
)





