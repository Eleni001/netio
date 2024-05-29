'use client';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  Collapse,
  Flex,
  Heading,
  IconButton,
  Link,
  useBreakpointValue,
} from '@chakra-ui/react';
import { Category } from '@prisma/client';
import { Session } from 'next-auth';
import { useState } from 'react';
import NavIcons from './NavIcons';
import NavLinks from './NavLinks';
import SearchNav from './SearchNav';
import SlidingTextBanner from './SlidingTextBanner';

interface Props {
  session: Session | null;
  categories: Category[];
}

export default function HeaderComponents({ session, categories }: Props) {
  const [isOpened, setIsOpened] = useState(false);
  const isLargeScreen = useBreakpointValue({ base: false, md: true });

  const handleToggle = () => setIsOpened(!isOpened);

  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      left="0"
      right="0"
      zIndex="5"
      width="full"
    >
      <Flex flexDir="column" bg="white" zIndex="2" width="100%">
        <Flex
          justify="space-between"
          alignItems="center"
          width="94%"
          m="0.5rem auto"
          p="0.5rem"
        >
          <Flex align="center" gap="2rem" width="30%">
            <Box display={{ base: 'block', md: 'none' }} onClick={handleToggle}>
              <IconButton
                aria-label="Toggle menu"
                border="none"
                _hover={{ bg: 'none', color: 'brown', transform: 'scale(1.2)' }}
                icon={
                  isOpened ? <CloseIcon /> : <HamburgerIcon fontSize="1.6rem" />
                }
                variant="outline"
              />
            </Box>
            <SearchNav />
          </Flex>
          <Link href="/" _hover={{ color: 'brown' }} textDecor="none" w="30%">
            <Heading as="h1" w="30%" fontSize={{ base: '1rem', md: '1.4rem' }} whiteSpace="nowrap">
              NETIO
            </Heading>
          </Link>
          <NavIcons session={session} />
        </Flex>

        {isLargeScreen && <NavLinks categories={categories} />}

        {!isLargeScreen && (
          <Collapse in={isOpened}>
            <NavLinks categories={categories} />
          </Collapse>
        )}
        <Box w="100%" h="1.5rem" bg="#E4A757">
          <SlidingTextBanner />
        </Box>
      </Flex>
    </Box>
  );
}
