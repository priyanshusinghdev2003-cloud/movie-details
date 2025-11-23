import { motion } from "framer-motion";
import AvatarInitial from "../common/AvatarCommon"
import { useAuthStore } from "../../store/useAuthStore";
import { useCommentStore } from "../../store/useCommentStore";
import { toast } from "react-hot-toast";

function ReplyBox({setOpenReplyBox,c,replyInputRef,replyText,setReplyText,movieId}) {
    const {user} = useAuthStore()
    const {fetchReplies,replies,fetchMovieComments,AddReplyToDB} = useCommentStore()

    // submit reply handler
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
  return (
    <motion.div
      key={"reply-" + c.$id}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.18 }}
      className="mt-4"
    >
      <div className="flex gap-3 items-start">
        <AvatarInitial
          name={user?.name || "You"}
          id={user?.$id || "anon"}
          size={36}
        />
        <div className="flex-1">
          <input
            ref={replyInputRef}
            value={replyText[c.$id] || ""}
            onChange={(e) =>
              setReplyText((p) => ({ ...p, [c.$id]: e.target.value }))
            }
            className="w-full bg-gray-900 p-2 rounded"
            placeholder={`Reply to ${c.username || "user"}...`}
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => submitReply(c)}
              className="bg-blue-600 px-3 py-1 rounded"
            >
              Reply
            </button>
            <button
              onClick={() => setOpenReplyBox(null)}
              className="px-3 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ReplyBox;
