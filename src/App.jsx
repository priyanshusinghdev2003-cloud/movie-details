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
import Error404 from "./pages/ErrorPage/NotFound"
import Error500 from "./pages/ErrorPage/ServerError"
import NetworkError from "./pages/ErrorPage/NetworkError"
import FAQ from "./pages/InfoPage/FAQ"
import HelpCenter from "./pages/InfoPage/HelpCenter"
import Privacy from "./pages/InfoPage/Privacy"
import Terms from "./pages/InfoPage/Terms"
import CookiePreferences from "./pages/InfoPage/CookiePreferences"
import Contact from "./pages/InfoPage/Contact"

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
