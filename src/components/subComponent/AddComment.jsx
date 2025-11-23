import React, { useRef, useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { useCommentStore } from "../../store/useCommentStore";
import { toast } from "react-hot-toast";
import AvatarInitial from "../common/AvatarCommon";

function AddComment({movieId}) {
  const { user } = useAuthStore();
  const { isAddingComment, AddCommentToDB, fetchMovieComments } =
    useCommentStore();

  const [newComment, setNewComment] = useState("");

  const mainInputRef = useRef(null);

  const postComment = async () => {
    if (!user) return toast.error("Sign in to comment");
    if (!newComment.trim()) return;

    try {
      await AddCommentToDB({
        userId: user.$id,
        movieId,
        comment: newComment,
        username: user?.name.replace(/\s+/g, "").toLowerCase(),
      });
      setNewComment("");
      // refresh
      await fetchMovieComments({ movieId: String(movieId) });
    } catch (err) {
      console.error(err);
      toast.error("Failed to post comment");
    }
  };
  return (
    <div className="flex gap-3 items-start mb-6">
      <AvatarInitial
        name={user?.name || "User"}
        id={user?.$id || "anon"}
        size={44}
      />
      <div className="flex-1">
        <textarea
          ref={mainInputRef}
          rows={3}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder={
            user ? "Share your thoughts..." : "Sign in to join the discussion"
          }
          className="w-full bg-gray-900 p-3 rounded-lg text-white outline-none resize-none"
          disabled={!user}
        />
        <div className="flex items-center justify-between mt-2">
          <div className="text-sm text-gray-400">
            Be respectful. No spoilers.
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setNewComment("")}
              className="px-3 py-1 text-sm rounded hover:bg-gray-800 hidden sm:inline"
            >
              Cancel
            </button>
            <button
              onClick={postComment}
              disabled={!user || !newComment.trim() || isAddingComment}
              className="bg-red-600 px-4 py-1 rounded text-white font-semibold cursor-pointer"
            >
              {isAddingComment ? "Posting..." : "Post"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddComment;
