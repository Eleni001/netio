"use client";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  CloseButton,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { registerUser } from "../actions/actions";
import { UserCreate, UserCreateSchema } from "../validations/userValidation";

export default function UserRegistrationForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserCreate>({ resolver: yupResolver(UserCreateSchema) });

  const onSubmit = async (values: UserCreate) => {
    try {
      await registerUser(values);
      setIsRegistered(true);
      reset();
    } catch (error) {
      console.log("Registeration failed: ", error);
    }
  };

  return (
    <form
      className="w-96 flex flex-col gap-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Register
            </Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              To update your home
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl isInvalid={!!errors.username}>
                <FormLabel>Username</FormLabel>
                <Input
                  {...register("username")}
                  type="text"
                  placeholder="Username"
                />
                <FormErrorMessage>
                  {errors.username && errors.username.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.email}>
                <FormLabel>Email address</FormLabel>
                <Input {...register("email")} type="text" placeholder="Email" />
                <FormErrorMessage>
                  {errors.email && errors.email.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.password}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    {...register("password")}
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>
              git
              <Stack spacing={10} pt={2}>
                <Button
                  type="submit"
                  loadingText="Submitting"
                  size="lg"
                  bg="rgba(78, 199, 145, 1)"
                  color={"white"}
                  _hover={{
                    bg: "green.700",
                  }}
                >
                  Register
                </Button>
                {isRegistered && (
                  <Alert status="success" mt={4}>
                    <AlertIcon />
                    <AlertTitle mr={2}>Registration successful!</AlertTitle>
                    <CloseButton onClick={() => setIsRegistered(false)} />
                  </Alert>
                )}
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user? <Link color={"blue.400"}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </form>
  );
}
