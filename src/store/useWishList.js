import { create } from "zustand";
import { addToWishlist, getWishlist, removeWishlist } from "../lib/wishList.js";

export const useWishlistStore = create((set, get) => ({

  wishlist: [],
  loading: false,

  fetchWishlist: async ({userId}) => {
    if (!userId) return;

    set({ loading: true });

    try {
  
      const res = await getWishlist(userId);
      set({ wishlist: res.documents });
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    } finally {
      set({ loading: false });
    }
  },

  
  addItem: async ({userId, movie}) => {
    if (!userId) return;

    const exists = get().wishlist.some(
      (i) => i.movieId === String(movie.id)
    );
    if (exists) return;

    try {
      const doc = await addToWishlist(userId, movie);
      set({ wishlist: [...get().wishlist, doc] });
    } catch (err) {
      console.error("Error adding wishlist:", err);
    }
  },


  removeItem: async (docId) => {
    try {
      await removeWishlist(docId);
      set({
        wishlist: get().wishlist.filter((item) => item.$id !== docId),
      });
    } catch (err) {
      console.error("Error removing wishlist:", err);
    }
  },

}));
