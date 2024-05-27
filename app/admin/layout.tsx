'use client';
import { Button, Flex } from '@chakra-ui/react';
import NextLink from 'next/link';
import { ReactNode } from 'react';
import AddCategoryModal from '../components/AddCategoryModal';

interface Props {
  children: ReactNode;
}
export default function Layout({ children }: Props) {
  return (
    <>
      <Flex padding={10} gap={8}>
        <AddCategoryModal />
        <NextLink href="/admin/product/new" data-cy="admin-add-product">
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
        <Button
          bg="grey"
          color="white"
          size="md"
          _hover={{
            transform: 'translateY(2px)',
            boxShadow: 'lg',
          }}
        >
          Add Category
        </Button>
        <Button
          bg="grey"
          color="white"
          size="md"
          _hover={{
            transform: 'translateY(2px)',
            boxShadow: 'lg',
          }}
        >
          Orders
        </Button>
      </Flex>
      {children}
    </>
  );
}
