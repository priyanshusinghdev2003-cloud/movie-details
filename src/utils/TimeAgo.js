import { format } from "timeago.js";

function timeAgoShort(dateString) {
  try {
    return format(dateString);
  } catch {
    return "";
  }
}

export default timeAgoShort