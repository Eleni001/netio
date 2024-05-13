"use client";
import {
  Box,
  Container,
  Flex,
  Icon,
  Image,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { ReactElement } from "react";
import { FcAssistant, FcDonate, FcInTransit } from "react-icons/fc";

interface FeatureProps {
  title: string;
  text: string;
  icon: ReactElement;
}

const Feature = ({ title, text, icon }: FeatureProps) => {
  return (
    <Stack>
      <Flex
        w={16}
        h={16}
        align={"center"}
        justify={"center"}
        color={"white"}
        rounded={"full"}
        bg={"gray.100"}
        mb={1}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={"gray.600"}>{text}</Text>
    </Stack>
  );
};

function About() {
  return (
    <Flex
      flexDirection='column'
      justifyContent='center'
      alignItems='center'
      fontSize='2rem'
      mt='3rem'
      width={{ base: "80%", md: "60%" }}
      mx='auto'
      gap='2rem'
    >
      <Text fontSize='1.7rem'>Our Story & Philosophy</Text>
      <Text fontSize={{ base: "1rem", md: "1.3rem" }} textAlign='center'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, facilis.
        Assumenda cumque eaque corrupti enim molestias unde iure id className.
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi,
        veritatis.
      </Text>
      <Text fontSize={{ base: "1rem", md: "1.3rem" }} textAlign='center'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis
        sed facere soluta omnis explicabo? Quia dolore dolorum inventore nostrum
        facere praesentium modi vel ut doloremque!
      </Text>

      <Container
        h='40vh'
        mt={{ base: "2rem", md: "5rem" }}
        position='relative'
        _after={{
          content: `""`,
          position: "absolute",
          top: 0,
          left: 0,
          w: "100%",
          h: "100%",
          bg: "rgba(0,0,0,0.2)",
        }}
        clipPath={{
          base: "none",
          md: "polygon(50% 0, 100% 10%, 100% 89%, 50% 100%, 0 90%, 0 10%)",
        }}
      >
        <Image
          src='https://images.pexels.com/photos/5256816/pexels-photo-5256816.jpeg?auto=compress&cs=tinysrgb&w=800'
          alt='about us image'
          fit='cover'
          position='absolute'
          top='0'
          left='0'
          w='100%'
          h='100%'
        />
      </Container>

      <Box p={4}>
        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          spacing={10}
          fontSize='1.3rem'
          mt='5rem'
          mb='5rem'
        >
          <Feature
            icon={<Icon as={FcAssistant} w={10} h={10} />}
            title={"Lifetime Support"}
            text={
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore..."
            }
          />
          <Feature
            icon={<Icon as={FcDonate} w={10} h={10} />}
            title={"Unlimited Donations"}
            text={
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore..."
            }
          />
          <Feature
            icon={<Icon as={FcInTransit} w={10} h={10} />}
            title={"Instant Delivery"}
            text={
              "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore..."
            }
          />
        </SimpleGrid>
      </Box>
    </Flex>
  );
}

export default About;
