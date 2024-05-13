"use client";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Circle,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { AiFillCrown } from "react-icons/ai";
import { DiProlog, DiYii } from "react-icons/di";

export default function HomePageBottom() {
  return (
    <div>
      <Box
        display='flex'
        flexDir='column'
        alignItems='center'
        justifyContent='center'
        bg='#FEF0D9'
        width='100%'
        h='30vh'
        position='relative'
        mt='4rem'
        gap='1rem'
      >
        <UnorderedList
          position='absolute'
          top='-50%'
          left='50%'
          transform='translate(-50%, 125%)'
          display='flex'
          flexDir='row'
          gap='0.5rem'
          listStyleType='none'
          m='0'
        >
          <ListItem>
            <Circle size='70px' bg='#E4A757' color='white' fontSize='1rem'>
              <DiYii fontSize='2rem' color='black' />
            </Circle>
          </ListItem>
          <ListItem>
            {" "}
            <Circle size='70px' bg='#E4A757' color='white' fontSize='1rem'>
              <AiFillCrown fontSize='2.5rem' color='black' />
            </Circle>
          </ListItem>
          <ListItem>
            <Circle size='70px' bg='#E4A757' color='white' fontSize='1rem'>
              <DiProlog fontSize='2.5rem' color='black' />
            </Circle>
          </ListItem>
        </UnorderedList>
        <Text fontSize={{ base: "0.8rem", md: "1rem" }} textAlign='center'>
          Collect points on your purchases as a member of our customer club
        </Text>
        <Button p='1.5rem 2rem' bg='#E4A757' _hover={{ bg: "#efdbc2" }}>
          SIGN UP NOW
          <ArrowForwardIcon
            ml='1rem'
            fontSize='1.5rem'
            transition={"transform 0.2s ease-in-out"}
            _hover={{ transform: "translateX(7px)" }}
          />
        </Button>
      </Box>
    </div>
  );
}
