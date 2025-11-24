import React, { useEffect } from 'react'
import { useMovieApi } from '../movieApi/useGetMovie'
import { useAuthStore } from '../store/useAuthStore'
import { useWishlistStore } from '../store/useWishList'
import MovieCard from './MovieCard'
import ShimmerCard from './ShimmerCard'
import {motion} from "framer-motion"
function Upcoming() {
   const {upcomingMovie,getUpComingMovie,language,isLoading} =  useMovieApi()
   const {user} =useAuthStore()
   const {wishlist}=useWishlistStore()
   useEffect(()=>{
    if(!upcomingMovie){
        getUpComingMovie({
          language
        })
    }
   },[language])
  return (
    <div className="py-2 px-5">
      <div className="flex items-center gap-3 h-24">
        {upcomingMovie && <h1 className="text-2xl font-bold">What's Upcoming</h1>}
      </div>
      
       <div className="flex gap-4 overflow-x-auto scrollbar-hide px-2 pb-3">
        {isLoading
          ? [...Array(8)].map((_, i) => <ShimmerCard key={i} />)
          : upcomingMovie?.map((movie, index) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <MovieCard movie={movie} lazy />
              </motion.div>
            ))}
      </div>
    </div>
  )
}

export default Upcoming