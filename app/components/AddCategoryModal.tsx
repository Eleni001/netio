'use client';
import { NewCategorySchema } from '@/data';
import { AddIcon } from '@chakra-ui/icons';
import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { Category } from '@prisma/client';
import { useFormik } from 'formik';
import { createCategory } from '../actions/actions';
import CustomToast from './CustomToast';

export default function AddCategoryButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      name: '',
      slug: '',
      id: 0,
      imageUrl: '',
    },
    validationSchema: NewCategorySchema,
    onSubmit: async (values: Category, { resetForm }) => {
      try {
        await createCategory(values);
        toast({
          render: () => (
            <CustomToast
              toastSuccess={true}
              toastTitle="Successfully added category"
              toastContent="The category has been added successfully."
            />
          ),
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        toast({
          render: () => (
            <CustomToast
              toastSuccess={false}
              toastTitle="Failed"
              toastContent="Failed adding category, contact admin"
            />
          ),
          duration: 3000,
          isClosable: true,
        });
      }
      resetForm();
      onClose();
    },
  });

  return (
    <>
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
        onClick={onOpen}
      >
        <Icon as={AddIcon} marginRight="2" />
        Add Category
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={formik.handleSubmit}>
          <ModalContent>
            <ModalHeader>Add Category</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl
                isInvalid={formik.touched.name && !!formik.errors.name}
              >
                <FormLabel htmlFor="name">Category Name</FormLabel>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name ? (
                  <FormHelperText color="red.500">
                    {formik.errors.name}
                  </FormHelperText>
                ) : (
                  <FormHelperText>
                    Examples: Furniture, lighting, kitchen...
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl
                isInvalid={formik.touched.slug && !!formik.errors.slug}
              >
                <FormLabel htmlFor="slug">Category Slug</FormLabel>
                <Input
                  type="text"
                  id="slug"
                  name="slug"
                  value={formik.values.slug}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.slug && formik.errors.slug ? (
                  <FormHelperText color="red.500">
                    {formik.errors.slug}
                  </FormHelperText>
                ) : (
                  <FormHelperText></FormHelperText>
                )}
              </FormControl>
              <FormControl
                isInvalid={formik.touched.imageUrl && !!formik.errors.imageUrl}
              >
                <FormLabel htmlFor="imageUrl">Image</FormLabel>
                <Input
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  value={formik.values.imageUrl || ''}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.imageUrl && formik.errors.imageUrl ? (
                  <FormHelperText color="red.500">
                    {formik.errors.imageUrl}
                  </FormHelperText>
                ) : (
                  <FormHelperText></FormHelperText>
                )}
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Box
                as="button"
                bg="red.500"
                color="white"
                borderRadius="md"
                padding="2"
                _hover={{
                  bg: 'red.400',
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
                onClick={onClose}
              >
                Cancel
              </Box>
              <Box
                as="button"
                bg="green.500"
                color="white"
                borderRadius="md"
                padding="2"
                ml={3}
                _hover={{
                  bg: 'green.400',
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
                type="submit"
              >
                ADD
              </Box>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}
