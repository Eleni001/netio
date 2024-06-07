import { auth } from '@/auth';
import { db } from '@/prisma/db';
import {
  Box,
  Center,
  Flex,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import UserOrderCard from '../components/UserOrderCard';

export default async function UserPage() {
  const session = await auth();

  if (!session || !session.user) {
    return 'You must log in';
  }

  const orders = await db.order.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      user: true,
      shippingAddress: true,
      orderRows: { include: { product: true } },
    },
  });

  return (
    <Flex padding={10} flexDirection={'column'} gap={5}>
      <Center>
        <Heading fontSize={30}>Your Orders</Heading>
      </Center>
      <Box overflowX="auto">
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Order Status</Th>
                <Th>Order Number</Th>
                <Th>Created at</Th>
                <Th>Name</Th>
                <Th>Address</Th>
                <Th>Total price</Th>
                <Th>Total Items</Th>
                <Th isNumeric>Details</Th>
              </Tr>
            </Thead>
            <Tbody>
              {session.user &&
                orders.map((order) => (
                  <UserOrderCard key={order.id} order={order} />
                ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th>Order Status</Th>
                <Th>Order Number</Th>
                <Th>Created at</Th>
                <Th>Name</Th>
                <Th>Address</Th>
                <Th>Total price</Th>
                <Th>Total Items</Th>
                <Th isNumeric>Details</Th>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Box>
    </Flex>
  );
}
