import React, { useState } from "react";

const StarRating = ({
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  value = 0,
  onChange,
}) => {
  const [temp, setTemp] = useState(0);
  const displayRating = temp || value;

  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            full={displayRating >= i + 1}
            onRate={() => onChange(i + 1)}
            onHoverIn={() => setTemp(i + 1)}
            onHoverOut={() => setTemp(0)}
            color={color}
            size={size}
          />
        ))}
      </div>

      <p className="text-base leading-none">{displayRating || ""}</p>
    </div>
  );
};

export default StarRating;
function Star({ onRate, full, onHoverIn, onHoverOut, color, size }) {
  return (
    <span
      role="button"
      tabIndex={0}
      className="w-12 h-12 flex items-center justify-center cursor-pointer"
      onClick={onRate}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
      onKeyDown={(e) => e.key === "Enter" && onRate()}
    >
      {full ? (
        <svg
          viewBox="0 0 20 20"
          fill={color}
          style={{ width: size, height: size }}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2"
          style={{ width: size, height: size }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}
