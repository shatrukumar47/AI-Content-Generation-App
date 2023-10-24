import { Box, HStack, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { FaGithub } from "react-icons/fa";

const Footer = () => {

  const handleGithub = ()=>{
    window.open("https://github.com/shatrukumar47/AI-Content-Generation-App", "_blank");
  }


  return (
    <Box bg={"black"} color={"white"} fontSize={"13px"}>
      <Stack
        direction={{ base: "column", md: "row", lg: "row" }}
        justifyContent={"space-between"}
        padding={"5px 20px 5px 20px"}
      >
        <Text>@2023 Gen/Chat</Text>
        <Text>
          Gen/Chat may produce inaccurate information about people, places, or
          facts
        </Text>
        <HStack spacing={"20px"}>
          <FaGithub cursor={"pointer"} onClick={handleGithub} />
          <Text>shatrukumar47@gmail.com</Text>
        </HStack>
      </Stack>
    </Box>
  );
};

export default Footer;
