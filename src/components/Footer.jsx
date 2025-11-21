import React from "react";
import {useAuthStore} from "../store/useAuthStore"
import { FacebookIcon, Github, TwitterIcon, X } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  const {user} = useAuthStore()
  return (
    <footer className="bg-black text-gray-400 py-12 mt-10 border-t border-gray-800">
      <div className="max-w-[1350px] mx-auto px-6">
        <div className="flex items-center gap-3 mb-6">
          <img
            src="/screenflix-icon.svg"
            alt="ScreenFlix logo"
            className="max-w-[32%]"
          />
         {user &&  <span className="text-white text-xl font-semibold">Hello, {user?.name}</span>}
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-10">
          <Link className="footer-link" to="/faq">FAQ</Link>
          <Link className="footer-link" to="/help">Help Center</Link>
          <a className="footer-link" href="#">Account</a>
        
          <Link className="footer-link" to="/user/wishlist">Wishlist</Link>
          <Link className="footer-link" to="/privacy">Privacy</Link>
   
          <Link className="footer-link" to="/terms">Terms of Use</Link>
          <Link className="footer-link" to="/cookies">Cookie Preferences</Link>
          <Link className="footer-link" to="/contact">Contact Us</Link>
        </div>
        <div className="flex gap-5 mb-8">
          <FacebookIcon className="hover:text-white transition cursor-pointer" />
          <TwitterIcon className="hover:text-white transition cursor-pointer" />
          <Github className="hover:text-white transition cursor-pointer" />
        </div>
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} ScreenFlix — Made for movie lovers.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
