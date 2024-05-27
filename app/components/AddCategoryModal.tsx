'use client';
import { NewCategorySchema } from '@/data';
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
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
    },
    validationSchema: NewCategorySchema,
    onSubmit: (values: Category, { resetForm }) => {
      console.log(values);

      try {
        createCategory(values);
        toast({
          render: () => (
            <CustomToast
              toastSuccess={true}
              toastTitle="succesfully added category"
              toastContent="toastcontent"
            />
          ),
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.log('SOME ERROR');
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
      resetForm(); // Reset the form values
      onClose(); // Close the modal on form submission
    },
  });

  return (
    <>
      <Button
        bg="grey"
        color="white"
        size="md"
        _hover={{
          transform: 'translateY(2px)',
          boxShadow: 'lg',
        }}
        onClick={onOpen}
      >
        Add Category
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <form onSubmit={formik.handleSubmit}>
          <ModalContent>
            <ModalHeader>Add category</ModalHeader>
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
                    Examples: Furniture, lighting, kitchen....
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
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="green" ml={3} type="submit">
                ADD
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}
