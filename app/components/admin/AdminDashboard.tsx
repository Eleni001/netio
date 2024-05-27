"use client";

import { ProductWithCategories } from "@/app/types";
import {
  Button,
  Flex,
  Link,
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
} from "@chakra-ui/react";
import { Product } from "@prisma/client";
import Image from "next/image";
import NextLink from "next/link";
import { useState } from "react";

interface Props {
  products: ProductWithCategories[];
}

export default function AdminDashboard({ products: newProducts }: Props) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteClick = (product: Product) => {
    setSelectedProduct(product);
    onOpen();
  };

  const confirmDelete = () => {
    if (selectedProduct) {
      // removeProduct(selectedProduct);
      setSelectedProduct(null);
      onClose();
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
                _hover={{ bg: "green.300 " }}
                data-cy="confirm-delete-button"
              >
                Cancel
              </Button>
              <Button colorScheme="red" onClick={confirmDelete} ml={3}>
                Delete
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <NextLink href="/admin/product/new" data-cy="admin-add-product">
          <Button
            bg="rgba(78, 199, 145, 1)"
            color="white"
            size="lg"
            _hover={{
              transform: "translateY(2px)",
              boxShadow: "lg",
            }}
          >
            Add Product
          </Button>
        </NextLink>
      </Flex>

      <TableContainer style={{ width: "100%", overflowX: "auto" }}>
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
            {newProducts.map((product) => (
              <Tr key={product.id} data-cy="product">
                <Td display="flex" justifyContent="center" alignItems="center">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    width={80}
                    height={80}
                  />
                </Td>
                <Td data-cy="product-id">{product.id}</Td>
                <Td data-cy="product-title">{product.title}</Td>
                <Td
                  style={{ whiteSpace: "normal", width: "300px" }}
                  data-cy="product-description"
                >
                  {product.desc.length > 100
                    ? `${product.desc.slice(0, 50)}...`
                    : product.desc}
                </Td>

                <Td data-cy="product-price">
                  {product.categories
                    .map((category) => category.name)
                    .join(", ")}
                </Td>
                <Td data-cy="product-price">{product.stock}</Td>
                <Td data-cy="product-price">{product.price}</Td>
                <Td>
                  <Flex justify="center" alignItems="center" height="100%">
                    <Link
                      href={`admin/product/${product.id}`}
                      _hover={{ textDecoration: "none" }}
                    >
                      <Button
                        data-cy="admin-edit-product"
                        bg="rgba(78, 199, 145, 1)"
                        color="white"
                        size="sm"
                        mr="3px"
                        _hover={{
                          transform: "translateY(2px)",
                          boxShadow: "lg",
                        }}
                      >
                        Edit
                      </Button>
                    </Link>
                    <Button
                      data-cy="admin-remove-product"
                      colorScheme="red"
                      size="sm"
                      _hover={{
                        transform: "translateY(2px)",
                        boxShadow: "lg",
                      }}
                      onClick={() => handleDeleteClick(product)}
                    >
                      Delete
                    </Button>
                  </Flex>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
}
