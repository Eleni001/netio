'use client';

import { Box, Flex, Link, Wrap, WrapItem } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { FaRegCreditCard, FaRegEye } from 'react-icons/fa';
import { GoPlus } from 'react-icons/go';

import AddCategoryButton from '../components/AddCategoryModal';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Flex padding={10} justify="center">
        <Wrap spacing={4} justify="center">
          <WrapItem>
            <AddCategoryButton />
          </WrapItem>
          <WrapItem>
            <Link href="/admin/product/new">
              <Box
                as="button"
                display="flex"
                alignItems="center"
                justifyContent="center"
                bg="gray.700"
                color="white"
                borderRadius="md"
                padding="4"
                _hover={{
                  bg: 'gray.600',
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
              >
                <GoPlus />
                Add Product
              </Box>
            </Link>
          </WrapItem>
          <WrapItem>
            <Link href="/admin/orders">
              <Box
                as="button"
                display="flex"
                alignItems="center"
                justifyContent="center"
                bg="gray.700"
                color="white"
                borderRadius="md"
                padding="4"
                _hover={{
                  bg: 'gray.600',
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
              >
                <FaRegEye />
                Show all orders
              </Box>
            </Link>
          </WrapItem>
          <WrapItem>
            <Link href="/admin/products">
              <Box
                as="button"
                display="flex"
                alignItems="center"
                justifyContent="center"
                bg="gray.700"
                color="white"
                borderRadius="md"
                padding="4"
                _hover={{
                  bg: 'gray.600',
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
              >
                <FaRegCreditCard />
                Show all products
              </Box>
            </Link>
          </WrapItem>
        </Wrap>
      </Flex>
      {children}
    </>
  );
}
