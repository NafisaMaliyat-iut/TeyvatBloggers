import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage'
import Register from './pages/Register'
import Login from './pages/Login'
import UserHomepage from './pages/UserHomepage'
import { CreatePost } from './pages/CreatePost'
import Profile from './pages/Profile'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path = "/" element={<LandingPage/>}/>
        <Route path = "/register" element={<Register/>}/>
        <Route path = "/login" element={<Login/>}/>
        <Route path = "/home" element={<UserHomepage/>}/>
        <Route path = "/create-post" element={<CreatePost/>}/>
        <Route path = "/profile" element={<Profile/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
