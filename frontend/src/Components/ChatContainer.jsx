import { Box } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import UserMessage from "./UserMessage";
import AIResponse from "./AIResponse";

const ChatContainer = ({ data }) => {
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom of the chat container when new messages are added
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [data]);


  return (
    <Box
      overflowY="auto"
      className="custom-scrollbar"
      p={4}
      style={{ height: "calc(100vh - 252.5px)" }}
      width={{ base: "100%", md: "90%", lg: "70%" }}
      margin={"auto"}
      justifyContent={"space-between"}
      padding={"20px"}
      color={"white"}
    >
      {data?.map((item, index) => {
        if (item?.sender === "user") {
          return <UserMessage key={index} message={item?.content} />;
        } else if (item?.sender === "ai") {
          return <AIResponse key={index} message={item?.content} />;
        }
        return null;
      })}
    </Box>
  );
};

export default ChatContainer;
