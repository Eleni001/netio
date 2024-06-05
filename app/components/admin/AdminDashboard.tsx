'use client';

import { deleteProduct } from '@/app/actions/actions';
import { ProductWithCategories } from '@/app/types';
import {
  Button,
  Checkbox,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { Product } from '@prisma/client';
import Image from 'next/image';
import { useState } from 'react';
import { BsThreeDots } from 'react-icons/bs';

interface Props {
  products: ProductWithCategories[];
}

export default function AdminDashboard({ products: newProducts }: Props) {
  const [products, setProducts] =
    useState<ProductWithCategories[]>(newProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showArchived, setShowArchived] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteClick = (product: Product) => {
    setSelectedProduct(product);
    onOpen();
  };

  // const confirmDelete = () => {
  //   if (selectedProduct) {
  //     // removeProduct(selectedProduct);
  //     setSelectedProduct(null);
  //     onClose();
  //   }

  const confirmDelete = async () => {
    if (selectedProduct) {
      try {
        await deleteProduct(selectedProduct.id);
        setProducts(
          products.filter((product) => product.id !== selectedProduct.id),
        );
        window.location.reload();
      } catch (error) {
        console.error('Failed to delete product');
      } finally {
        setSelectedProduct(null);
        onClose();
      }
    }
  };

  if (!newProducts) return;

  return (
    <>
      <Flex justify="center" m="5">
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete Product</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {`Are you sure you want to delete this product?`}
            </ModalBody>

            <ModalFooter>
              <Button
                bg="green.400"
                color="white"
                onClick={onClose}
                _hover={{ bg: 'green.300 ' }}
              >
                Cancel
              </Button>
              <Button colorScheme="red" onClick={confirmDelete} ml={3}>
                Delete
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Flex border={'1px'} borderColor={'black'} rounded={'lg'}>
          <Checkbox
            onChange={() => setShowArchived(!showArchived)}
            padding={5}
            rounded={'lg'}
            border={'ButtonShadow'}
            bg={'white'}
          >
            Show Archived Products
          </Checkbox>
        </Flex>
      </Flex>

      <TableContainer style={{ width: '100%', overflowX: 'auto' }}>
        <Table>
          <Thead>
            <Tr>
              <Th>image</Th>
              <Th>id</Th>
              <Th>title</Th>
              <Th>description</Th>
              <Th>categories</Th>
              <Th>stock</Th>
              <Th>price</Th>
            </Tr>
          </Thead>
          <Tbody>
            {newProducts.map((product) => {
              if (product.isArchived && !showArchived) {
                return null;
              }

              return (
                <Tr key={product.id}>
                  <Td
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Image
                      src={product.imageUrl}
                      alt={product.title}
                      width={80}
                      height={80}
                    />
                  </Td>
                  <Td>{product.id}</Td>
                  <Td>{product.title}</Td>
                  <Td style={{ whiteSpace: 'normal', width: '300px' }}>
                    {product.desc.length > 100
                      ? `${product.desc.slice(0, 50)}...`
                      : product.desc}
                  </Td>
                  <Td>
                    {product.categories
                      .map((category) => category.name)
                      .join(', ')}
                  </Td>
                  <Td>{product.stock}</Td>
                  <Td>{product.price}</Td>
                  <Td>
                    {!product.isArchived && (
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
                          <MenuItem as="a" href={`product/${product.id}`}>
                            <Button colorScheme="green">Edit</Button>
                          </MenuItem>
                          <MenuItem
                            as="div"
                            onClick={() => handleDeleteClick(product)}
                          >
                            <Button colorScheme="red">Delete</Button>
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    )}
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}

{
  /* <Flex justify="center" alignItems="center" height="100%">
                        <Link
                          href={`product/${product.id}`}
                          _hover={{ textDecoration: 'none' }}
                        >
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
                            Edit
                          </Button>
                        </Link>
                        <Button
                          colorScheme="red"
                          size="sm"
                          _hover={{
                            transform: 'translateY(2px)',
                            boxShadow: 'lg',
                          }}
                          onClick={() => handleDeleteClick(product)}
                        >
                          Delete
                        </Button>
                      </Flex> */
}
