import { getAllProducts } from "@/app/actions/actions";
import AddToCartButton from "@/app/components/AddToCartButton";
import {
  Box,
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

export default async function ProductDetail({ params }: PageProps) {
  const products = await getAllProducts();
  const product = products.find((p) => p.id === Number(params.id));
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
            src={product.imageUrl}
            fit={"cover"}
            align={"center"}
            w={"100%"}
            h={{ base: "100%", sm: "400px", lg: "500px" }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Heading
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
              {product.price} SEK
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={<StackDivider borderColor="gray.600" />}
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text data-cy="product-description" fontSize={"lg"}>
                {product.desc}
              </Text>
            </VStack>
          </Stack>
          <AddToCartButton product={product} />
          <Stack direction="row" alignItems="center" justifyContent={"center"}>
            <MdLocalShipping />
            <Text>2-3 business days delivery</Text>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
