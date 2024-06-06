'use client';
import { Flex, Heading, Image } from '@chakra-ui/react';

export default function AdminHomePage() {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      height="70vh"
      p={4}
    >
      <Heading as="h1" size="2xl" mb={6}>
        Welcome admin!
      </Heading>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align="center"
        justify="center"
        width="100%"
        maxWidth="800px"
        gap={6}
      >
        <Image
          src="https://images.unsplash.com/photo-1585435465945-bef5a93f8849?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Admin Image"
          boxSize="500px x 600px"
          borderRadius="30px"
          objectFit="cover"
          mb={{ base: 8, md: 0 }}
        />
      </Flex>
    </Flex>
  );
}
