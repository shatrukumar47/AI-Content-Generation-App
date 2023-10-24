import { Box, Flex } from "@chakra-ui/react";
import React from "react";

const UserMessage = ({ message }) => {
  return (
    <Flex justifyContent="flex-end" mb={2}>
      <Box
        p={2}
        bg="green.600"
        color="white"
        borderRadius="lg"
        maxW="70%"
      >
        {message}
      </Box>
    </Flex>
  );
};

export default UserMessage;
