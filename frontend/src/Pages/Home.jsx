import {
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { FaTelegramPlane } from "react-icons/fa";
import ChatContainer from "../Components/ChatContainer";
import axios from "axios";
import Loading from "../Components/Loading";

const Home = () => {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const ref = useRef();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    ref.current.focus();
  }, []);

  const handleUserMessage = async () => {
    let newMsg = {
      content: message,
      sender: "user",
    };
    setData((prev) => {
      return [...prev, newMsg];
    });

    fetchAPI(newMsg.content);
  };

  const fetchAPI = async (query) => {
    setLoading(true);
    try {
      const res = await axios.post("https://genchat-hwpt.onrender.com/chat", {
        message: query,
      });

      const aiRes = {
        content: res.data.msg,
        sender: "ai",
      };
      setLoading(false);
      setData((prev) => [...prev, aiRes]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (message.trim() !== "") {
        handleUserMessage();
        setMessage("");
      }
    }
  };

  const handleSendIcon = () => {
    if (message.trim() !== "") {
      handleUserMessage();
      setMessage("");
    }
  };

  const handlePeom = async () => {
    const predefinedMessage = "Can you please write a poem for me?";
    let newMsg = {
      content: predefinedMessage,
      sender: "user",
    };
    setData((prev) => {
      return [...prev, newMsg];
    });
    fetchAPI(predefinedMessage);
    setMessage("");
  };

  const handleJokes = () => {
    const predefinedMessage = "Can you please tell a funny joke?";
    let newMsg = {
      content: predefinedMessage,
      sender: "user",
    };
    setData((prev) => {
      return [...prev, newMsg];
    });
    fetchAPI(predefinedMessage);
    setMessage("");
  };

  return (
    <Box bg={"#343541"}>
      <Container
        maxW={"8xl"}
        style={{ minHeight: "calc(100vh - 145px)", overflow: "hidden" }}
        padding={"10px"}
      >
        {data.length === 0 ? (
          <Box>
            <VStack
              style={{ minHeight: "calc(100vh - 252.5px)" }}
              justifyContent={"space-between"}
              padding={"20px"}
            >
              <Flex
                justifyContent={"center"}
                alignItems={"center"}
                height={{ base: "", md: "250px", lg: "300px" }}
              >
                <Heading color={"#565869"} fontSize={"50px"}>
                  Gen / Chat
                </Heading>
              </Flex>
              <VStack spacing={"20px"} justifyContent={"flex-start"}>
                <Stack
                  spacing={"20px"}
                  direction={{ base: "column", md: "row", lg: "row" }}
                >
                  <Box
                    padding={"10px"}
                    borderRadius={"10px"}
                    width={"300px"}
                    border={"1px solid white"}
                    fontSize={"14px"}
                    _hover={{
                      cursor: "pointer",
                      background: "#40414F",
                    }}
                    onClick={handleJokes}
                  >
                    <Text color={"white"}>Tell me Joke</Text>
                    <Text color={"#565869"}>Funny Joke</Text>
                  </Box>
                  <Box
                    padding={"10px"}
                    borderRadius={"10px"}
                    width={"300px"}
                    border={"1px solid white"}
                    fontSize={"14px"}
                    _hover={{
                      cursor: "pointer",
                      background: "#40414F",
                    }}
                    onClick={handlePeom}
                  >
                    <Text color={"white"}>Write a peom</Text>
                    <Text color={"#565869"}>Poem</Text>
                  </Box>
                </Stack>
              </VStack>
            </VStack>
          </Box>
        ) : (
          <ChatContainer data={data} />
        )}

        {/* <Stack width={"100%"} color={"white"}>
          Hello
        </Stack> */}

        {/* Input Field */}
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Box height={"30px"} marginTop={"20px"}>
            {loading && <Loading h={30} w={30} />}
          </Box>
          <InputGroup
            size="lg"
            marginBottom={"40px"}
            marginTop={{ base: "30px", md: "40px", lg: "40px" }}
            width={{ base: "100%", md: "90%", lg: "70%" }}
          >
            <Input
              placeholder="Send a message"
              colorScheme="teal"
              borderRadius={"10px"}
              focusBorderColor="teal.300"
              _hover={{
                borderColor: "teal.300",
              }}
              _placeholder={{
                color: "#c1c1c1",
              }}
              css={{
                caretColor: "white",
              }}
              color={"white"}
              boxShadow={" rgba(0, 0, 0, 0.35) 0px 5px 15px"}
              ref={ref}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <InputRightElement width="4.5rem">
              <Icon
                as={FaTelegramPlane}
                color="gray.300"
                cursor={"pointer"}
                onClick={handleSendIcon}
              />
            </InputRightElement>
          </InputGroup>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
