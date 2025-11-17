import React, { useEffect } from 'react'
import {useMovieApi} from "../movieApi/useGetMovie"
import { useAuthStore } from '../store/useAuthStore'
import Hero from '../components/Hero'
import Upcoming from "../components/Upcoming"
import Trending from "../components/TRending"

function Homepage() {
  const {getFeaturedMovie,featuredMovie}=useMovieApi()
  const {region,language}=useAuthStore()
  useEffect(()=>{
    if(region && language){
      getFeaturedMovie({
      region,language
    })
    }
  },[region,language])
  return (
    <div >
      <Hero featuredMovie={featuredMovie} />
      <Trending />
      {/* <Upcoming /> */}
    </div>
  )
}

export default Homepage