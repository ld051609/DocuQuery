import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './page/Homepage/Homepage'
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup' 
import About from './page/Aboutpage/Aboutpage'
import Chatbot from './page/Chatbot/Chatbot'
import { FilenameProvider } from './FilenameContext'
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <FilenameProvider>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About/>} />
            <Route path="*" element={<h1>Not Found</h1>} />
            <Route path="/chatbot" element={<Chatbot/>} />
          </Routes>

        </FilenameProvider>
      </BrowserRouter>
    </div>
  )
}

export default App