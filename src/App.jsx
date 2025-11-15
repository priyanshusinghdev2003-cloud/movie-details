import React, { useEffect } from 'react'
import {Navigate, Route, Routes} from "react-router-dom"
import Layout from './components/Layout'
import Homepage from './pages/Homepage'
import { useAuthStore } from './store/useAuthStore'

function App() {
  const {getUserRegion,user,getCurrentUser}=useAuthStore()
  console.log(user)
  useEffect(()=>{
    getUserRegion()
    getCurrentUser()
  },[])
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path='/auth/success' element={<Navigate to={"/"} />} />
      </Route>
    </Routes>
  )
}

export default App
