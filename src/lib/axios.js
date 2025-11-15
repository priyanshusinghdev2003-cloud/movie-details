import axios from "axios"
import { ENV}from "./ENV"


export const  axiosInstance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
   headers: {
    accept: 'application/json',
    Authorization: `Bearer ${ENV.TMDB_API_TOKEN}`
  
   }
})