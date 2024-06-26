'use client';

import { Icon } from '@chakra-ui/react';
import { Product } from '@prisma/client';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { useCart } from '../contexts/CartContext';

interface Props {
  product: Product;
}

export default function AddToCartIcon(props: Props) {
  const { addToCart } = useCart();
  if (props.product.stock === 0) {
    return;
  }

  return (
    <Icon
      fontSize="1.7rem"
      transition={'transform 0.2s ease-in-out'}
      _hover={{
        cursor: 'pointer',
        color: 'brown',
        transform: 'scale(1.2)',
      }}
      onClick={() => addToCart(props.product)}
    >
      <HiOutlineShoppingBag />
    </Icon>
  );
}
