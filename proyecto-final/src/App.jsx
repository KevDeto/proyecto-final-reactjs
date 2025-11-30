import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { useAuth } from "./context/AuthContext.jsx";
import Menusection from './components/Menusection/Menusection.jsx'
import Homepage from './components/Homepage/Homepage.jsx'
import Cart from './components/Cart/Cart.jsx'
import Protectedroutes from './components/Login/Protectedroutes.jsx'
import Login from './components/Login/Login.jsx'
import 'react-toastify/dist/ReactToastify.css';
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
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </Router>
  )
}

export default App
