"use client";
import { ProductSchema } from "@/data";
import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Product } from "@prisma/client";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import { createProduct } from "../actions/actions";

import { revalidatePath } from "next/cache";
import createRandomId from "../utils/createRandomId";

interface Props {
  product?: Product;
  setImagePreview?: (imageUrl: string) => void;
}

export default function ProductForm(props: Props) {
  const router = useRouter();
  // const isEdit = Boolean(props.product);
  const newId = createRandomId();

  const handleSubmit = async (
    values: Product,
    formikHelpers: FormikHelpers<Product>
  ) => {
    // if (isEdit) {
    await createProduct(values);
    router.push("/admin");
    revalidatePath("/admin");
    // } else {
    // addProduct(values);
    // router.push("/admin");
    // formikHelpers.resetForm({
    //   values: {
    //     imageUrl: "",
    //     title: "",
    //     desc: "",
    //     price: "" as any,
    //     id: 0,
    //     stock: 0,
    //     isArchived: false,
    //     createdAt: new Date(),
    //   },
    // });
    // }
  };

  return (
    <Container>
      <Formik
        initialValues={
          props.product || {
            imageUrl: "",
            title: "",
            desc: "",
            price: "" as any,
            stock: "" as any,
            isArchived: false,
          }
        }
        validationSchema={ProductSchema}
        onSubmit={handleSubmit}
      >
        {(formikProps) => {
          const handleImageChange = (
            event: React.ChangeEvent<HTMLInputElement>
          ) => {
            const imageUrl = event.target.value;
            formikProps.setFieldValue("imageUrl", imageUrl);
            if (props.setImagePreview) {
              props.setImagePreview(imageUrl);
            }
          };
          return (
            <Form data-cy="product-form">
              <Field name="title">
                {({ field, form }: any) => (
                  <FormControl
                    mt="2%"
                    isInvalid={form.errors.title && form.touched.title}
                  >
                    <FormLabel>Title</FormLabel>
                    <Input
                      {...field}
                      data-cy="product-title"
                      autoComplete="title"
                      focusBorderColor="brand.400"
                    />
                    <FormErrorMessage data-cy="product-title-error">
                      {form.errors.title}
                    </FormErrorMessage>
                    {form.errors && <p>ERROR! {JSON.stringify(form.errors)}</p>}
                  </FormControl>
                )}
              </Field>

              <Field name="desc">
                {({ field, form }: any) => (
                  <FormControl
                    mt="2%"
                    isInvalid={
                      form.errors.description && form.touched.description
                    }
                  >
                    <FormLabel>Description</FormLabel>
                    <Input
                      {...field}
                      data-cy="product-description"
                      autoComplete="desc"
                      focusBorderColor="brand.400"
                    />
                    <FormErrorMessage data-cy="product-description-error">
                      {form.errors.description}
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
                      data-cy="product-image"
                      focusBorderColor="brand.400"
                      onChange={handleImageChange}
                    />
                    <FormErrorMessage data-cy="product-image-error">
                      {form.errors.imageUrl}
                    </FormErrorMessage>
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
                      data-cy="product-price"
                      autoComplete="price"
                      focusBorderColor="brand.400"
                    />
                    <FormErrorMessage data-cy="product-price-error">
                      {form.errors.price}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="stock">
                {({ field, form }: any) => (
                  <FormControl
                    mt="2%"
                    isInvalid={form.errors.price && form.touched.price}
                  >
                    <FormLabel>Stock</FormLabel>
                    <Input
                      {...field}
                      data-cy="product-price"
                      autoComplete="stock"
                      focusBorderColor="brand.400"
                    />
                    <FormErrorMessage data-cy="product-price-error">
                      {form.errors.stock}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                mt="2rem"
                type="submit"
                bg="#E4A757"
                _hover={{ bg: "#efdbc2" }}
                variant="solid"
                isLoading={false}
              >
                {/* {isEdit ? "UPDATE PRODUCT" : "ADD PRODUCT"} */}
                ADD PRODUCT
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
}
