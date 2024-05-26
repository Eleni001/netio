"use client";

import { ProductWithCategories } from "@/app/types";
import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { Category, Product } from "@prisma/client";
import { useState } from "react";
import { DiProlog } from "react-icons/di";
import ProductForm from "../ProductForm";

interface Props {
  params: string;
  product: Product[];
  categorys: Category[];
}
export default function AdminEditProductComp({
  params,
  product,
  categorys,
}: Props) {
  const findProduct: ProductWithCategories = product.find(
    (p) => p.id == params.id
  );
  const [imagePreview, setImagePreview] = useState<string | undefined>("");

  if (!product) {
    return (
      <main>
        <span> Product Does Not Exist - 404</span>
      </main>
    );
  }

  return (
    <div>
      <Heading textAlign="center" mt="2rem">
        Edit Product Form
      </Heading>
      <Flex
        flexDir={{ base: "column", md: "row" }}
        rounded="lg"
        justify="center"
        alignItems="center"
        width="80%"
        m="2rem auto"
        p="1rem"
        gap={{ base: "1rem", md: "2rem" }}
      >
        <Box
          bg="#FEF0D9"
          width={{ base: "350px", md: "400px" }}
          height={{ base: "300px", md: "480px" }}
          rounded="lg"
          overflow="hidden"
          position="relative"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {!imagePreview && (
            <Flex gap="0.5rem">
              <Text
                color="orange.400"
                fontWeight="bold"
                fontSize="1.5rem"
                textAlign="center"
                ml="1rem"
              >
                Preview Image
              </Text>
              <DiProlog fontSize="2.5rem" color="black" />
            </Flex>
          )}
          {imagePreview && (
            <Image
              width="100%"
              height="100%"
              objectFit="cover"
              src={imagePreview}
              alt="Preview product image"
            />
          )}
        </Box>
        <ProductForm
          setImagePreview={setImagePreview}
          editProduct={findProduct}
          categories={categorys}
        />
      </Flex>
    </div>
  );
}
