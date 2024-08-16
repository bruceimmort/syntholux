import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useAuth } from '../src/context/authContext';
import React from 'react'
import Home from './pages/home'
import Signup from './pages/auth/signup';
import Login from './pages/auth/login';

function App() {
  const { userLoggedIn } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={userLoggedIn ? <Home/> : <Login/>}></Route>
        <Route path="/sandbox" element={<Signup/>}></Route>
        <Route path="/login" element={<Login/> }></Route>
        <Route path="/signup" element={<Signup/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
