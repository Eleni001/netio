"use client";

import { FormValues, ValidationSchema } from "@/data";
import {
  Button,
  ButtonGroup,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  GridItem,
  Input,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import { useCart } from "../contexts/CartContext";
import { useCustomer } from "../contexts/CustomerContext";

export default function CheckoutForm() {
  const router = useRouter();
  const { setCustomerData, setOrderItems } = useCustomer();
  const { clearCartSilently, cart } = useCart();
  const handleSubmit = (values: FormValues) => {
    console.log(values);
    setCustomerData(values);
    setOrderItems(cart);
    clearCartSilently();
    router.push("/confirmation");
  };

  return (
    <Container
      borderWidth="1px"
      rounded="lg"
      shadow="1px 1px 2px rgba(0,0,0,0.1)"
      width={{ base: "90%", md: "42%" }}
      p="5%"
      m="2rem auto"
    >
      <Formik
        initialValues={{
          email: "",
          firstName: "",
          lastName: "",
          address: "",
          city: "",
          phone: "",
          postalCode: "",
        }}
        validationSchema={ValidationSchema}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <Form data-cy="customer-form">
            <Field name="email">
              {({ field, form }: any) => (
                <FormControl
                  mt="2%"
                  isInvalid={form.errors.email && form.touched.email}
                >
                  <FormLabel>Email address</FormLabel>
                  <Input
                    {...field}
                    data-cy="customer-email"
                    autoComplete="email"
                    focusBorderColor="brand.400"
                  />
                  <FormErrorMessage data-cy="customer-email-error">
                    {form.errors.email}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Flex mt="2%">
              <Field name="firstName">
                {({ field, form }: any) => (
                  <FormControl
                    mr="5%"
                    isInvalid={form.errors.firstName && form.touched.firstName}
                  >
                    <FormLabel>First Name</FormLabel>
                    <Input
                      {...field}
                      data-cy="customer-name"
                      autoComplete="name"
                      focusBorderColor="brand.400"
                    />
                    <FormErrorMessage data-cy="customer-name-error">
                      {form.errors.firstName}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="lastName">
                {({ field, form }: any) => (
                  <FormControl
                  // isInvalid={form.errors.lastName && form.touched.lastName}
                  >
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      {...field}
                      autoComplete="name"
                      focusBorderColor="brand.400"
                    />
                    <FormErrorMessage>{form.errors.lastName}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </Flex>
            <Field name="city">
              {({ field, form }: any) => (
                <FormControl
                  as={GridItem}
                  colSpan={[6, 6, null, 2]}
                  isInvalid={form.errors.city && form.touched.city}
                >
                  <FormLabel
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                      color: "gray.50",
                    }}
                    mt="2%"
                  >
                    City
                  </FormLabel>
                  <Input
                    {...field}
                    name="city"
                    autoComplete="address-level2"
                    focusBorderColor="brand.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    h="2.5rem"
                    rounded="md"
                    data-cy="customer-city"
                  />
                  <FormErrorMessage data-cy="customer-city-error">
                    {form.errors.city}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="address">
              {({ field, form }: any) => (
                <FormControl
                  as={GridItem}
                  colSpan={6}
                  isInvalid={form.errors.address && form.touched.address}
                >
                  <FormLabel
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                      color: "gray.50",
                    }}
                    mt="2%"
                  >
                    Street address
                  </FormLabel>
                  <Input
                    {...field}
                    name="address"
                    autoComplete="street-address"
                    focusBorderColor="brand.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    h="2.5rem"
                    rounded="md"
                    data-cy="customer-address"
                  />
                  <FormErrorMessage data-cy="customer-address-error">
                    {form.errors.address}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="phone">
              {({ field, form }: any) => (
                <FormControl
                  as={GridItem}
                  colSpan={[6, 3, null, 2]}
                  isInvalid={form.errors.phone && form.touched.phone}
                >
                  <FormLabel
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                      color: "gray.50",
                    }}
                    mt="2%"
                  >
                    Phone Number
                  </FormLabel>
                  <Input
                    {...field}
                    name="phone"
                    autoComplete="tel"
                    focusBorderColor="brand.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    h="2.5rem"
                    rounded="md"
                    data-cy="customer-phone"
                  />
                  <FormErrorMessage data-cy="customer-phone-error">
                    {form.errors.phone}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="postalCode">
              {({ field, form }: any) => (
                <FormControl
                  as={GridItem}
                  colSpan={[6, 3, null, 2]}
                  isInvalid={form.errors.postalCode && form.touched.postalCode}
                >
                  <FormLabel
                    fontSize="sm"
                    fontWeight="md"
                    color="gray.700"
                    _dark={{
                      color: "gray.50",
                    }}
                    mt="2%"
                  >
                    ZIP / Postal
                  </FormLabel>
                  <Input
                    {...field}
                    name="postalCode"
                    autoComplete="postal-code"
                    focusBorderColor="brand.400"
                    shadow="sm"
                    size="sm"
                    w="full"
                    h="2.5rem"
                    rounded="md"
                    data-cy="customer-zipcode"
                  />
                  <FormErrorMessage data-cy="customer-zipcode-error">
                    {form.errors.postalCode}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <ButtonGroup mt="5%" w="100%">
              <Flex w="100%" justifyContent="space-between">
                <Button
                  type="submit"
                  w="7rem"
                  bg="#E4A757"
                  _hover={{ bg: "#efdbc2" }}
                  variant="solid"
                  isLoading={props.isSubmitting}
                >
                  Submit
                </Button>
              </Flex>
            </ButtonGroup>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
