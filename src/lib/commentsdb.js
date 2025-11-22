import { databases, ID } from "./appwrite";
import { Query } from "appwrite";

const DB_ID = import.meta.env.VITE_APPWRITE_DB_ID;
const TABLE_ID = import.meta.env.VITE_APPWRITE_Comments_TABLE_ID;

export const addComment = async (userId, movieId, comment, username) => {
  return await databases.createDocument(DB_ID, TABLE_ID, ID.unique(), {
    userId,
    movieId: String(movieId),
    comment,
    replies: 0,
    username,
    parentId: "",
  });
};

export const addReply = async (
  userId,
  movieId,
  comment,
  parentId,
  parentReplies,
  username
) => {

  await databases.createDocument(DB_ID, TABLE_ID, ID.unique(), {
    userId,
    parentId,
    movieId: String(movieId),
    comment,
    username,
    replies: 0,
  });

  await databases.updateDocument(DB_ID, TABLE_ID, parentId, {
    replies: parentReplies + 1,
  });
};

export const removeCommentWithReplies = async (commentId) => {
  const replies = await databases.listDocuments(DB_ID, TABLE_ID, [
    Query.equal("parentId", commentId),
  ]);
  for (const reply of replies.documents) {
    await databases.deleteDocument(DB_ID, TABLE_ID, reply.$id);
  }
  await databases.deleteDocument(DB_ID, TABLE_ID, commentId);
};

export const getMovieComments = async (movieId) => {
  return await databases.listDocuments(DB_ID, TABLE_ID, [
    Query.equal("movieId", movieId),
    Query.equal("parentId", ""),
    Query.orderDesc("$createdAt"),
  ]);
};

export const getReplies = async (commentId) => {
  return await databases.listDocuments(DB_ID, TABLE_ID, [
    Query.equal("parentId", commentId),
    Query.orderAsc("$createdAt"),
  ]);
};
