import React from "react";

function Icon({ icon, size = 6, color = "primary", className }) {
  return (
    <i className={`${icon} text-${color}  fs-${size} mx-2 ${className}`}></i>
  );
}

export default Icon;
