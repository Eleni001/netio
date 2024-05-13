"use client";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Collapse,
  Flex,
  Heading,
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useState } from "react";
import NavIcons from "./NavIcons";
import NavLinks from "./NavLinks";
import SearchNav from "./SearchNav";
import SlidingTextBanner from "./SlidingTextBanner";

export default function Header() {
  const [isOpened, setIsOpened] = useState(false);
  const isLargeScreen = useBreakpointValue({ base: false, md: true });

  const handleToggle = () => setIsOpened(!isOpened);

  return (
    <Box
      as='header'
      position='sticky'
      top='0'
      left='0'
      right='0'
      zIndex='5'
      width='full'
    >
      <Flex flexDir='column' bg='white' zIndex='2' width='100%'>
        <Flex
          justify='space-between'
          alignItems='center'
          width='94%'
          m='0.5rem auto'
          p='0.5rem'
        >
          <Flex align='center' gap='2rem' width='30%'>
            <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
              <IconButton
                aria-label='Toggle menu'
                border='none'
                _hover={{ bg: "none", color: "brown", transform: "scale(1.2)" }}
                icon={
                  isOpened ? <CloseIcon /> : <HamburgerIcon fontSize='1.6rem' />
                }
                variant='outline'
              />
            </Box>
            <SearchNav />
          </Flex>
          <Heading as='h1' w='30%' fontSize={{ base: "1rem", md: "1.4rem" }}>
            NEXT DESIGN
          </Heading>
          <NavIcons />
        </Flex>

        {isLargeScreen && <NavLinks />}

        {!isLargeScreen && (
          <Collapse in={isOpened}>
            <NavLinks />
          </Collapse>
        )}
        <Box w='100%' h='1.5rem' bg='#E4A757'>
          <SlidingTextBanner />
        </Box>
      </Flex>
    </Box>
  );
}
