'use client';

import {
  Box,
  Container,
  Divider,
  Flex,
  Heading,
  Image,
  ListItem,
  Table,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  UnorderedList,
} from '@chakra-ui/react';
import { useCustomer } from '../contexts/CustomerContext';

export default function Confirmation() {
  const { customerData, orderItems } = useCustomer();

  return (
    <Container maxW="container.lg" padding={15}>
      <Box mb={4}>
        <Heading as="h1" mb={6}>
          Order Confirmation
        </Heading>
        <Text mb={6}>
          Order Number:{' '}
          <Text as="span" fontWeight="bold">
            {customerData.order.id}
          </Text>
        </Text>
        <Text>Hello</Text>
        <Text mb={4}>Thank you for choosing to shop with us.</Text>
        <Text mb={6}>
          We understand that you are just dying to get your new design favorite
          home, and we promise to do our best to ship your order as soon as we
          can. Our ambition is to help you create a home to love and to which
          you proudly open the door. We therefore hope that you will be
          completely satisfied with your order.
        </Text>
      </Box>
      <Table variant="simple" mt={6} mb={6}>
        <Thead bg="gray.200">
          <Tr>
            <Th>Product</Th>
            <Th>Quantity</Th>
            <Th>Price</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orderItems.map((item) => (
            <Tr key={item.id}>
              <Td>
                <Flex alignItems="center">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    w="50px"
                    h="50px"
                  />
                  <Text ml="2">{item.title}</Text>
                </Flex>
              </Td>
              <Td>{item.quantity}</Td>
              <Td>{item.price}</Td>
            </Tr>
          ))}
        </Tbody>
        <Tfoot bg="gray.200">
          <Tr>
            <Td fontWeight="bold" colSpan={2}>
              Total:
            </Td>
            <Td fontWeight="bold">{customerData.order.total} kr</Td>
          </Tr>
        </Tfoot>
      </Table>
      <Divider />
      <Box mt={6}>
        <Heading as="h1" mb={6}>
          Delivery Information
        </Heading>
        <Text mb={6}>
          {customerData.firstName} {customerData.lastName}
        </Text>
        <Text mb={6}>{customerData.address}</Text>
        <Text mb={6}>{customerData.postalCode}</Text>
        <Text mb={6}>{customerData.city}</Text>
        <Text mb={6}>{customerData.phone}</Text>
        <Text mb={6}>{customerData.email}</Text>
      </Box>
      <Heading as="h1" mb={6}>
        Your order step by step
      </Heading>
      <UnorderedList>
        <ListItem>
          Order confirmation via email. Your order has been received and you can
          check your details.
        </ListItem>
        <ListItem color="gray.400">
          The order is being processed. Your order will be sent when all
          products are available for delivery. In the event of a delivery delay,
          we will notify you via email. If you wish to receive a partial
          delivery, please contact our customer service.
        </ListItem>
        <ListItem color="gray.400">
          Delivery notification via email. Your goods are packed and on their
          way to you.
        </ListItem>
        <ListItem color="gray.400">
          SMS notification. You will receive an SMS when your parcel is
          available to collect from your parcel agent. The package must be
          picked up within 14 days. In case of home delivery, you will receive
          an SMS to book a delivery time.
        </ListItem>
        <ListItem color="gray.400">
          365 day right of return. You can always return your item if you regret
          it.
        </ListItem>
      </UnorderedList>
    </Container>
  );
}
