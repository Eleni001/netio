'use client';

import ProductForm from '@/app/components/ProductForm';
import { useAdmin } from '@/app/contexts/AdminContext';
import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { DiProlog } from 'react-icons/di';

type PageProps = { params: { id: string } };

export default function AdminEditProductPage({ params }: PageProps) {
  const { products } = useAdmin();
  const product = products.find((p) => p.id === params.id);
  const [imagePreview, setImagePreview] = useState('');

  if (!product) {
    return (
      <main>
        console.log(params.id)
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
        flexDir={{ base: 'column', md: 'row' }}
        rounded="lg"
        justify="center"
        alignItems="center"
        width="80%"
        m="2rem auto"
        p="1rem"
        gap={{ base: '1rem', md: '2rem' }}
      >
        <Box
          bg="#FEF0D9"
          width={{ base: '350px', md: '400px' }}
          height={{ base: '300px', md: '480px' }}
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
        <ProductForm setImagePreview={setImagePreview} product={product} />
      </Flex>
    </div>
  );
}
