import OrderCard from '@/app/components/admin/OrderCard';

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
import { redirect } from 'next/navigation';

export default async function OrdersPage() {
  const session = await auth();

  if (!session?.user.isAdmin) redirect('/');

  const orders = await db.order.findMany({
    include: {
      user: true,
      shippingAddress: true,
      orderRows: { include: { product: true } },
    },
  });

  return (
    <Flex padding={10} flexDirection={'column'} gap={5}>
      <Center>
        <Heading fontSize={30}>All Orders</Heading>
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
              </Tr>
            </Thead>
            <Tbody>
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
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
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Box>
    </Flex>
  );
}
