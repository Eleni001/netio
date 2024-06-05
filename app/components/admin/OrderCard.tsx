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
  useToast,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';
import CustomToast from '../CustomToast';
import OrderSentButton from './OrderSentButton';

interface Props {
  order: OrderWithInformation;
}

export default function OrderCard(props: Props) {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await deleteOrder(Number(props.order.id));

      if (response?.success) {
        toast({
          render: () => (
            <CustomToast
              toastSuccess={true}
              toastTitle="Successfully deleted order"
              toastContent="Order deleted successfully."
            />
          ),
          duration: 3000,
          isClosable: true,
        });
      } else {
        alert('Failed to delete order: ' + response?.error);
      }
    } catch (error) {
      <CustomToast
        toastSuccess={false}
        toastTitle="Error"
        toastContent="An error occurred while deleting the order."
      />;
    } finally {
      setLoading(false);
    }
  };

  const formattedDate = new Date(props.order.createdAt).toLocaleString(
    'sv-SE',
    {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    },
  );

  const totalItems = props.order.orderRows.reduce(
    (acc, row) => acc + row.quantity,
    0,
  );

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
            <Td>{formattedDate}</Td>
            <Td>{props.order.user.name}</Td>
            <Td>{props.order.shippingAddress.street}</Td>
            <Td>{JSON.stringify(props.order.total)}kr</Td>
            <Td>{totalItems}</Td>
            <Td isNumeric>
              <Link href={`/admin/orders/details/${props.order.id}`}>
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
              </Link>
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
