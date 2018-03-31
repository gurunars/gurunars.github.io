import * as React from "react";

const PageWithOverlay = (
  { title, onClick }: {
    title: string,
    onClick: () => void
  }) => (
    <button
      style={{
        cursor: "pointer"
      }}
      onClick={onClick}
    >
      {title}
    </button>
  );

export default PageWithOverlay;
