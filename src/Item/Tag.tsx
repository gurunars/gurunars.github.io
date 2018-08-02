import * as React from "react";

const Tag = ({ value }: { value: string }) => (
  <i
    style={{
      backgroundColor: "Beige",
      display: "inline-block",
      textDecoration: "none",
      whiteSpace: "pre",
      color: "Black",
      marginLeft: 5,
      marginRight: 5,
      paddingTop: 3,
      paddingBottom: 3,
      paddingLeft: 10,
      paddingRight: 10,
      fontSize: 12,
      borderRadius: 5
    }}
  >
    {value}
  </i>
);

export default Tag;