import { Box, Flex, Image, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { DiProlog } from 'react-icons/di';

export default function ImagePreviewComp() {
  const [imagePreview] = useState('');
  return (
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
      {imagePreview ? (
        <Image
          width="100%"
          height="100%"
          objectFit="cover"
          src={imagePreview}
          alt="Preview product image"
        />
      ) : (
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
    </Box>
  );
}
