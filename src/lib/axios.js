import axios from "axios";
import { ENV } from "./ENV";

export const axiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${ENV.TMDB_API_TOKEN}`,
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      window.location.href = "/error/network";
      return Promise.reject(error);
    }
   

    if (error.response.status >= 500) {
      window.location.href = "/error/500";
      return Promise.reject(error);
    }
    

    return Promise.reject(error);
  }
);
