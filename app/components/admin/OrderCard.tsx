'use client';
import { deleteOrder } from '@/app/actions/actions';
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
import { useState } from 'react';
import OrderSentButton from './OrderSentButton';

interface Props {
  order: OrderWithInformation;
}

export default function OrderCard(props: Props) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await deleteOrder(Number(props.order.id));

      if (response?.success) {
        alert('Order deleted successfully');
      } else {
        alert('Failed to delete order: ' + response?.error);
      }
    } catch (error) {
      alert('An error occurred while deleting the order');
    } finally {
      setLoading(false);
    }
  };
  return (
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
              <OrderSentButton order={props.order} />
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
                isLoading={loading}
                onClick={handleDelete}
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
