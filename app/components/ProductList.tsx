import {
  Flex,
  GridItem,
  Image,
  Link,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { Product } from "@prisma/client";
import { LuHeart } from "react-icons/lu";
import AddToCartIcon from "./AddToCartIcon";

interface Props {
  products: Product[];
}

export default function ProductList(props: Props) {
  return (
    <SimpleGrid
      id="products-grid"
      width="80%"
      m="2rem auto"
      mt="5rem"
      columns={{ base: 1, md: 3, lg: 4 }}
      gap={5}
    >
      {props.products.map((product) => (
        <GridItem
          key={product.id}
          boxShadow="1px 1px 2px rgba(0,0,0,0.1)"
          transition={"transform 0.2s ease-in-out"}
          _hover={{ cursor: "pointer", transform: "scale(1.05)" }}
        >
          <Flex flexDirection="column" height="100%">
            <Link
              href={`/product/${product.id}`}
              _hover={{ textDecoration: "none" }}
            >
              <Image
                src={product.imageUrl}
                alt={product.title}
                objectFit="cover"
                width="100%"
                height="200px"
              />

              <Flex
                justifyContent="flex-start"
                alignContent="center"
                flexDirection="column"
                mt="1.5rem"
              >
                <Text
                  fontWeight="semibold"
                  textTransform="capitalize"
                  _hover={{ color: "brown" }}
                >
                  {product.title}
                </Text>
                <Text _hover={{ color: "brown" }}>{product.price} kr</Text>
              </Flex>
            </Link>
            <Flex gap="6" m="0.5rem" justifyContent="end" mb="1rem">
              <Link
                href="/"
                color="black"
                transition={"transform 0.2s ease-in-out"}
                _hover={{
                  cursor: "pointer",
                  color: "brown",
                  transform: "scale(1.2)",
                }}
              >
                <LuHeart fontSize="1.7rem" />
              </Link>
              <AddToCartIcon product={product} />
            </Flex>
          </Flex>
        </GridItem>
      ))}
    </SimpleGrid>
  );
}
