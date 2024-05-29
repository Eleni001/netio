import { db } from '@/prisma/db';
import { Box, Container, Flex } from '@chakra-ui/react';

interface Props {
  params: { id: string };
}

export default async function EditProductPage({ params }: Props) {
  const orders = await db.order.findMany({
    include: {
      user: true,
      shippingAddress: true,
      orderRows: { include: { product: true } },
    },
  });
  const param = Number(params.id);
  const order = orders.find((p) => p.id === param);
  return (
    <Container>
      <Flex>
        <Box>Looking at order {order?.user.name}</Box>
      </Flex>
    </Container>
  );
}
