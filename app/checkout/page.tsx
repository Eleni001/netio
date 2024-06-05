import { auth } from '@/auth';
import { AbsoluteCenter, Box, Divider, Text } from '@chakra-ui/react';
import CartCard from '../components/CartCard';
import CheckoutForm from '../components/CheckoutForm';
import Signin from '../signin/page';

export default async function CheckoutPage() {
  const session = await auth();

  return (
    <>
      <CartCard />
      <Box position="relative" padding="10" mt="2rem">
        <Divider />
        <AbsoluteCenter bg="white" px="4">
          <Text fontSize={{ base: '1.4rem', md: '2rem' }}>
            {!session ? 'Please login to continue' : 'Customer Information'}
          </Text>
        </AbsoluteCenter>
      </Box>
      {!session ? <Signin searchParams={{}} /> : <CheckoutForm />}
    </>
  );
}
