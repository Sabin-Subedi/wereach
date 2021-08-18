import React from "react";

function Avatar({ source, desc, size = 2 }) {
  return (
    <div style={{ width: `${size}rem`, height: `${size}rem` }}>
      <img
        style={{ width: "100%", height: "100%" }}
        className="overflow-hidden rounded-circle"
        src={source}
        alt={desc}
      />
    </div>
  );
}

export default Avatar;
