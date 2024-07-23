import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './indes.css';
import './App.css'
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import UploadSong from './components/popups/uploadSong'


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/sandbox" element={<UploadSong/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
