import { Box, Flex } from "@chakra-ui/react";
import React from "react";

const AIResponse = ({message}) => {
  return (
    <Flex justifyContent="flex-start" mb={2}>
      <Box
        p={2}
        bg="gray.300"
        color="black"
        borderRadius="lg"
        maxW="70%"
      >
        {message}
      </Box>
    </Flex>
  );
};

export default AIResponse;
