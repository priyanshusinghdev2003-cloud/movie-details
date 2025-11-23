import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useCommentStore } from "../store/useCommentStore";
import { useAuthStore } from "../store/useAuthStore";
import { toast } from "react-hot-toast";
import timeAgoShort from "../utils/TimeAgo";
import AvatarInitial from "./common/AvatarCommon";
import CommentSkeleton from "./shimmer/CommentSkeletonshimmer";
import ReplyList from "./subComponent/ReplyList";
import ReplyBox from "./subComponent/ReplyBox";
import AddComment from "./subComponent/AddComment";

export default function CommentSystem({ movieId }) {
  const {
    fetchMovieComments,
    fetchReplies,
    AddCommentToDB,
    AddReplyToDB,
    deleteComment: storeDeleteComment,
    comments,
    replies,
    isLoading,
    isAddingComment,
  } = useCommentStore();

  const { user } = useAuthStore();

  
  const [openReplyBox, setOpenReplyBox] = useState(null);
  const [openReplies, setReplies] = useState(false);
  const [replyText, setReplyText] = useState({});
  const replyInputRef = useRef(null);
  

  const [sortMode, setSortMode] = useState("new");

  useEffect(() => {
    fetchMovieComments({ movieId: String(movieId) });
    gsap.from(".thread-vertical", {
      height: 0,
      duration: 0.6,
      ease: "power3.out",
    });
  }, [movieId]);

  useEffect(() => {
    if (openReplyBox && replyInputRef.current) {
      replyInputRef.current.focus();
    }
  }, [openReplyBox]);

  const onClickReplyButton = async (parent) => {
    if (!user) {
      toast.error("Sign in to reply");
      return;
    }
    if (user.$id == parent?.userId) {
      return;
    }
    // open reply box for parent
    setOpenReplyBox(parent.$id);
    setReplyText((p) => ({
      ...p,
      [parent.$id]: `@${parent.username || "user"} `,
    }));
    // lazily load replies (if not loaded)
    if (!replies[parent.$id]) {
      await fetchReplies({
        commentId: parent.$id,
      });
    }

    setTimeout(() => {
      if (replyInputRef.current) {
        replyInputRef.current.focus();
        // move caret to end
        const val = replyInputRef.current.value;
        replyInputRef.current.setSelectionRange(val.length, val.length);
      }
    }, 120);
  };


  // toggle replies button
  const toggleViewReplies = async (parent) => {
    setReplies((prev) => !prev);
    if (!replies[parent.$id]) {
      await fetchReplies({
        commentId: parent.$id,
      });
    }
  };

  // delete comments handler
  const handleDelete = async (commentId) => {
    if (!confirm("Delete this comment?")) return;
    try {
      await storeDeleteComment(commentId);
      toast.success("Deleted");
      await fetchMovieComments({ movieId: String(movieId) });
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete");
    }
  };

  // Sorting
  const sortedComments = React.useMemo(() => {
    if (!comments) return [];
    const arr = [...comments];
    if (sortMode === "new") {
      arr.sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt));
    } else {
      arr.sort((a, b) => new Date(a.$createdAt) - new Date(b.$createdAt));
    }
    return arr;
  }, [comments, sortMode]);

  return (
    <div className="max-w-3xl mx-auto py-8">
      {/* Header with optional asset */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">Discussion</h2>

        <div className="flex items-center gap-3">
          <select
            value={sortMode}
            onChange={(e) => setSortMode(e.target.value)}
            className="bg-gray-800 text-sm p-2 rounded"
          >
            <option value="new">New</option>
            <option value="old">Old</option>
          </select>
        </div>
      </div>

      {/*  new comment */}
      <AddComment movieId={movieId} />

      {/* Comments list */}
      <div className="space-y-6">
        {isLoading ? (
          <CommentSkeleton />
        ) : sortedComments.length === 0 ? (
          <div className="text-gray-400">
            No comments yet — be the first to comment.
          </div>
        ) : (
          sortedComments.map((c) => (
            <motion.div
              key={c.$id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex gap-4"
            >
              {/* Vertical thread line */}
              <div className="flex flex-col items-center">
                <div className="w-[2px] bg-gray-600 rounded thread-vertical h-full" />
              </div>

              {/* Comment body */}
              <div className="flex-1">
                <div className="flex items-start gap-3">
                  <AvatarInitial
                    name={c.username || "User"}
                    id={c.userId || c.$id}
                    size={44}
                  />

                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className="font-semibold text-white">
                        {c.username || "User"}
                      </div>
                      <div className="text-xs text-gray-400">
                        {timeAgoShort(c.$createdAt)}
                      </div>
                    </div>

                    {/* content */}
                      <p className="mt-2 text-gray-200 whitespace-pre-wrap">
                        {c.comment}
                      </p>
                 

                    {/* actions row */}
                    <div className="flex items-center gap-4 text-sm text-gray-400 mt-3">
                      <button
                        onClick={() => onClickReplyButton(c)}
                        className="hover:underline"
                      >
                        Reply
                      </button>

                      <button
                        onClick={() => toggleViewReplies(c)}
                        className="hover:underline cursor-pointer"
                      >
                        {(c.replies || 0) > 0
                          ? `${c.replies} Replies`
                          : "View Replies"}
                      </button>

                      {/* edit/delete if owner */}
                      {user?.$id === c.userId && (
                        <>
                          <button
                            onClick={() => handleDelete(c.$id)}
                            className="text-red-500 hover:underline"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>

                    {/* reply box */}
                    <AnimatePresence initial={false}>
                      {openReplyBox === c.$id && (
                        <ReplyBox
                          setOpenReplyBox={setOpenReplyBox}
                          c={c}
                          replyInputRef={replyInputRef}
                          replyText={replyText}
                          setReplyText={setReplyText}
                          movieId={movieId}
                        />
                      )}
                    </AnimatePresence>

                    {/* replies list  */}
                    <AnimatePresence initial={false}>
                      {openReplies &&
                        replies[c.$id] &&
                        replies[c.$id] !== "loading" && (
                          <ReplyList replies={replies} parentId={c.$id} />
                        )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
