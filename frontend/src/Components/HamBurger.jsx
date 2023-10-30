import { StarIcon } from "@chakra-ui/icons";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Heading,
  Image,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import logo from "../Assets/robotGif.gif";
import { Link } from "react-router-dom";

const HamBurger = ({ isOpen, onClose }) => {
  return (
    <>
      <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent bg={"black"}>
          <DrawerHeader borderBottomWidth="1px" color={"#49dc50"}>
            <HStack spacing={"0px"} cursor={"pointer"}>
              <Image src={logo} width={"70px"} />
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
          </DrawerHeader>
          <DrawerCloseButton color={"red"} />
          <DrawerBody color={"#49dc50"} fontWeight={"bold"}>
            <VStack
              alignItems={"flex-start"}
              marginTop={"20px"}
              spacing={"20px"}
            >
              <HStack spacing={"20px"}>
                <StarIcon />
                <Link
                  to="/"
                  onClick={() => {
                    onClose();
                  }}
                >
                  Chat
                </Link>
              </HStack>
              <HStack spacing={"20px"}>
                <StarIcon />
                <Link
                  to="/summarization"
                  onClick={() => {
                    onClose();
                  }}
                >
                  Summarization
                </Link>
              </HStack>
              <HStack spacing={"20px"}>
                <StarIcon />
                <Link
                  to="/translation"
                  onClick={() => {
                    onClose();
                  }}
                >
                  Translation
                </Link>
              </HStack>
              <HStack spacing={"20px"}>
                <StarIcon />
                <Link
                  to="/sentiment-analysis"
                  onClick={() => {
                    onClose();
                  }}
                >
                  Sentiment-Analysis
                </Link>
              </HStack>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default HamBurger;
