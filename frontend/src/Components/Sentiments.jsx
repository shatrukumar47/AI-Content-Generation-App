import { Box, Image, Text, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import happy from "../Assets/happy.gif";
import angry from "../Assets/angry.gif";
import thinking from "../Assets/thinking.gif";

const Sentiments = ({ sentiment, handleGoBack }) => {
  const [result, setResult] = useState("");
  const [color, setColor] = useState("black");
  const [image, setImage] = useState(thinking);

  useEffect(() => {
    if (sentiment.toLowerCase().includes("positive")) {
      setResult("Positive");
      setColor("green");
      setImage(happy);
    } else if (sentiment.toLowerCase().includes("negative")) {
      setResult("Negative");
      setColor("red");
      setImage(angry);
    } else if (sentiment.toLowerCase().includes("neutral")) {
      setResult("Neutral");
      setColor("orange");
      setImage(thinking);
    }
  }, [sentiment]);

  return (
    <VStack
      width={"700px"}
      bg={"white"}
      borderRadius={"10px"}
      boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px"}
      padding={"0px 20px 10px 20px"}
      alignItems={"center"}
      justifyContent={"space-around"}
    >
      <Box
        width={"100%"}
        marginTop={"15px"}
        cursor={"pointer"}
        onClick={handleGoBack}
      >
        <FaArrowLeft />
      </Box>
      <Image src={image} />
      <Text
        fontSize={"25px"}
        fontWeight={"bold"}
        borderRadius={"10px"}
        padding={"10px 40px"}
        bg={`${color}.100`}
        color={color}
        marginBottom={"10px"}
      >
        {result}
      </Text>
    </VStack>
  );
};

export default Sentiments;
