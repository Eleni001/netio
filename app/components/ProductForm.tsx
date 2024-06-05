'use client';
import { ProductSchema } from '@/data';
import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { Category } from '@prisma/client';
import { Field, Form, Formik } from 'formik';
import { revalidatePath } from 'next/cache';
import { useRouter } from 'next/navigation';
import React from 'react';
import { createProduct, updateProduct } from '../actions/actions';
import { ProductWithCategories, ProductWithCategoriesIds } from '../types';
import CategoryBox from './CategoryBox';
import CustomToast from './CustomToast';

interface Props {
  product?: ProductWithCategories;
  categories?: Category[];
  setImagePreview?: (imageUrl: string) => void;
}

export default function ProductForm(props: Props) {
  const router = useRouter();
  const isEdit = Boolean(props.product);
  const toast = useToast();

  const handleSubmit = async (values: ProductWithCategoriesIds) => {
    if (isEdit) {
      await updateProduct(values);
      toast({
        render: () => (
          <CustomToast
            toastSuccess={true}
            toastTitle="Successfully updated"
            toastContent="Product have been updated"
          />
        ),
        duration: 3000,
        isClosable: true,
      });
      router.push('/admin');
      revalidatePath('/category');
    } else {
      await createProduct(values);
      toast({
        render: () => (
          <CustomToast
            toastSuccess={true}
            toastTitle="Successfully created product"
            toastContent="Product have been added"
          />
        ),
        duration: 3000,
        isClosable: true,
      });
      router.push('/admin');
      revalidatePath('/category');
    }
  };

  return (
    <Container>
      <Formik
        initialValues={{
          title: props.product?.title || '',
          desc: props.product?.desc || '',
          imageUrl: props.product?.imageUrl || '',
          price: props.product?.price || 0,
          id: props.product?.id || 0,
          stock: props.product?.stock || 0,
          isArchived: props.product?.isArchived || false,
          createdAt: props.product?.createdAt || new Date(),
          categories: props.product?.categories.map((cat) => cat.id) || [],
        }}
        validationSchema={ProductSchema}
        onSubmit={handleSubmit}
      >
        {(formikProps) => {
          const handleImageChange = (
            event: React.ChangeEvent<HTMLInputElement>,
          ) => {
            const imageUrl = event.target.value;
            formikProps.setFieldValue('imageUrl', imageUrl);
            if (props.setImagePreview) {
              props.setImagePreview(imageUrl);
            }
          };
          return (
            <Form>
              <Field name="title">
                {({ field, form }: any) => (
                  <FormControl
                    mt="2%"
                    isInvalid={form.errors.title && form.touched.title}
                  >
                    <FormLabel>Title</FormLabel>
                    <Input
                      {...field}
                      autoComplete="title"
                      focusBorderColor="brand.400"
                    />
                    <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="desc">
                {({ field, form }: any) => (
                  <FormControl
                    mt="2%"
                    isInvalid={form.errors.desc && form.touched.desc}
                  >
                    <FormLabel>Description</FormLabel>
                    <Input
                      {...field}
                      autoComplete="desc"
                      focusBorderColor="brand.400"
                    />
                    <FormErrorMessage>{form.errors.desc}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="categories">
                {({ field, form }: any) => (
                  <FormControl
                    mt="2%"
                    isInvalid={
                      form.errors.categories && form.touched.categories
                    }
                  >
                    <FormLabel>Categories</FormLabel>
                    <Stack>
                      {props.categories?.map((category) => (
                        <CategoryBox
                          key={category.id}
                          category={category}
                          field={field}
                          form={form}
                        />
                      ))}
                    </Stack>
                    <FormErrorMessage>
                      {form.errors.categories}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="imageUrl">
                {({ field, form }: any) => (
                  <FormControl
                    mt="2%"
                    isInvalid={form.errors.imageUrl && form.touched.imageUrl}
                  >
                    <FormLabel>Image</FormLabel>
                    <Input
                      {...field}
                      focusBorderColor="brand.400"
                      onChange={handleImageChange}
                    />
                    <FormErrorMessage>{form.errors.imageUrl}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="price">
                {({ field, form }: any) => (
                  <FormControl
                    mt="2%"
                    isInvalid={form.errors.price && form.touched.price}
                  >
                    <FormLabel>Price</FormLabel>
                    <Input
                      {...field}
                      autoComplete="price"
                      focusBorderColor="brand.400"
                    />
                    <FormErrorMessage>{form.errors.price}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="stock">
                {({ field, form }: any) => (
                  <FormControl
                    mt="2%"
                    isInvalid={form.errors.stock && form.touched.stock}
                  >
                    <FormLabel>Stock</FormLabel>
                    <Input
                      {...field}
                      autoComplete="stock"
                      focusBorderColor="brand.400"
                    />
                    <FormErrorMessage>{form.errors.stock}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                mt="2rem"
                type="submit"
                bg="#E4A757"
                _hover={{ bg: '#efdbc2' }}
                variant="solid"
                isLoading={false}
              >
                {isEdit ? 'UPDATE PRODUCT' : 'ADD PRODUCT'}
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
}
