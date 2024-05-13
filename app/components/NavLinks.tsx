"use client";
import { Link } from "@chakra-ui/next-js";
import { Flex } from "@chakra-ui/react";
export default function NavLinks() {
  return (
    <Flex
      justify='center'
      p='0.3rem'
      //   bg='#f3f1ed'
      gap='2rem'
      borderTop='1px solid #e1dcd6'
      fontSize='1.2rem'
      flexDir={{ base: "column", md: "row" }}
      textAlign={{ base: "left", md: "center" }}
      padding={{ base: "0.5rem", md: "0.5rem" }}
    >
      <Link
        href='/'
        _hover={{ color: "brown" }}
        textDecor='none'
        paddingLeft='1rem'
      >
        Home
      </Link>

      <Link
        href='/inspiration'
        _hover={{ color: "brown" }}
        textDecor='none'
        paddingLeft='1rem'
      >
        Inspiration
      </Link>
      <Link
        href='/about'
        _hover={{ color: "brown" }}
        textDecor='none'
        paddingLeft='1rem'
      >
        About Us
      </Link>
    </Flex>
  );
}
