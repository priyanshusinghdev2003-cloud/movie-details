import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Layout from "./components/Layout";
import { useAuthStore } from "./store/useAuthStore";
import { useWishlistStore } from "./store/useWishList";
import Authcheck from "./components/Authcheck";
import {
  CharacterInfo,
  Contact,
  CookiePreferences,
  DiscoverPage,
  Error404,
  Error500,
  FAQ,
  HelpCenter,
  Homepage,
  MovieDetailPage,
  NetworkError,
  Privacy,
  Terms,
} from "./pages";
import TvDetailPage from "./pages/TvDetailPage";

function App() {
  const { getUserRegion, user, getCurrentUser, loadingUser,region } = useAuthStore();
  const { fetchWishlist } = useWishlistStore();
  useEffect(() => {
    getUserRegion();
    getCurrentUser();
    if (user) {
      fetchWishlist({
        userId: user.$id,
      });
    }
  }, [region,user]);
  return (
    <>
      <Toaster />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="/auth/success" element={<Navigate to={"/"} />} />
          <Route path="/movie-detail/:id" element={<MovieDetailPage />} />
          <Route path="/tv-detail/:id" element={<TvDetailPage />} />
          <Route path="/user/wishlist" element={<Authcheck />} />
          <Route path="/discover/*" element={<DiscoverPage />} />
          <Route path="/charcter-info/:id" element={<CharacterInfo />} />

          {/* Error */}
          <Route path="*" element={<Error404 />} />
          <Route path="/error/500" element={<Error500 />} />
          <Route path="/error/network" element={<NetworkError />} />

          {/* Info */}
          <Route path="/faq" element={<FAQ />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/cookies" element={<CookiePreferences />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
