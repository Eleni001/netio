import { auth } from '@/auth';
import { db } from '@/prisma/db';
import { Box, Center, Divider, Flex, Heading, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { IoIosArrowRoundBack } from 'react-icons/io';

interface Props {
  params: { id: string };
}

export default async function UserOrderDetails({ params }: Props) {
  const session = await auth();
  const orders = await db.order.findMany({
    where: {
      userId: session?.user.id,
    },
    include: {
      user: true,
      shippingAddress: true,
      orderRows: { include: { product: true } },
    },
  });
  const param = Number(params.id);
  const order = orders.find((p) => p.id === param);
  const total =
    order?.orderRows?.reduce((sum, row) => sum + row.product.price, 0) || 0;

  if (!order) {
    return (
      <Center h="100vh" bg="gray.50">
        <Box
          p={8}
          border="1px solid"
          borderColor="gray.200"
          borderRadius="lg"
          boxShadow="lg"
          bg="white"
          textAlign="center"
        >
          <Heading as="h2" size="lg" mb={4} color="red.500">
            No Order Found
          </Heading>
          <Text color="gray.500">Please check the order ID and try again.</Text>
        </Box>
      </Center>
    );
  }

  return (
    <Flex
      border="1px solid"
      borderColor="gray.200"
      p={10}
      flexDir="column"
      h="100%"
      borderRadius="lg"
      boxShadow="lg"
      bg="white"
      position="relative"
    >
      <Link href="/user">
        <IoIosArrowRoundBack size={35} />
      </Link>
      <Heading as="h2" size="lg" mb={4} textAlign="center" color="teal.500">
        Order ID: {order?.id}
      </Heading>
      <Text textAlign="center" mb={4} color="gray.500">
        Date Created: {new Date(order?.createdAt).toLocaleDateString()}
      </Text>

      <Box mb={6} p={4} bg="gray.50" borderRadius="md">
        <Heading as="h3" size="md" mb={4} color="teal.600">
          Shipping Information
        </Heading>
        <Text>Name: {order?.user.name}</Text>
        <Text>Email: {order?.shippingAddress.email}</Text>
        <Text>Street: {order?.shippingAddress.street}</Text>
        <Text>City: {order?.shippingAddress.city}</Text>
        <Text>Zip: {order?.shippingAddress.zip}</Text>
      </Box>

      <Heading as="h3" size="md" mb={4} color="teal.600">
        Products
      </Heading>
      <Flex flexDirection="column" gap={6}>
        {order?.orderRows.map((orderRow, index) => (
          <Box
            key={index}
            p={4}
            border="1px solid"
            borderColor="gray.200"
            borderRadius="md"
            boxShadow="sm"
            bg="white"
          >
            <Flex alignItems="center" gap={4}>
              <Image
                src={orderRow.product.imageUrl}
                objectFit="cover"
                alt={orderRow.product.title}
                height={50}
                width={50}
              />
              <Box>
                <Text fontWeight="bold" color="gray.700">
                  Product Name: {orderRow.product.title}
                </Text>
                <Text color="gray.600">Quantity: {orderRow.quantity}</Text>
                <Text color="gray.600">Price: {orderRow.product.price} kr</Text>
              </Box>
            </Flex>
          </Box>
        ))}
      </Flex>

      <Divider my={6} borderColor="gray.300" />

      <Text
        fontWeight="bold"
        fontSize="lg"
        display={'flex'}
        justifyContent={'space-between'}
        color="teal.600"
      >
        Total Price: {total} kr
      </Text>
      <Text
        fontWeight="bold"
        fontSize="lg"
        display={'flex'}
        justifyContent={'space-between'}
        color="teal.600"
      >
        Status of your order:
      </Text>
      <Text>
        {order.sentStatus === true ? (
          <Text color="green">Sent</Text>
        ) : (
          <Text color="red">Not Sent</Text>
        )}
      </Text>
    </Flex>
  );
}
