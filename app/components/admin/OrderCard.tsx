import { OrderWithInformation } from '@/app/types';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';

interface Props {
  order: OrderWithInformation;
}

export default function OrderCard(props: Props) {
  console.log(props.order.shippingAddress);

  return (
    <Card
      direction={{ base: 'column', sm: 'row' }}
      overflow="hidden"
      variant="outline"
    >
      {/* <Image
        objectFit="fill"
        height={200}
        width={200}
        src={props.order.orderrows.productId}
        alt="Caffe Latte"
      /> */}

      <Stack>
        <CardBody>
          <Flex direction={'row'} justifyContent={'space-between'}>
            <Heading size="md">
              <Text>Ordernumber: {props.order.id}</Text>
            </Heading>
            <Text>Created at: {JSON.stringify(props.order.createdAt)}</Text>
          </Flex>
          <Text py="2">Name: {props.order.user.name}</Text>
          <Text py="2">
            Caffè latte is a coffee beverage of Italian origin made with
            espresso and steamed milk.
          </Text>
          <Flex direction={'column'}>
            <Text>{props.order.shippingAddress.street}</Text>
            <Text>{props.order.shippingAddress.zip}</Text>
            <Text>{props.order.shippingAddress.City}</Text>
            <Text>{props.order.shippingAddress.email}</Text>
          </Flex>
        </CardBody>

        <CardFooter justifyContent={'space-between'}>
          <Button variant="solid" colorScheme="blue">
            Show details
          </Button>
          <Button variant="solid" colorScheme="red">
            Delete order
          </Button>
          <Button variant="solid" colorScheme="yellow">
            Change shipping status
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
}
