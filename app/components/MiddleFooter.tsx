import {
  Box,
  Center,
  Container,
  Heading,
  SimpleGrid,
  Stack,
  Tag,
} from "@chakra-ui/react";

export function MiddleFooter() {
  return (
    <Center as='footer' bg="#FEE0B3">
      <Box color="black">
        <center>
          <Heading
            as="h1"
            w="30%"
            mt={6}
            fontSize={{ base: "1rem", md: "1.4rem" }}
          >
            NEXT DESIGN
          </Heading>
        </center>
        <Container as={Stack} maxW={"6xl"} py={10}>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8}>
            <Stack align={"flex-start"} pl={8}>
              <Heading fontWeight="bold" fontSize={"xl"} mb={2}>
                Customer Service
              </Heading>
              <Box>Customer service</Box>
              <Stack direction={"row"} align={"center"} spacing={2}>
                <Box>Customer club</Box>
                <Tag size={"sm"} bg="green.300" ml={2} color={"white"}>
                  New
                </Tag>
              </Stack>
              <Box>Delivery information</Box>
              <Box>Returns & complaints</Box>
              <Box>Security & policy</Box>
            </Stack>
            <Stack align={"flex-start"}>
              <Heading fontWeight="bold" fontSize={"xl"} mb={2}>
                ASSORTMENT
              </Heading>
              <Box>Setting & serving</Box>
              <Box>Kitchen & cooking</Box>
              <Box>Furnishings</Box>
              <Box>Lighting</Box>
              <Box>Carpets & textiles</Box>
            </Stack>
            <Stack align={"flex-start"}>
              <Heading fontWeight="bold" fontSize={"xl"} mb={2}>
                INSPIRATIONS
              </Heading>
              <Box>Inspiration</Box>
              <Box>Trademarks</Box>
              <Box>Designers</Box>
              <Box>Promotions</Box>
              <Box>Best Seller</Box>
            </Stack>
            <Stack align={"flex-start"}>
              <Heading fontWeight="bold" fontSize={"xl"} mb={2}>
                ABOUT NEXT DESIGN
              </Heading>
              <Box>About us</Box>
              <Box>Reviews</Box>
              <Box>Work with us</Box>
              <Box>Press</Box>
              <Box>Charity</Box>
            </Stack>
          </SimpleGrid>
        </Container>
      </Box>
    </Center>
  );
}
