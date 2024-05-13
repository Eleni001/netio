import { Box, Icon, Text } from "@chakra-ui/react";

export default function CustomToast() {
  return (
    <Box
      data-cy='added-to-cart-toast'
      bg='green.500'
      color='white'
      p={3}
      borderRadius='md'
      boxShadow='lg'
    >
      <Text fontWeight='bold'>Added to cart</Text>
      <Text>Your product has been added to your cart.</Text>
    </Box>
  );
}
