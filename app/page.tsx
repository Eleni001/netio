"use client";

import { Link } from "@chakra-ui/next-js";
import {
  Flex,
  GridItem,
  Icon,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { LuHeart } from "react-icons/lu";
import BottomBanner from "./components/BottomBanner";
import HomePageTop from "./components/HomePageTop";
import { useAdmin } from "./contexts/AdminContext";
import { useCart } from "./contexts/CartContext";

export default function Home() {
  const { addToCart } = useCart();
  const { products } = useAdmin();

  return (
    <Flex flexDir="column">
      <HomePageTop />
      <SimpleGrid
        id="products-grid"
        width="80%"
        m="2rem auto"
        mt="5rem"
        columns={{ base: 1, md: 3, lg: 4 }}
        gap={5}
      >
        {products.map((product) => (
          <GridItem
            data-cy="product-id"
            key={product.id}
            boxShadow="1px 1px 2px rgba(0,0,0,0.1)"
            transition={"transform 0.2s ease-in-out"}
            _hover={{ cursor: "pointer", transform: "scale(1.05)" }}
          >
            <Flex flexDirection="column" height="100%" data-cy="product">
              <Link
                href={`/product/${product.id}`}
                _hover={{ textDecoration: "none" }}
              >
                <Image
                  src={product.image}
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
                    data-cy="product-title"
                    fontWeight="semibold"
                    textTransform="capitalize"
                    _hover={{ color: "brown" }}
                  >
                    {product.title}
                  </Text>
                  <Text data-cy="product-price" _hover={{ color: "brown" }}>
                    {product.price} kr
                  </Text>
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
                <Icon
                  fontSize="1.7rem"
                  transition={"transform 0.2s ease-in-out"}
                  _hover={{
                    cursor: "pointer",
                    color: "brown",
                    transform: "scale(1.2)",
                  }}
                  onClick={() => addToCart(product)} // add same logic here
                  data-cy="product-buy-button"
                >
                  <HiOutlineShoppingBag />
                </Icon>
              </Flex>
            </Flex>
          </GridItem>
        ))}
      </SimpleGrid>
      <BottomBanner />
    </Flex>
  );
}
