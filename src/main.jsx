import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Paquetes externos
import {BrowserRouter} from "react-router-dom"

// Contexto
import {AuthWrapper} from "./context/auth.context"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthWrapper>
        <App />
      </AuthWrapper>
    </BrowserRouter>
  </React.StrictMode>
)
