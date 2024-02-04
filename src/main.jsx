import React from 'react'
import ReactDOM from 'react-dom/client'
import { Footer } from './components/Footer/Footer.jsx'
import { Container } from './components/Container.jsx'
import { Header } from './components/Header/Header.jsx'
import './index.css'

 
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Header/>
    <Container/>
    <Footer/>
  </React.StrictMode>,
)
