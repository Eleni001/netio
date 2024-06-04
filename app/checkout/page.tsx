'use client';
import {
  AbsoluteCenter,
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Text,
} from '@chakra-ui/react';
import { signIn, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import CartItem from '../components/CartItem';
import CheckoutForm from '../components/CheckoutForm';
import { useCart } from '../contexts/CartContext';

export default function CheckoutPage() {
  const { cart } = useCart();
  const calculateTotalPrice = () => {
    let totalPrice: number = 0; // Specify the type of totalPrice as number
    cart.forEach((item) => {
      totalPrice += Number(item.price) * item.quantity;
    });
    return totalPrice;
  };

  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <>
      <Flex
        width={{ base: '95%', md: '70%' }}
        flexDir="column"
        justify="center"
        alignItems="center"
        m="16px auto"
        gap="1rem"
        mt="2rem"
      >
        <HiOutlineShoppingBag fontSize="3rem" fontWeight="bold" />

        <Text fontSize={{ base: '1.5rem', md: '2.4rem' }}></Text>
        {cart.length === 0 ? (
          <p>Your shopping bag is empty</p>
        ) : (
          <>
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </>
        )}
        <Card
          w={{ base: '100%', md: '60%' }}
          h="4rem"
          bg="#f4f2f2"
          width="inherit"
          display="flex"
          justifyContent="center"
          alignItems="end"
          p="1.5rem"
        >
          <Text fontSize="1.5rem">Total: {calculateTotalPrice()}kr</Text>
        </Card>
      </Flex>
      <Box position="relative" padding="10" mt="2rem">
        <Divider />
        <AbsoluteCenter bg="white" px="4">
          <Text fontSize={{ base: '1.4rem', md: '2rem' }}>
            Customer Information
          </Text>
        </AbsoluteCenter>
      </Box>
      {session === null ? (
        <Flex
          width={{ base: '95%', md: '70%' }}
          flexDir="column"
          justify="center"
          alignItems="center"
          m="16px auto"
          gap="1rem"
          mt="2rem"
        >
          <Text>Please sign in to continue</Text>
          <Button
            onClick={() => signIn(undefined, { callbackUrl: pathname })}
            bg="rgba(78, 199, 145, 1)"
            color={'white'}
            _hover={{
              bg: 'rgba(60, 150, 110, 1)',
            }}
          >
            SignIn
          </Button>
        </Flex>
      ) : (
        <CheckoutForm />
      )}
    </>
  );
}
