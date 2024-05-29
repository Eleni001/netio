import { Button, Flex } from '@chakra-ui/react';
import NextLink from 'next/link';
import { ReactNode } from 'react';
import AddCategoryButton from '../components/AddCategoryModal';

interface Props {
  children: ReactNode;
}
export default function Layout({ children }: Props) {
  return (
    <>
      <Flex padding={10} gap={8}>
        <AddCategoryButton />
        <NextLink href="/admin/product/new">
          <Button
            bg="grey"
            color="white"
            size="md"
            _hover={{
              transform: 'translateY(2px)',
              boxShadow: 'lg',
            }}
          >
            Add Product
          </Button>
        </NextLink>
        <NextLink href="/admin/orders">
          <Button
            bg="grey"
            color="white"
            size="md"
            _hover={{
              transform: 'translateY(2px)',
              boxShadow: 'lg',
            }}
          >
            Show all order
          </Button>
        </NextLink>
        <NextLink href="/admin/products">
          <Button
            bg="grey"
            color="white"
            size="md"
            _hover={{
              transform: 'translateY(2px)',
              boxShadow: 'lg',
            }}
          >
            Show all products
          </Button>
        </NextLink>
      </Flex>
      {children}
    </>
  );
}
