import React from "react";
import { Bubble } from "react-native-gifted-chat";

export const RenderBubble = (props: React.ReactNode) => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        right: {
          backgroundColor: "#019EF4",
        },
        left: {
          backgroundColor: "#9C14C4",
        },
      }}
      textStyle={{
        right: {
          color: "#fff",
        },
        left: {
          color: "#fff",
        },
      }}
    />
  );
};
