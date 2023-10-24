import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Select,
  Stack,
  Text,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import Loading from "../Components/Loading";
import axios from "axios";

const Translation = () => {
  const [article, setArticle] = useState("");
  const [translatedMsg, setTranslatedMsg] = useState("");
  const [language, setLanguage] = useState("English");
  const textAreaRef = useRef();
  const [loading, setLoading] = useState(false);

  //toast
  const toast = useToast();

  useEffect(() => {
    textAreaRef.current.focus();
  }, []);

  const handleTranslate = () => {
    if (article) {
      setLoading(true);
      axios
        .post(
          "https://genchat-hwpt.onrender.com/translation",
          {
            message: article,
            language: language,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          setLoading(false);
          setTranslatedMsg(res?.data?.msg);
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
        style={{ minHeight: "calc(100vh - 145px)", overflow: "hidden" }}
        color={"white"}
      >
        <Heading marginTop={"30px"} textAlign={"center"} color={"#565869"}>
          Language / Translation
        </Heading>
        <HStack
          justifyContent={{ base: "center", md: "center", lg: "flex-end" }}
          marginTop={"20px"}
        >
          <HStack spacing={"10px"}>
            <Select
              // bg="tomato"
              borderColor="tomato"
              color="tomato"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Spanish">Spanish</option>
              <option value="Italian">Italian</option>
              <option value="Japanese">Japanese</option>
            </Select>
            <Button
              colorScheme="red"
              width={"180px"}
              onClick={handleTranslate}
              isDisabled={loading}
            >
              Translate
            </Button>
          </HStack>
        </HStack>
        <Stack
          direction={{ base: "column", md: "row", lg: "row" }}
          justifyContent={"space-between"}
          border={"2px solid green"}
          marginTop={"30px"}
          padding={"10px"}
          marginBottom={"20px"}
          borderRadius={"10px"}
          boxShadow={
            "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px"
          }
        >
          <VStack width={{ base: "100%", md: "50%", lg: "50%" }}>
            <Textarea
              placeholder="Put your content here..."
              height={"600px"}
              bg={"black"}
              paddingTop={"20px"}
              value={article}
              ref={textAreaRef}
              onChange={(e) => setArticle(e.target.value)}
            ></Textarea>
          </VStack>
          <Box
            width={{ base: "100%", md: "50%", lg: "50%" }}
            padding={"20px"}
            overflowY="auto"
            height={"600px"}
            className="custom-scrollbar"
            textAlign={"justify"}
          >
            {loading ? (
              <Stack
                justifyContent={"center"}
                height={"500px"}
                alignItems={"center"}
              >
                <Loading w={100} h={100} />
              </Stack>
            ) : (
              <Box>
                {!translatedMsg && (
                  <Text color={"#565869"}>Your summary comes here...</Text>
                )}
                {translatedMsg && <Text>{translatedMsg}</Text>}
              </Box>
            )}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Translation;
