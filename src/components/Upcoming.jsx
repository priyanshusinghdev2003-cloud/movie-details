import React, { useEffect } from 'react'
import { useMovieApi } from '../movieApi/useGetMovie'
import { useAuthStore } from '../store/useAuthStore'
import { useWishlistStore } from '../store/useWishList'
import MovieCard from './MovieCard'

function Upcoming() {
   const {upcomingMovie,getUpComingMovie,language} =  useMovieApi()
   const {user} =useAuthStore()
   const {wishlist}=useWishlistStore()
   useEffect(()=>{
    if(!upcomingMovie){
        getUpComingMovie({
          language
        })
    }
   },[])
  return (
    <div className='flex gap-4 overflow-scroll scrollbar-hide px-2'>
      
      {upcomingMovie && (
        upcomingMovie?.map((movie)=>(
          <div key={movie.id}>
             <div className=" bg-gradient-to-t from-black via-black/70 to-transparent"></div>
            <MovieCard movie={movie} />
          </div>
        ))
      )}
    </div>
  )
}

export default Upcoming