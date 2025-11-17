import { databases, ID } from "./appwrite";
import { Query } from "appwrite";

const DB_ID = import.meta.env.VITE_APPWRITE_DB_ID;
const TABLE_ID = import.meta.env.VITE_APPWRITE_WISHLIST_TABLE_ID;

// Add new item
export const addToWishlist = async (userId, movie) => {
  return await databases.createDocument(
    DB_ID,
    TABLE_ID,
    ID.unique(),
    {
      userId,
      movieId: String(movie.id),
      title: movie.title,
      poster_path: movie.poster_path,
      backdrop: movie.backdrop_path
    }
  );
};

// Remove item
export const removeWishlist = async (docId) => {
  return await databases.deleteDocument(DB_ID, TABLE_ID, docId);
};

// Get logged user's wishlist
export const getWishlist = async (userId) => {
  return await databases.listDocuments(DB_ID, TABLE_ID, [
    Query.equal("userId", userId)
  ]);
};
