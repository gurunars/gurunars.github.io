import * as React from "react";

export const Prev = (props: { color?: string }) => {
  const color = props.color || "black";
  return (
    <svg width="30" height="30">
      <circle cx="15" cy="15" r="13" stroke={color} stroke-width="2" fill="transparent" />
      <line x1="9" y1="15" x2="19" y2="8" stroke={color} stroke-width="2" />
      <line x1="9" y1="15" x2="19" y2="22" stroke={color} stroke-width="2" />
    </svg>
  );
};

export const Next = (props: { color?: string }) => {
  const color = props.color || "black";
  return (
    <svg width="30" height="30">
      <circle cx="15" cy="15" r="13" stroke={color} stroke-width="2" fill="transparent" />
      <line x1="11" y1="8" x2="21" y2="15" stroke={color} stroke-width="2" />
      <line x1="11" y1="22" x2="21" y2="15" stroke={color} stroke-width="2" />
    </svg>
  );
};