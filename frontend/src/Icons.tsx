import * as React from "react";

export const prev = (color?: string) => {
  const fgColor = color || "black";
  return (
    <svg width="100%" height="100%" viewBox="0 0 30 30">
      <circle cx="15" cy="15" r="13" stroke={fgColor} stroke-width="2" fill="transparent" />
      <line x1="9" y1="15" x2="19" y2="8" stroke={fgColor} stroke-width="2" />
      <line x1="9" y1="15" x2="19" y2="22" stroke={fgColor} stroke-width="2" />
    </svg>
  );
};

export const next = (color?: string) => {
  const fgColor = color || "black";
  return (
    <svg width="100%" height="100%" viewBox="0 0 30 30">
      <circle cx="15" cy="15" r="13" stroke={fgColor} stroke-width="2" fill="transparent" />
      <line x1="11" y1="8" x2="21" y2="15" stroke={fgColor} stroke-width="2" />
      <line x1="11" y1="22" x2="21" y2="15" stroke={fgColor} stroke-width="2" />
    </svg>
  );
};