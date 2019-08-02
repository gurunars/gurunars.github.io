import React, { useState, useEffect } from "react";
import posed from "react-pose";

const Box = posed.div({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    scaleY: 1,
    transition: {
      opacity: { ease: "easeOut", duration: 300 },
      default: { ease: "linear", duration: 500 }
    }
  }
});

const PlopTestCase = (): React.ReactElement<any> => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(!isVisible);
    }, 1000);
  });

  return (
    <Box
      style={{
        width: 100,
        height: 100,
        background: "#ff1c68",
        transformOrigin: "50% 50%"
      }}
      pose={isVisible ? "visible" : "hidden"}
    />
  );
};

export default PlopTestCase;
