"use client";

import { useCart } from "@/app/contexts/CartContext";
import { products } from "@/data";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { MdLocalShipping } from "react-icons/md";

type PageProps = { params: { id: string } };

export default function ProductDetail({ params }: PageProps) {
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === params.id);
  if (!product) {
    return (
      <main>
        <span> Product Does Not Exist - 404</span>
      </main>
    );
  }
  return (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          <Image
            rounded={"md"}
            alt={"product image"}
            src={product.image}
            fit={"cover"}
            align={"center"}
            w={"100%"}
            h={{ base: "100%", sm: "400px", lg: "500px" }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Heading
              data-cy="product-title"
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              {product.title}
            </Heading>
            <Text
              data-cy="product-price"
              color="gray.900"
              fontWeight={300}
              fontSize={"2xl"}
            >
              {product.price}
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={<StackDivider borderColor="gray.600" />}
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text data-cy="product-description" fontSize={"lg"}>
                {product.description}
              </Text>
            </VStack>
          </Stack>

          <Button
            data-cy="product-buy-button"
            onClick={() => addToCart(product)}
            rounded={"none"}
            w={"full"}
            mt={8}
            size={"lg"}
            py={"7"}
            bg="rgba(78, 199, 145, 1)"
            color="white"
            textTransform={"uppercase"}
            _hover={{
              transform: "translateY(2px)",
              boxShadow: "lg",
            }}
          >
            Add to cart
          </Button>

          <Stack direction="row" alignItems="center" justifyContent={"center"}>
            <MdLocalShipping />
            <Text>2-3 business days delivery</Text>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
