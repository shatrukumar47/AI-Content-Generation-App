import React, { useState } from "react";
import {
  Box,
  Container,
  HStack,
  Heading,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import logo from "../Assets/robotGif.gif";
import { HamburgerIcon } from "@chakra-ui/icons";
import HamBurger from "./HamBurger";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const handleLogo = ()=>{
    navigate("/")
  }

  return (
    <Box bg={"#000000"}>
      <Container maxW={"8xl"}>
        <HStack justifyContent={"space-between"}>
          <HamburgerIcon
            color={"#49dc50"}
            cursor={"pointer"}
            fontSize={"25px"}
            display={{ base: "block", md: "none", lg: "none" }}
            onClick={onOpen}
          />
          <HStack spacing={"0px"} cursor={"pointer"} onClick={handleLogo}>
            <Image src={logo} width={"100px"} />
            <HStack
              fontSize={"20px"}
              color={"#49dc50"}
              letterSpacing={"2px"}
              spacing={"1px"}
              alignItems={"center"}
            >
              <Heading fontSize={"20px"}>Gen</Heading>
              <Heading fontSize={"28px"} color={"#cf1111"}>
                /
              </Heading>
              <Heading fontSize={"20px"}>Chat</Heading>
            </HStack>
          </HStack>

          <HStack
            spacing={"20px"}
            color={"white"}
            fontWeight={"bold"}
            letterSpacing={"1px"}
            display={{ base: "none", md: "flex", lg: "flex" }}
            textDecoration={"none"}
          >
            <Link to="/">Chat</Link>
            <Link to="/summarization">Summarization</Link>
            <Link to="/translation">Translation</Link>
          </HStack>
        </HStack>

        <HamBurger isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      </Container>
    </Box>
  );
};

export default Navbar;
