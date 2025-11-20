import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Layout from "./components/Layout";
import Homepage from "./pages/Homepage";
import { useAuthStore } from "./store/useAuthStore";
import { useWishlistStore } from "./store/useWishList";
import MovieDetailPage from "./pages/MovieDetailPage";
import WishListPage from "./pages/WishListPage";
import Authcheck from "./components/Authcheck";
import DiscoverPage from "./pages/DiscoverPage";
import CharacterInfo from "./pages/CharacterInfo"

function App() {
  const { getUserRegion, user, getCurrentUser,loadingUser } = useAuthStore();
  const { fetchWishlist } = useWishlistStore();
  useEffect(() => {
    getUserRegion();
    getCurrentUser();
    if (user) {
      fetchWishlist({
        userId: user.$id,
      });
    }
  }, [user]);
  return (
   <>
   <Toaster />
   
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="/auth/success" element={<Navigate to={"/"} />} />
        <Route path="/movie-detail/:id" element={<MovieDetailPage />} />
        <Route
          path="/user/wishlist"
          element={ <Authcheck />}
        />
        <Route path="/discover/*" element={<DiscoverPage />} />
        <Route path="/charcter-info/:id" element={<CharacterInfo />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;
