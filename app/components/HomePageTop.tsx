import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";

export default function HomePageTop() {
  return (
    <Flex
      width='100%'
      position='relative'
      flexDir={{ base: "column", md: "row" }}
      mb='2rem'
    >
      <Flex
        flexDir='column'
        justify='center'
        align='center'
        textAlign='center'
        position='absolute'
        left='50%'
        top='50%'
        transform='translate(-50%, -50%)'
        width={{ base: "80%", md: "50%" }}
        zIndex='2'
        gap='2rem'
      >
        <Text
          fontSize={{ base: "1.5rem", md: "2rem" }}
          color='white'
          fontWeight='semibold'
        >
          Discover the future of modern living
        </Text>
        <Text fontSize={{ base: "1.2rem", md: "1.4rem" }} color='white'>
          <Text
            as='em'
            fontSize={{ base: "1.3rem", md: "1.7rem" }}
            fontWeight='semibold'
          >
            Welcome to Next Design
          </Text>{" "}
          - where contemporary art meets timeless comfort. Explore our exclusive
          collection and find the perfect pieces for your style. Your journey to
          a new home begins here.
        </Text>
        <Button
          width='fit-content'
          fontSize='1.5rem'
          bg='#E4A757'
          textTransform='capitalize'
          onClick={() => window.scrollTo({ top: 650, behavior: "smooth" })}
          _hover={{ bg: "#efdbc2" }}
        >
          Explore our collection
        </Button>
      </Flex>
      <Box width={{ base: "100%", md: "50%" }} height='80vh'>
        <Image
          src={
            "https://images.pexels.com/photos/7175564/pexels-photo-7175564.jpeg?auto=compress&cs=tinysrgb&w=800"
          }
          alt=''
          height='100%'
          width='100%'
          objectFit='cover'
        />
      </Box>
      <Box width='50%' height='80vh' display={{ base: "none", md: "block" }}>
        <Image
          src={
            "https://images.pexels.com/photos/6580416/pexels-photo-6580416.jpeg?auto=compress&cs=tinysrgb&w=800"
          }
          alt=''
          height='100%'
          width='100%'
          objectFit='cover'
        />
      </Box>
    </Flex>
  );
}
