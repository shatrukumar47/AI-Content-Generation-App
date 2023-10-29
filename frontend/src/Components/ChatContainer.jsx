import { Box } from "@chakra-ui/react";
import UserMessage from "./UserMessage";
import AIResponse from "./AIResponse";
import { useEffect, useRef } from "react";

const ChatContainer = ({ data }) => {
  const containerRef = useRef();

  useEffect(()=>{
    if(containerRef.current){
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  },[data])


  return (
    <Box
      overflowY="auto"
      className="custom-scrollbar"
      p={4}
      style={{ height: "calc(100vh - 252.5px)" }}
      width={{ base: "100%", md: "90%", lg: "70%" }}
      margin={"auto"}
      justifyContent={"space-between"}
      padding={{ base: "0px", md: "20px", lg: "20px" }}
      ref={containerRef}
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
