import React from 'react'
import WishListPage from '../pages/WishListPage';
import { useAuthStore } from '../store/useAuthStore';

function Authcheck() {
 const { user, authInitialized } = useAuthStore();
if (!authInitialized) {
  return null; 
}
if (!user) {
  return <Navigate to="/" />;
}

return <WishListPage />;
}

export default Authcheck