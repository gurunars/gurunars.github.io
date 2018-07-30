import * as React from "react";

const Icon = (
  { src, style }: {
    src: string,
    style?: React.CSSProperties
  }
): React.ReactElement<any> => {
  const realStyle = style || { width: "24px", height: "24px" };
  return (
    <div style={realStyle}
      dangerouslySetInnerHTML={
        {
          __html: "<img src=" +
            decodeURIComponent(src)
              .replace(
                "<svg",
                "<svg fill='" + (realStyle.color || "red") + "'"
              )
            + "/>"
        }
      } />
  );
};

export default Icon;
