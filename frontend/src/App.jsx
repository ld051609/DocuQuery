import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './page/Homepage/Homepage'
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup' 
import About from './page/Aboutpage/Aboutpage'
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App