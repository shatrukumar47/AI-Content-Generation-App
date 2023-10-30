import React, { useEffect, useRef, useState } from "react";
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
import Loading from "../Components/Loading";
import axios from "axios";
import Languages from "../Components/Languages";
import translationBg from "../Assets/translation-bg.jpg";

const Translation = () => {
  const [article, setArticle] = useState("");
  const [translatedMsg, setTranslatedMsg] = useState("");
  const [language, setLanguage] = useState("English");
  const textAreaRef = useRef();
  const [loading, setLoading] = useState(false);

  const translatedBoxRef = useRef();

  //toast
  const toast = useToast();

  useEffect(() => {
    textAreaRef.current.focus();
  }, []);

  //handleChange for Languages component
  const handleChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleTranslate = () => {
    translatedBoxRef.current.focus();
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
    <Box bgImage={`url(${translationBg})`} bgSize={"cover"}>
      <Container
        maxW={"8xl"}
        style={{ minHeight: "calc(100vh - 105px)", overflow: "hidden" }}
        color={"white"}
      >
        <Heading marginTop={"20px"} textAlign={"center"} color={"white"}>
          Language / Translation
        </Heading>
        <HStack
          justifyContent={{ base: "center", md: "center", lg: "flex-end" }}
          marginTop={"10px"}
        >
          <Stack direction={{base:"column", md:"row", lg:"row"}} spacing={"10px"}>
            <Languages value={language} handleChange={handleChange} />
            <Button
              colorScheme="red"
              width={"200px"}
              onClick={handleTranslate}
              isDisabled={loading}
            >
              Translate
            </Button>
          </Stack>
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
              placeholder="Put your text here... Provide less content for better result."
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
            bg={"#343541"}
            borderRadius={"10px"}
            border={"1px solid white"}
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
              <Box ref={translatedBoxRef} tabIndex={0}>
                {!translatedMsg && (
                  <Text color={"#565869"}>
                    Your translated text comes here...
                  </Text>
                )}
                {translatedMsg && (
                  <Box >
                    <Text>{translatedMsg}</Text>
                  </Box>
                )}
              </Box>
            )}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Translation;
