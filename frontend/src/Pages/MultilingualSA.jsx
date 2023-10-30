import {
  Box,
  Button,
  Container,
  Image,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import pic from "../Assets/sentiment-analysis.jpg";
import Languages from "../Components/Languages";
import axios from "axios";
import Loading from "../Components/Loading";
import Sentiments from "../Components/Sentiments";
import analysisBg from "../Assets/sentiment-analysis-background.jpg";

const MultilingualSA = () => {
  const [language, setLanguage] = useState("English");
  const [userMsg, setUserMsg] = useState("");
  const inputRef = useRef();
  const [sentiment, setSentiment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  //handleChange for Languages component
  const handleChange = (e) => {
    setLanguage(e.target.value);
  };

  //handleUserInp
  const handleUserInput = (e) => {
    setUserMsg(e.target.value);
  };

  //handle Analyse Button
  const handleAnalyse = async () => {
    if (userMsg) {
      setLoading(true);
      let obj = {
        userMsg: userMsg,
        language: language,
      };
      try {
        const response = await axios.post(
          "https://genchat-hwpt.onrender.com/sentiment-analysis",
          obj
        );
        console.log(response?.data?.msg);
        setLoading(false);
        setSentiment(response?.data?.msg);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    } else {
      inputRef.current.focus();
    }
  };

  //handle GoBack
  const handleGoBack = () => {
    setSentiment("");
  };

  return (
    <Box bg={"#343541"} bgImage={`url(${analysisBg})`} bgSize={"cover"}>
      <Container
        maxW={"8xl"}
        style={{ minHeight: "calc(100vh - 105px)", overflow: "hidden" }}
        padding={"10px"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {loading && !sentiment ? (
          <Box
            bg={"white"}
            width={"700px"}
            minHeight={"500px"}
            borderRadius={"10px"}
            boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px"}
            padding={"20px 20px 10px 20px"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Loading />
          </Box>
        ) : sentiment && !loading ? (
          <Sentiments sentiment={sentiment} handleGoBack={handleGoBack} />
        ) : (
          <Box
            width={"700px"}
            bg={"white"}
            borderRadius={"10px"}
            boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px"}
            padding={"20px 20px 10px 20px"}
          >
            <Box>
              <Image
                src={pic}
                width={{ base: "100%", md: "60%", lg: "100%" }}
                margin={"auto"}
              />
              <VStack alignItems={"center"} marginTop={"10px"} gap={"10px"}>
                <Text fontSize={"25px"} fontWeight={"bold"} color={"#0a9a11"}>
                  MULTILINGUAL SENTIMENT ANALYSIS
                </Text>
                <Languages value={language} handleChange={handleChange} />
                <Textarea
                  ref={inputRef}
                  width={"100%"}
                  lang={language}
                  placeholder="Enter the comment into the selected language..."
                  height={"150px"}
                  className="custom-scrollbar"
                  bg={"#343541"}
                  color={"white"}
                  paddingTop={"20px"}
                  value={userMsg}
                  onChange={handleUserInput}
                />
                <Button
                  colorScheme="green"
                  onClick={handleAnalyse}
                  marginBottom={"10px"}
                  marginTop={"10px"}
                >
                  Analyse
                </Button>
              </VStack>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default MultilingualSA;
