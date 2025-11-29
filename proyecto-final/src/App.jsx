import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Menusection from './components/Menusection/Menusection.jsx'
import Homepage from './components/Homepage/Homepage.jsx'
import Cart from './components/Cart/Cart.jsx'
import { useAuth } from "./context/AuthContext.jsx";
import Protectedroutes from './components/Login/Protectedroutes.jsx'
import Login from './components/Login/Login.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {
      const { isAuthenticated } = useAuth();

  return (

      <Router>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/menu' element={<Menusection/>}/>
          <Route 
                path="/carrito" 
                element={
                    <Protectedroutes isAuthenticated={isAuthenticated}>
                        <Cart />
                    </Protectedroutes>
                } 
            />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
  )
}

export default App
