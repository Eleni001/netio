"use client";
import { ProductSchema } from "@/data";
import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { Category, Product } from "@prisma/client";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import { createProduct, updateProduct } from "../actions/actions";
import { ProductWithCategories } from "../types";

interface Props {
  product?: Product;
  editProduct?: ProductWithCategories;
  categorys?: Category[] | undefined;
  setImagePreview?: (imageUrl: string | undefined) => void;
}

export default function ProductForm(props: Props) {
  const router = useRouter();
  const isEdit = Boolean(props.editProduct);
  console.log(isEdit);

  const handleSubmit = async (
    values: Product,
    formikHelpers: FormikHelpers<ProductWithCategories>
  ) => {
    if (isEdit) {
      console.log("SCOOOOBYYY", values);
      updateProduct(values);
    } else {
      await createProduct(values);
      router.push("/admin");
    }
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
        initialValues={{
          title: props.editProduct?.title || "",
          desc: props.editProduct?.desc || "",
          imageUrl: props.editProduct?.imageUrl || "",
          price: props.editProduct?.price || 0,
          id: props.editProduct?.id || 0,
          stock: props.editProduct?.stock || 0,
          isArchived: props.editProduct?.isArchived || false,
          createdAt: props.editProduct?.createdAt || new Date(),
          categories: props.editProduct?.categories || [],

          // KNOWN BUG, NEED TO SET CATEGORY HERE ON EDIT
        }}
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
          if (props.setImagePreview) {
            props.setImagePreview(props.editProduct?.imageUrl);
          }
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
                    {form.errors && (
                      <p>
                        ALLA VALIDERINGSERRORS! {JSON.stringify(form.errors)}
                      </p>
                    )}
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
                      data-cy="product-description"
                      autoComplete="desc"
                      focusBorderColor="brand.400"
                    />
                    <FormErrorMessage data-cy="product-description-error">
                      {form.errors.desc}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="category" as="select">
                {({ field, form }: any) => (
                  <FormControl
                    mt="2%"
                    isInvalid={form.errors.category && form.touched.category}
                  >
                    <FormLabel>Category</FormLabel>
                    <Select placeholder="Select option" {...field}>
                      {/* REALLY UGLY SOLUTION */}
                      {/* {props.editProduct ? (
                        <>
                          <option selected>
                            {props.editProduct.categories[0].categoryName}
                          </option>
                          {props.categorys
                            ?.filter(
                              (category) =>
                                category.categoryName !==
                                props.editProduct?.categories[0].categoryName
                            )
                            .map((category) => (
                              <option key={category.id}>
                                {category.categoryName}
                              </option>
                            ))}
                        </>
                      ) : (
                        props.categorys?.map((category) => (
                          <option key={category.id}>
                            {category.categoryName}
                          </option>
                        ))
                      )} */}

                      {/* THIS SOLUTION WORKS BUT HAS A BUG, USER NEEDS TO PUT IN CATEGORY */}
                      {props.categorys?.map((category) => (
                        <option key={category.id}>
                          {category.categoryName}
                        </option>
                      ))}
                    </Select>
                    <FormErrorMessage data-cy="product-description-error">
                      {form.errors.category}
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
                    isInvalid={form.errors.stock && form.touched.stock}
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
                isLoading={formikProps.isSubmitting}
              >
                {isEdit ? "UPDATE PRODUCT" : "ADD PRODUCT"}
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
}
