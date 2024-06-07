'use client';

import { Box, Grid, GridItem, Link, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { FaRegCreditCard, FaRegEye } from 'react-icons/fa';
import { GoPlus } from 'react-icons/go';

import { usePathname } from 'next/navigation';
import AddCategoryButton from '../components/AddCategoryModal';

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  const pathname = usePathname();

  return (
    <>
      <Grid
        templateColumns={{
          base: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)',
        }}
        gap={5}
        padding={5}
        justifyItems="center"
      >
        <GridItem width={'100%'}>
          <AddCategoryButton />
        </GridItem>
        <GridItem width={'100%'}>
          <Link href="/admin/product/new">
            <Box
              as="button"
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg={pathname.includes('product/new') ? 'gray.500' : 'gray.800'}
              color="white"
              borderRadius="md"
              padding="4"
              gap={'2'}
              width={'100%'}
              _hover={{
                bg: 'gray.600',
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
            >
              <GoPlus />
              <Text>Add Product</Text>
            </Box>
          </Link>
        </GridItem>
        <GridItem width={'100%'}>
          <Link href="/admin/orders">
            <Box
              as="button"
              display="flex"
              gap={'2'}
              alignItems="center"
              justifyContent="center"
              bg={pathname.includes('admin/orders') ? 'gray.500' : 'gray.800'}
              color="white"
              width={'100%'}
              borderRadius="md"
              padding="4"
              _hover={{
                bg: 'gray.600',
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}
            >
              <FaRegEye />
              <Text>Show all orders</Text>
            </Box>
          </Link>
        </GridItem>
        <GridItem width={'100%'}>
          <Link href="/admin/products">
            <Box
              as="button"
              gap={'2'}
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg={pathname.includes('admin/products') ? 'gray.500' : 'gray.800'}
              width={'100%'}
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
              <Text>Show all products</Text>
            </Box>
          </Link>
        </GridItem>
      </Grid>
      {children}
    </>
  );
}
