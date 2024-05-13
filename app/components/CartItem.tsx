import { CartItem as CartItemType } from "@/data";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Heading,
  Image,
  Square,
  Stack,
  Text,
} from "@chakra-ui/react";
import { MdClose } from "react-icons/md";
import { useCart } from "../contexts/CartContext";

export interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { removeFromCart, removeSameIdItems, addToCart } = useCart();

  const calculatePrice = () => {
    return Number(item.price) * Number(item.quantity);
  };

  return (
    <Card
      data-cy="cart-item"
      direction="row"
      overflow="hidden"
      variant="outline"
      justify="center"
      align="center"
      p="0.5rem"
      gap="1rem"
      width={{ base: "100%", md: "60%" }}
      height={{ base: "150px", md: "200px" }}
    >
      <Box w="150px" h={{ base: "130px", md: "150px" }}>
        <Image
          objectFit="cover"
          width="100%"
          height="100%"
          src={item.image}
          alt={item.title}
        />
      </Box>
      <Square
        position="absolute"
        top="1rem"
        right="1rem"
        size="30px"
        fontSize="1.5rem"
        _hover={{
          color: "brown",
          cursor: "pointer",
          transform: "scale(1.2)",
        }}
        onClick={() => removeSameIdItems(item)}
      >
        <MdClose />
      </Square>

      <Stack width="100%">
        <CardBody flexDir="column" gap="3">
          <Heading size="md" data-cy="product-title" textTransform="capitalize">
            {item.title}
          </Heading>
          <Text py="2" fontSize="1rem">
            {" "}
            {item.price} kr
          </Text>
        </CardBody>

        <CardFooter
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          data-cy="quantity-controls"
          fontSize="1.3rem"
          width="100%"
        >
          <Text fontSize="1rem" fontWeight="semibold" data-cy="product-price">
            Total: {calculatePrice()} kr
          </Text>

          <Flex>
            <Square
              bg="#D9D9D9"
              size="30px"
              onClick={() => removeFromCart(item)}
              data-cy="decrease-quantity-button"
              _hover={{ cursor: "pointer", transform: "scale(1.1)" }}
            >
              <MinusIcon />
            </Square>
            <Square bg="#f4f2f2" size="30px" data-cy="product-quantity">
              <Text>{item.quantity}</Text>
            </Square>
            <Square
              bg="#D9D9D9"
              size="30px"
              onClick={() => addToCart(item)}
              _hover={{ cursor: "pointer", transform: "scale(1.1)" }}
              data-cy="increase-quantity-button"
            >
              <AddIcon />
            </Square>
          </Flex>
        </CardFooter>
      </Stack>
    </Card>
  );
}
