import React from "react";

function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-12 mt-10 border-t border-gray-800">
      <div className="max-w-[1350px] mx-auto px-6">

        {/* Logo */}
        <div className="flex items-center gap-3 mb-6">
          <img
            src="/screenflix-icon.svg"
            alt="ScreenFlix logo"
            className="max-w-[32%]"
          />
          <span className="text-white text-xl font-semibold">ScreenFlix</span>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-10">
          <a className="footer-link" href="#">FAQ</a>
          <a className="footer-link" href="#">Help Center</a>
          <a className="footer-link" href="#">Account</a>
        
          <a className="footer-link" href="#">Watchlist</a>
          <a className="footer-link" href="#">Privacy</a>
   
          <a className="footer-link" href="#">Terms of Use</a>
          <a className="footer-link" href="#">Cookie Preferences</a>
          <a className="footer-link" href="#">Contact Us</a>
        </div>

        {/* Social Icons */}
        <div className="flex gap-5 mb-8">
          <a href="#" className="hover:text-white transition">
            <svg width="24" height="24" fill="currentColor"><path d="M22 12.1c0-5.5-4.5-10-10-10S2 6.6 2 12.1c0 5 3.7 9.1 8.5 9.9v-7h-2.5v-2.9H10.5V9.4c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.3c-1.3 0-1.7.8-1.7 1.6v2h2.9l-.5 2.9h-2.4v7C18.3 21.2 22 17 22 12.1z"/></svg>
          </a>
          <a href="#" className="hover:text-white transition">
            <svg width="24" height="24" fill="currentColor"><path d="M24 4.6c-.9.4-1.8.6-2.8.8 1-.6 1.8-1.6 2.2-2.6-.9.6-2 .9-3.1 1.1C19.3 2.7 18 2 16.6 2c-2.8 0-5 2.3-5 5 0 .4 0 .8.1 1.2C7.7 7.9 4.1 5.9 1.7 2.9c-.5.8-.7 1.7-.7 2.7 0 1.7.9 3.2 2.3 4C2.3 9.5 1.6 9.3.9 9c0 2.4 1.8 4.4 4 4.9-.4.1-.9.2-1.3.2-.3 0-.6 0-.9-.1.6 2 2.5 3.5 4.7 3.6-1.7 1.3-3.8 2-6 2-.4 0-.7 0-1-.1 2.2 1.4 4.8 2.2 7.5 2.2 9 0 14-7.6 14-14.2v-.6c1-.8 1.8-1.6 2.5-2.5z"/></svg>
          </a>
          <a href="#" className="hover:text-white transition">
            <svg width="24" height="24" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 2 .3 2.5.5.6.2 1 .6 1.4 1.1.4.4.8.9 1 1.5.2.5.4 1.3.5 2.5.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 2-.5 2.5-.2.6-.6 1-1 1.4-.4.4-.9.8-1.5 1-.5.2-1.3.4-2.5.5-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-2-.3-2.5-.5-.6-.2-1-.6-1.4-1-.4-.4-.8-.9-1-1.5-.2-.5-.4-1.3-.5-2.5C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-2 .5-2.5.2-.6.6-1 1-1.4.4-.4.9-.8 1.5-1 .5-.2 1.3-.4 2.5-.5C8.4 2.2 8.8 2.2 12 2.2m0-2.2C8.7 0 8.3 0 7 0.1 5.6 0.2 4.6 0.4 3.8 0.7c-.9.3-1.7.7-2.4 1.4C.7 3 0.3 3.8.1 4.7c-.3.9-.5 1.9-.6 3.3C-.6 9.3-.6 9.7-.6 13s0 3.7.1 5c.1 1.4.3 2.4.6 3.3.3.9.7 1.7 1.4 2.4.7.7 1.5 1.1 2.4 1.4.9.3 1.9.5 3.3.6 1.3.1 1.7.1 5 .1s3.7 0 5-.1c1.4-.1 2.4-.3 3.3-.6.9-.3 1.7-.7 2.4-1.4.7-.7 1.1-1.5 1.4-2.4.3-.9.5-1.9.6-3.3.1-1.3.1-1.7.1-5s0-3.7-.1-5c-.1-1.4-.3-2.4-.6-3.3-.3-.9-.7-1.7-1.4-2.4-.7-.7-1.5-1.1-2.4-1.4-.9-.3-1.9-.5-3.3-.6C15.7 0 15.3 0 12 0z"/></svg>
          </a>
        </div>

        {/* Bottom text */}
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} ScreenFlix — Made for movie lovers.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
