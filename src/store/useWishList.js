import { create } from "zustand";
import { addToWishlist, getWishlist, removeWishlist } from "../lib/wishlist";

export const useWishlistStore = create((set, get) => ({

  wishlist: [],
  loading: false,

  // -------------------------------
  // Fetch wishlist for specific user
  // -------------------------------
  fetchWishlist: async ({userId}) => {
    if (!userId) return;

    set({ loading: true });

    try {
  
      const res = await getWishlist(userId);
      console.log(res)
      set({ wishlist: res.documents });
    } catch (err) {
      console.error("Error fetching wishlist:", err);
    } finally {
      set({ loading: false });
    }
  },

  // -------------------------------
  // Add movie to wishlist
  // -------------------------------
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

  // -------------------------------
  // Remove from wishlist
  // -------------------------------
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
