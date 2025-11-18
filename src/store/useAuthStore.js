import axios from "axios";
import { create } from "zustand";
import { account } from "../lib/appwrite";

export const useAuthStore = create((set, get) => ({
  region: null,
  language: "en-US",
  user: null,
  loadingUser: false,
  authInitialized: false,

  getUserRegion: async () => {
    const savedRegion = sessionStorage.getItem("user_region");
    const savedLanguage = sessionStorage.getItem("user_language");

    if (get().region && get().language) return;

    if (savedRegion && savedLanguage) {
      set({ region: savedRegion, language: savedLanguage });
      return;
    }

    try {
      const { data } = await axios.get("https://ipapi.co/json/");

      const countryCode = data.country_name;
      const languageCode = data.languages;

      set({
        region: countryCode,
        language: languageCode,
      });

      sessionStorage.setItem("user_region", countryCode);
      sessionStorage.setItem("user_language", languageCode);
    } catch (error) {
      console.error("Failed to fetch region:", error);
    }
  },

  loginWithGoogle: () => {
     const currentUser = get().user
   if(currentUser) return
    const successURL = `${window.location.origin}/auth/success`;
    const failureURL = `${window.location.origin}/auth/failure`;

    account.createOAuth2Session("google", successURL, failureURL);
  },

  getCurrentUser: async () => {
    const currentUser = get().user
   if(currentUser) return
    set({ loadingUser: true });
    try {
      const userData = await account.get();
      set({ user: userData });
    } catch (err) {
      set({ user: null });
    } finally {
      set({ loadingUser: false, authInitialized: true });
    }
  },

  logout: async () => {
    try {
      await account.deleteSession("current");
      set({ user: null });
    } catch (err) {
      console.error("Logout error:", err);
    }
  },
}));
