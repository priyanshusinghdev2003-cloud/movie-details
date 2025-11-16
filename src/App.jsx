import React, { useEffect } from 'react'
import {Navigate, Route, Routes} from "react-router-dom"
import Layout from './components/Layout'
import Homepage from './pages/Homepage'
import { useAuthStore } from './store/useAuthStore'
import { useWishlistStore } from './store/useWishList'
import MovieDetailPage from './pages/MovieDetailPage'

function App() {
  const {getUserRegion,user,getCurrentUser}=useAuthStore()
  const {fetchWishlist}=useWishlistStore()
  useEffect(()=>{
    getUserRegion()
    getCurrentUser()
    if(user){
      fetchWishlist({
        userId: user.$id
      })
    }
  },[user])
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path='/auth/success' element={<Navigate to={"/"} />} />
        <Route path='/movie-detail/:id' element={<MovieDetailPage />} />
      </Route>
    </Routes>
  )
}

export default App
