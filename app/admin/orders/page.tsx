import OrderCard from '@/app/components/admin/OrderCard';
import { db } from '@/prisma/db';
import { Flex, Text } from '@chakra-ui/react';

export default async function OrdersPage() {
  const orders = await db.order.findMany({
    include: {
      user: true,
      shippingAddress: true,
      orderRows: { include: { product: true } },
    },
  });

  return (
    <Flex padding={10} flexDirection={'column'} gap={5}>
      <Text fontSize={25}>Orderpage</Text>
      {orders.map((order) => (
        <>
          <OrderCard order={order} key={order.id} />
        </>
      ))}
    </Flex>
  );
}
