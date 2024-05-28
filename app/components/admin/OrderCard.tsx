import { OrderWithInformation } from '@/app/types';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import Image from 'next/image';
import OrderSentButton from './OrderSentButton';

interface Props {
  order: OrderWithInformation;
}

export default function OrderCard(props: Props) {
  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow="hidden"
      variant="outline"
    >
      <Stack>
        <CardBody>
          <Flex direction={'row'} justifyContent={'space-between'}>
            <Heading size="md">
              <Text>Ordernumber: {props.order.id}</Text>
            </Heading>
            <Text>Created at: {JSON.stringify(props.order.createdAt)}</Text>
          </Flex>
          {/* DAVID!!!! only plain objects can be passed to prisma.....> */}
          <OrderSentButton order={props.order} />

          <Flex direction={'column'}>
            <Text py="2">Name: {props.order.user.name}</Text>
            <Text>{props.order.shippingAddress.street}</Text>
            <Text>{props.order.shippingAddress.zip}</Text>
            <Text>{props.order.shippingAddress.city}</Text>
            <Text>{props.order.shippingAddress.email}</Text>
            <Text>{JSON.stringify(props.order.total)}kr</Text>

            {props.order.orderRows.map((orderRow, index) => (
              <Box
                key={index}
                mt={4}
                p={2}
                border="1px solid"
                borderRadius="md"
              >
                <Image
                  src={orderRow.product.imageUrl}
                  width={50}
                  height={50}
                  alt="image"
                />
                <Text>Product Name: {orderRow.product.title}</Text>
                <Text>Quantity: {orderRow.quantity}</Text>
                <Text>Price: {orderRow.product.price} kr</Text>
              </Box>
            ))}
          </Flex>
        </CardBody>

        <CardFooter justifyContent={'space-between'}>
          {/* <Button variant="solid" colorScheme="blue">
            Show details
          </Button> */}
          <Button variant="solid" colorScheme="red">
            Delete order
          </Button>
          {/* <Button variant="solid" colorScheme="yellow">
            Change shipping status
          </Button> */}
        </CardFooter>
      </Stack>
    </Card>
  );
}
