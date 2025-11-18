import { LogOut, BookMarked, User2 } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const { loginWithGoogle, user, logout } = useAuthStore();
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <nav className="h-[70px] w-full background fixed top-0 left-0 z-50">
      <div className="max-w-[1350px] mx-auto flex items-center justify-between px-4 h-full">
        <Link to={"/"}>
          <img
            src="/screenflix-icon.svg"
            alt="ScreenFlix Logo"
            className="max-w-[34%]"
          />
        </Link>

        {/* laptop */}
        {user ? (
          <div className="hidden md:flex items-center gap-5">
            <Link to="/user/wishlist">
              <BookMarked className="cursor-pointer text-gray-200 hover:text-white transition" />
            </Link>

            <LogOut
              className="cursor-pointer text-red-500 hover:text-red-400 transition"
              onClick={logout}
            />
          </div>
        ) : (
          <button
            className="btn-red text-sm md:px-4 px-2 py-2 cursor-pointer hidden md:block"
            onClick={loginWithGoogle}
          >
            Sign In
          </button>
        )}

 {/* mobile */}
        {user ? (
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="md:hidden text-white"
          >
            <User2 size={26} />
          </button>
        ) : (
          <button
            onClick={loginWithGoogle}
            className="btn-red text-xs px-3 py-1 md:hidden"
          >
            Sign In
          </button>
        )}
      </div>

     
      {openMenu && user && (
        <div className="md:hidden absolute right-4 top-[70px] bg-[#0d0d0d] py-3 px-4 rounded-xl shadow-xl border border-white/10 w-40 animate-fade-in">
          
          <Link
            to="/user/wishlist"
            onClick={() => setOpenMenu(false)}
            className="flex items-center gap-3 text-gray-200 py-2 hover:text-white transition"
          >
            <BookMarked size={20} />
            Wishlist
          </Link>

          <button
            onClick={() => {
              logout();
              setOpenMenu(false);
            }}
            className="flex items-center gap-3 text-red-400 py-2 hover:text-red-300 w-full transition"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;


