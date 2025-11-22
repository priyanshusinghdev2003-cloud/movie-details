import { create } from "zustand";
import {
  addComment,
  addReply,
  getMovieComments,
  getReplies,
  removeCommentWithReplies
} from "../lib/commentsdb";

import { toast } from "react-hot-toast";

export const useCommentStore = create((set, get) => ({
  isLoading: false,
  isAddingComment: false,
  isDeleting: false,

  comments: [],
  replies: {},

  AddCommentToDB: async ({ userId, movieId, comment,username }) => {
    try {
      set({ isAddingComment: true });

      const doc = await addComment(userId, movieId, comment,username);

      if (doc) {
        toast.success("Comment added!");
        set((state) => ({
          comments: [doc, ...state.comments],
        }));
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment.");
    } finally {
      set({ isAddingComment: false });
    }
  },

  fetchMovieComments: async ({movieId}) => {
    try {
      set({ isLoading: true });

      const res = await getMovieComments(movieId);

      set({
        comments: res?.documents || [],
      });
    } catch (error) {
      console.error("Error fetching comments:", error);
      toast.error("Failed to load comments.");
    } finally {
      set({ isLoading: false });
    }
  },

  fetchReplies: async ({commentId}) => {
    try {
      set((state) => ({
        replies: { ...state.replies, [commentId]: "loading" },
      }));

      const res = await getReplies(commentId);

      set((state) => ({
        replies: {
          ...state.replies,
          [commentId]: res?.documents || [],
        },
      }));
    } catch (error) {
      console.error("Error fetching replies:", error);
      toast.error("Failed to load replies.");
    }
  },

 
  AddReplyToDB: async ({ userId, movieId, comment, parentId, parentReplies,username }) => {
    try {
      set({ isAddingComment: true });

      await addReply(userId, movieId, comment, parentId, parentReplies,username);

      toast.success("Reply added!");

      await get().fetchReplies({commentId:parentId});

      // Update reply count in parent in UI too
      set((state) => ({
        comments: state.comments.map((c) =>
          c.$id === parentId ? { ...c, replies: c.replies + 1 } : c
        ),
      }));
    } catch (error) {
      console.error("Error adding reply:", error);
      toast.error("Failed to add reply.");
    } finally {
      set({ isAddingComment: false });
    }
  },

 
  deleteComment: async (commentId) => {
    try {
      set({ isDeleting: true });

      await removeCommentWithReplies(commentId);

      toast.success("Comment deleted!");

      // Remove from local state
      set((state) => ({
        comments: state.comments.filter((c) => c.$id !== commentId),
      }));

      // Remove replies from local state
      set((state) => {
        const updatedReplies = { ...state.replies };
        delete updatedReplies[commentId];
        return { replies: updatedReplies };
      });
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Failed to delete comment.");
    } finally {
      set({ isDeleting: false });
    }
  },
  updateComment: async({id, editText})=>{

  }
}));
