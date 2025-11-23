import {motion} from "framer-motion"
import timeAgoShort from "../../utils/TimeAgo";
import AvatarInitial from "../common/AvatarCommon"

function ReplyList({replies,parentId}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="mt-4 ml-6 border-l-2 border-gray-800 pl-4 space-y-4"
    >
      {replies[parentId].map((reply) => (
        <div key={reply.$id} className="flex gap-3">
          <AvatarInitial
            name={reply?.username || "User"}
            id={reply.userId || reply.$id}
            size={36}
          />
          <div>
            <div className="flex items-center gap-2">
              <div className="font-semibold text-white text-sm">
                {reply.username || "User"}
              </div>
              <div className="text-xs text-gray-400">
                {timeAgoShort(reply.$createdAt)}
              </div>
            </div>
            <div className="text-gray-200">{reply.comment}</div>
          </div>
        </div>
      ))}
    </motion.div>
  );
}

export default ReplyList;
