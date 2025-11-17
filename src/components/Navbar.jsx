import {LogOut} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';
import { BookMarked } from "lucide-react";

function Navbar() {
 const {loginWithGoogle,user,logout}= useAuthStore()
  return (
    <nav className="h-[70px] w-full background fixed top-0 left-0 z-50">
      <div className="max-w-[1350px] mx-auto flex items-center justify-between px-4 h-full">
       <Link to={"/"}> <img
          src="/screenflix-icon.svg"
          alt="ScreenFlix Logo"
         className='max-w-[34%]'
          /></Link>
         

        {user ? (
           <div className='flex items-center gap-5'>
            <Link to={"/user/wishlist"}>
            <BookMarked className='cursor-pointer text-gray-200'/>
            </Link>
          <LogOut className='cursor-pointer text-red-500' onClick={logout} />
           </div>
        ) :(<button className="btn-red text-sm px-4 py-2 cursor-pointer" onClick={loginWithGoogle}>
          Sign In
        </button>)}
      </div>
    </nav>
  );
}

export default Navbar;
