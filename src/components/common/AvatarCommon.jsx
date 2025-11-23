import colorFromString from "../../utils/AvatarBg"
import initialsFromName from "../../utils/InitialLetter"

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

export default AvatarInitial