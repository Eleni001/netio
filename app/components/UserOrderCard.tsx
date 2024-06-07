'use client';
import { OrderWithInformation } from '@/app/types';
import { Button, Td, Text, Tr } from '@chakra-ui/react';
import Link from 'next/link';

interface Props {
  order: OrderWithInformation;
}

export default function UserOrderCard(props: Props) {
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
    <Tr>
      <Td>
        {props.order.sentStatus === true ? (
          <Text color="green">Sent</Text>
        ) : (
          <Text color="red">Not Sent</Text>
        )}
      </Td>
      <Td>{props.order.id}</Td>
      <Td>{formattedDate}</Td>
      <Td>{props.order.user.name}</Td>
      <Td>{props.order.shippingAddress.street}</Td>
      <Td>{JSON.stringify(props.order.total)}kr</Td>
      <Td>{totalItems}</Td>
      <Td isNumeric>
        <Link href={`/user/details/${props.order.id}`}>
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
      </Td>
    </Tr>
  );
}
