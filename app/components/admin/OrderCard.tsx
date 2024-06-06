'use client';
import { OrderWithInformation } from '@/app/types';
import {
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Td,
  Tr,
} from '@chakra-ui/react';
import { BsThreeDots } from 'react-icons/bs';
import OrderSentButton from './OrderSentButton';

interface Props {
  order: OrderWithInformation;
}

export default function OrderCard(props: Props) {
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
        <OrderSentButton order={props.order} />
      </Td>
      <Td>{props.order.id}</Td>
      <Td>{formattedDate}</Td>
      <Td>{props.order.user.name}</Td>
      <Td>{props.order.shippingAddress.street}</Td>
      <Td>{JSON.stringify(props.order.total)}kr</Td>
      <Td>{totalItems}</Td>
      <Td isNumeric>
        <Menu>
          <MenuButton
            as={Button}
            rounded={'full'}
            variant={'link'}
            cursor={'pointer'}
            minW={0}
          >
            <Icon color="black">
              <BsThreeDots />
            </Icon>
          </MenuButton>
          <MenuList>
            <MenuItem as="a" href={`/admin/orders/details/${props.order.id}`}>
              <Button colorScheme="green">Details</Button>
            </MenuItem>
          </MenuList>
        </Menu>
      </Td>
    </Tr>
  );
}
