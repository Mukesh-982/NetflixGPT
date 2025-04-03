import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Browse from './components/Browse'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/browse' element={<Browse />} />
      </Routes>
    </div>
  )
}

export default App
