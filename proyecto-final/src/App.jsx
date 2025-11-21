import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header.jsx'
import Homepage from './components/Homepage/Homepage.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css'

function App() {

  return (
    <Router>
      <Homepage/>
      <Routes>
        <Route path='/asd' element={<Homepage/>}/>
      </Routes>
    </Router>
  )
}

export default App
