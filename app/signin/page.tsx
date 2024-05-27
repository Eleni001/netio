import { signIn } from '@/auth';
import {
  Box,
  Button,
  Circle,
  Heading,
  ListItem,
  Stack,
  UnorderedList,
} from '@chakra-ui/react';
import { AiFillCrown } from 'react-icons/ai';
import { DiProlog, DiYii } from 'react-icons/di';

export default async function Signin() {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('github', { redirectTo: '/' });
      }}
    >
      <Box
        display="flex"
        flexDir="column"
        alignItems="center"
        justifyContent="center"
        bg="#FEF0D9"
        width="100%"
        h="30vh"
        position="relative"
        mt="15rem"
        gap="1rem"
      >
        <UnorderedList
          position="absolute"
          top="-50%"
          left="50%"
          transform="translate(-50%, 125%)"
          display="flex"
          flexDir="row"
          gap="0.5rem"
          listStyleType="none"
          m="0"
        >
          <ListItem>
            <Circle size="70px" bg="#E4A757" color="white" fontSize="1rem">
              <DiYii fontSize="2rem" color="black" />
            </Circle>
          </ListItem>
          <ListItem>
            {' '}
            <Circle size="70px" bg="#E4A757" color="white" fontSize="1rem">
              <AiFillCrown fontSize="2.5rem" color="black" />
            </Circle>
          </ListItem>
          <ListItem>
            <Circle size="70px" bg="#E4A757" color="white" fontSize="1rem">
              <DiProlog fontSize="2.5rem" color="black" />
            </Circle>
          </ListItem>
        </UnorderedList>
        <Box bg="beige" mx={10}>
          <Stack
            spacing={4}
            w={'full'}
            maxW={'md'}
            bg="white" /* {useColorModeValue('white', 'gray.700')} */
            rounded={'xl'}
            boxShadow={'lg'}
            p={6}
            my={12}
          >
            <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
              Sign in to your account
            </Heading>
            <Stack spacing={6}>
              <Button
                type="submit"
                bg="rgba(78, 199, 145, 1)"
                color={'white'}
                _hover={{
                  bg: 'rgba(60, 150, 110, 1)',
                }}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </form>
  );
}
