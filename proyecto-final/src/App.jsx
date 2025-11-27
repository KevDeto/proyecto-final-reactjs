import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Menusection from './components/Menusection/Menusection.jsx'
import Homepage from './components/Homepage/Homepage.jsx'
import Cart from './components/Cart/Cart.jsx'

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css'

function App() {

  return (
      <Router>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/menu' element={<Menusection/>}/>
          <Route path='/carrito' element={<Cart/>}/>
        </Routes>
      </Router>
  )
}

export default App
