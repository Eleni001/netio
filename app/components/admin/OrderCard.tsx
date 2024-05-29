import { OrderWithInformation } from '@/app/types';
import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import OrderSentButton from './OrderSentButton';

interface Props {
  order: OrderWithInformation;
}

export default function OrderCard(props: Props) {
  return (
    // <Card
    //   direction={{ base: 'column', sm: 'row' }}
    //   overflow="hidden"
    //   variant="outline"
    // >
    //   <Stack>
    //     <CardBody>
    //       <Flex direction={'row'} justifyContent={'space-between'}>
    //         <Heading size="md">
    //           <Text>Ordernumber: {props.order.id}</Text>
    //         </Heading>
    //         <Text>Created at: {JSON.stringify(props.order.createdAt)}</Text>
    //       </Flex>
    //       {/* DAVID!!!! only plain objects can be passed to prisma.....> */}
    //       <OrderSentButton order={props.order} />

    //       <Flex direction={'column'}>
    //         <Text py="2">Name: {props.order.user.name}</Text>
    //         <Text>{props.order.shippingAddress.street}</Text>
    //         <Text>{props.order.shippingAddress.zip}</Text>
    //         <Text>{props.order.shippingAddress.city}</Text>
    //         <Text>{props.order.shippingAddress.email}</Text>
    //         <Text>{JSON.stringify(props.order.total)}kr</Text>

    //         {props.order.orderRows.map((orderRow, index) => (
    //           <Box
    //             key={index}
    //             mt={4}
    //             p={2}
    //             border="1px solid"
    //             borderRadius="md"
    //           >
    //             <Image
    //               src={orderRow.product.imageUrl}
    //               width={50}
    //               height={50}
    //               alt="image"
    //             />
    //             <Text>Product Name: {orderRow.product.title}</Text>
    //             <Text>Quantity: {orderRow.quantity}</Text>
    //             <Text>Price: {orderRow.product.price} kr</Text>
    //           </Box>
    //         ))}
    //       </Flex>
    //     </CardBody>

    //     <CardFooter justifyContent={'space-between'}>
    //       {/* <Button variant="solid" colorScheme="blue">
    //         Show details
    //       </Button> */}
    //       <Button variant="solid" colorScheme="red">
    //         Delete order
    //       </Button>
    //       {/* <Button variant="solid" colorScheme="yellow">
    //         Change shipping status
    //       </Button> */}
    //     </CardFooter>
    //   </Stack>
    // </Card>
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
            <Th isNumeric>Button</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>
              <OrderSentButton />
            </Td>
            <Td>{props.order.id}</Td>
            <Td>{JSON.stringify(props.order.createdAt)}</Td>
            <Td>{props.order.user.name}</Td>
            <Td>{props.order.shippingAddress.street}</Td>
            <Td>{JSON.stringify(props.order.total)}kr</Td>
            <Td></Td>
            <Td isNumeric>
              <Button
                bg="rgba(78, 199, 145, 1)"
                color="white"
                size="sm"
                mr="3px"
                _hover={{
                  transform: 'translateY(2px)',
                  boxShadow: 'lg',
                }}
              >
                Details
              </Button>
              <Button
                colorScheme="red"
                size="sm"
                _hover={{
                  transform: 'translateY(2px)',
                  boxShadow: 'lg',
                }}
              >
                Delete
              </Button>
            </Td>
          </Tr>
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
            <Th isNumeric>Button</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
}
