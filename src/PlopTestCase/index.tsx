import React, { useState } from "react";
import posed from "react-pose";

const Box = posed.div({
  open: {
    rotate: 360 + 45,
    transition: {
      duration: 400
    }
  },
  closed: {
    rotate: 0,
    transition: {
      duration: 400
    }
  }
});

const PlopTestCase = (): React.ReactElement<any> => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box
      onClick={() => setIsOpen(!isOpen)}
      style={{
        width: 100,
        height: 100,
        background: "#ff1c68",
        transformOrigin: "50% 50%"
      }}
      pose={isOpen ? "open" : "closed"}
    />
  );
};

export default PlopTestCase;
