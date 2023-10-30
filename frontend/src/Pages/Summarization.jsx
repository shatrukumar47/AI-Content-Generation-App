import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Stack,
  Text,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Loading from "../Components/Loading";

const Summarization = () => {
  const [article, setArticle] = useState("");
  const [summary, setSummary] = useState("");
  const textAreaRef = useRef();
  const [loading, setLoading] = useState(false);

  const summaryBoxRef = useRef();

  //toast
  const toast = useToast();

  useEffect(() => {
    textAreaRef.current.focus();
  }, []);

  const handleSummary = () => {
    summaryBoxRef.current.focus();
    if (article) {
      setLoading(true);
      axios
        .post(
          "https://genchat-hwpt.onrender.com/summary",
          {
            message: article,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          setLoading(false);
          setSummary(res?.data?.msg);
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    } else {
      toast({
        description: "Please fill some content !",
        status: "error",
        duration: 1000,
        isClosable: true,
        position: "top",
      });
    }
  };

  return (
    <Box bg={"#343541"}>
      <Container
        maxW={"8xl"}
        style={{ minHeight: "calc(100vh - 105px)", overflow: "hidden" }}
        color={"white"}
      >
        <Heading marginTop={"20px"} textAlign={"center"} color={"#565869"}>
          Text / Summarization
        </Heading>
        <HStack
          justifyContent={{ base: "center", md: "flex-end", lg: "flex-end" }}
          marginTop={"10px"}
        >
          <Button
            colorScheme="green"
            onClick={handleSummary}
            isDisabled={loading}
          >
            Summarize
          </Button>
        </HStack>
        <Stack
          direction={{ base: "column", md: "row", lg: "row" }}
          justifyContent={"space-between"}
          marginTop={"10px"}
          padding={{ base: "0px", md: "0px", lg: "10px" }}
          borderRadius={"10px"}
          boxShadow={
            "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px"
          }
        >
          <VStack width={{ base: "100%", md: "50%", lg: "50%" }}>
            <Textarea
              className="custom-scrollbar"
              placeholder="Put your article/paragrapgh here..."
              height={"calc(100vh - 251.3px)"}
              bg={"black"}
              paddingTop={"20px"}
              value={article}
              ref={textAreaRef}
              onChange={(e) => setArticle(e.target.value)}
            ></Textarea>
          </VStack>
          <Box
            width={{ base: "100%", md: "50%", lg: "50%" }}
            padding={"15px"}
            overflowY="auto"
            height={"calc(100vh - 251.3px)"}
            className="custom-scrollbar"
            textAlign={"justify"}
          >
            {loading ? (
              <Stack
                justifyContent={"center"}
                height={"calc(100vh - 251.3px)"}
                alignItems={"center"}
              >
                <Loading w={100} h={100} />
              </Stack>
            ) : (
              <Box ref={summaryBoxRef} tabIndex={0}>
                {!summary && (
                  <Text color={"#565869"}>Your summary comes here...</Text>
                )}
                {summary && <Text>{summary}</Text>}
              </Box>
            )}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Summarization;
