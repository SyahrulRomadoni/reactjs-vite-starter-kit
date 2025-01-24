// src/main.jsx

import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import React from 'react'
import ReactDOM from 'react-dom/client'

//import BrowserRouter dari react router
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
        <Toaster position="top-right"/>
    </React.StrictMode>,
)