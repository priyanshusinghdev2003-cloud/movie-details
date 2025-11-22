import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useCommentStore } from "../store/useCommentStore";
import { useAuthStore } from "../store/useAuthStore";
import { toast } from "react-hot-toast";
import colorFromString from "../utils/AvatarBg"
import initialsFromName from "../utils/InitialLetter"
import timeAgoShort from "../utils/TimeAgo"


function AvatarInitial({ name, id, size = 40 }) {
  const bg = colorFromString(id || name);
  const initials = initialsFromName(name);
  return (
    <div
      style={{ background: bg, width: size, height: size }}
      className="flex items-center justify-center rounded-full text-white font-semibold"
    >
      <span style={{ fontSize: Math.max(12, size / 2.5) }}>{initials}</span>
    </div>
  );
}


export default function CommentSystem({ movieId }) {
  const {
    fetchMovieComments,
    fetchReplies,
    AddCommentToDB,
    AddReplyToDB,
    deleteComment: storeDeleteComment,
    updateComment: storeUpdateComment,
    comments,
    replies,
    isLoading,
    isAddingComment,
  } = useCommentStore();

  const { user } = useAuthStore();

  const [newComment, setNewComment] = useState("");
  const [replyText, setReplyText] = useState({}); 
  const [openReplyBox, setOpenReplyBox] = useState(null); 
  const [editing, setEditing] = useState(null); 
  const [editText, setEditText] = useState("");
  const replyInputRef = useRef(null);
  const mainInputRef = useRef(null);

  const [sortMode, setSortMode] = useState("new");

  useEffect(() => {
    fetchMovieComments({movieId: String(movieId)});
    gsap.from(".thread-vertical", { height: 0, duration: 0.6, ease: "power3.out" });
  }, [movieId]);

  useEffect(() => {
    if (openReplyBox && replyInputRef.current) {
      replyInputRef.current.focus();
    }
  }, [openReplyBox]);


  const postComment = async () => {
    if (!user) return toast.error("Sign in to comment");
    if (!newComment.trim()) return;

    try {
      await AddCommentToDB({ userId: user.$id, movieId, comment: newComment, username: user?.name.replace(/\s+/g, "").toLowerCase() });
      setNewComment("");
      // refresh
      await fetchMovieComments({movieId: String(movieId)});
    } catch (err) {
      console.error(err);
      toast.error("Failed to post comment");
    }
  };

  const onClickReplyButton = async (parent) => {
    if (!user) {
      toast.error("Sign in to reply");
      return;
    }
    if(user.$id == parent?.userId){
      return
    }
    // open reply box for parent
    setOpenReplyBox(parent.$id);
    setReplyText((p) => ({ ...p, [parent.$id]: `@${parent.username || "user"} ` }));
    // lazily load replies (if not loaded)
    if (!replies[parent.$id]) {
      await fetchReplies({
        commentId:parent.$id
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

  const submitReply = async (parent) => {
    const text = (replyText[parent.$id] || "").trim();
    if (!text) return;
    try {
      await AddReplyToDB({
        userId: user.$id,
        movieId,
        comment: text,
        parentId: parent.$id,
        parentReplies: parent.replies ?? 0,
        username: user?.name.replace(/\s+/g, "").toLowerCase()

      });
      setReplyText((p) => ({ ...p, [parent.$id]: "" }));
      setOpenReplyBox(null);
      await fetchReplies({
        commentId:parent.$id
      });;
      await fetchMovieComments({movieId: String(movieId)}); 
    } catch (err) {
      console.error(err);
      toast.error("Failed to reply");
    }
  };

 // toggle replies button
  const toggleViewReplies = async (parent) => {
    if (!replies[parent.$id]) {
      await fetchReplies({
        commentId:parent.$id
      });;
    }
  };

  // delete comments handler 
  const handleDelete = async (commentId) => {
    if (!confirm("Delete this comment?")) return;
    try {
      await storeDeleteComment(commentId);
      toast.success("Deleted");
      await fetchMovieComments({movieId: String(movieId)});
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete");
    }
  };

  //  Edit
  const startEdit = (c) => {
    setEditing(c.$id);
    setEditText(c.comment);
    // focus will be on edit input through ref when visible
  };
  const submitEdit = async (c) => {
    if (!editText.trim()) return;
    try {
      await storeUpdateComment(c.$id, editText); // expected store function
      setEditing(null);
      await fetchMovieComments(movieId);
    } catch (err) {
      console.error(err);
      toast.error("Failed to edit");
    }
  };

  // ---------- Sorting
  const sortedComments = React.useMemo(() => {
    if (!comments) return [];
    const arr = [...comments];
    if (sortMode === "new") {
      arr.sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt));
    } else  {
      arr.sort((a, b) => new Date(a.$createdAt) - new Date(b.$createdAt));
    } 
    return arr;
  }, [comments, sortMode]);

  // shimmer skeleton
  const CommentSkeleton = () => (
    <div className="animate-pulse space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex gap-4 items-start">
          <div className="w-10 h-10 bg-gray-700 rounded-full" />
          <div className="flex-1">
            <div className="h-4 bg-gray-700 rounded w-1/3 mb-2" />
            <div className="h-3 bg-gray-700 rounded w-full" />
          </div>
        </div>
      ))}
    </div>
  );

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

      {/* Post new comment */}
      <div className="flex gap-3 items-start mb-6">
        <AvatarInitial name={user?.name || "User"} id={user?.$id || "anon"} size={44} />
        <div className="flex-1">
          <textarea
            ref={mainInputRef}
            rows={3}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={user ? "Share your thoughts..." : "Sign in to join the discussion"}
            className="w-full bg-gray-900 p-3 rounded-lg text-white outline-none resize-none"
            disabled={!user}
          />
          <div className="flex items-center justify-between mt-2">
            <div className="text-sm text-gray-400">Be respectful. No spoilers.</div>
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

      {/* Comments list */}
      <div className="space-y-6">
        {isLoading ? (
          <CommentSkeleton />
        ) : sortedComments.length === 0 ? (
          <div className="text-gray-400">No comments yet — be the first to comment.</div>
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
                  <AvatarInitial name={c.username || "User"} id={c.userId || c.$id} size={44} />

                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className="font-semibold text-white">{c.username || "User"}</div>
                      <div className="text-xs text-gray-400">{timeAgoShort(c.$createdAt)}</div>
                    </div>

                    {/* content or edit input */}
                    {editing === c.$id ? (
                      <div className="mt-2">
                        <textarea
                          rows={3}
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="w-full bg-gray-900 p-2 rounded text-white"
                        />
                        <div className="flex gap-2 mt-2">
                          <button
                            onClick={() => submitEdit(c)}
                            className="bg-green-600 px-3 py-1 rounded"
                          >
                            Save
                          </button>
                          <button onClick={() => setEditing(null)} className="px-3 py-1 rounded">
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="mt-2 text-gray-200 whitespace-pre-wrap">{c.comment}</p>
                    )}

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
                        className="hover:underline"
                      >
                        { (c.replies || 0) > 0 ? `${c.replies} Replies` : "View Replies"}
                      </button>

                      {/* edit/delete if owner */}
                      {user?.$id === c.userId && (
                        <>
                          <button onClick={() => startEdit(c)} className="hover:underline">
                            Edit
                          </button>
                          <button onClick={() => handleDelete(c.$id)} className="text-red-500 hover:underline">
                            Delete
                          </button>
                        </>
                      )}
                    </div>

                    {/* reply box */}
                    <AnimatePresence initial={false}>
                      {openReplyBox === c.$id && (
                        <motion.div
                          key={"reply-" + c.$id}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.18 }}
                          className="mt-4"
                        >
                          <div className="flex gap-3 items-start">
                            <AvatarInitial name={user?.name || "You"} id={user?.$id || "anon"} size={36} />
                            <div className="flex-1">
                              <input
                                ref={replyInputRef}
                                value={replyText[c.$id] || ""}
                                onChange={(e) => setReplyText((p) => ({ ...p, [c.$id]: e.target.value }))}
                                className="w-full bg-gray-900 p-2 rounded"
                                placeholder={`Reply to ${c.username || "user"}...`}
                              />
                              <div className="flex gap-2 mt-2">
                                <button onClick={() => submitReply(c)} className="bg-blue-600 px-3 py-1 rounded">
                                  Reply
                                </button>
                                <button onClick={() => setOpenReplyBox(null)} className="px-3 py-1 rounded">
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* replies list  */}
                    <AnimatePresence initial={false}>
                      {replies[c.$id] && replies[c.$id] !== "loading" && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="mt-4 ml-6 border-l-2 border-gray-800 pl-4 space-y-4"
                        >
                          {replies[c.$id].map((r) => (
                            <div key={r.$id} className="flex gap-3">
                              <AvatarInitial name={r.username || "User"} id={r.userId || r.$id} size={36} />
                              <div>
                                <div className="flex items-center gap-2">
                                  <div className="font-semibold text-white text-sm">{r.username || "User"}</div>
                                  <div className="text-xs text-gray-400">{timeAgoShort(r.$createdAt)}</div>
                                </div>
                                <div className="text-gray-200">{r.comment}</div>
                              </div>
                            </div>
                          ))}
                        </motion.div>
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
