'use client';

import { Circle, Flex, Icon } from '@chakra-ui/react';
import { Session } from 'next-auth';
import { signIn } from 'next-auth/react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { IoPersonOutline } from 'react-icons/io5';
import { RiAdminLine } from 'react-icons/ri';
import { VscSignIn, VscSignOut } from 'react-icons/vsc';
import { useCart } from '../contexts/CartContext';

interface Props {
  session: Session | null;
}
export default function NavIcons({ session }: Props) {
  const { cartCount } = useCart();
  const pathname = usePathname();

  return (
    <Flex
      position="relative"
      gap={{ base: '1.2rem', md: '2rem' }}
      fontSize={{ base: '1.4rem', md: '1.7rem' }}
      justify="center"
      align="center"
    >
      {session?.user.isAdmin && (
        <NextLink href="/admin" color="black">
          <Icon
            fontSize="1.7rem"
            transition={'transform 0.2s ease-in-out'}
            _hover={{
              cursor: 'pointer',
              color: 'brown',
              transform: 'scale(1.2)',
            }}
          >
            <RiAdminLine size="1.6rem" />
          </Icon>
        </NextLink>
      )}
      {session?.user && (
        <NextLink href="/user" color="black">
          <Icon
            fontSize="1.7rem"
            transition={'transform 0.2s ease-in-out'}
            _hover={{
              cursor: 'pointer',
              color: 'brown',
              transform: 'scale(1.2)',
            }}
          >
            <IoPersonOutline size="1.6rem" />
          </Icon>
        </NextLink>
      )}
      {session ? (
        <NextLink href="/signout" passHref color="black">
          <Icon
            fontSize="1.7rem"
            transition={'transform 0.2s ease-in-out'}
            _hover={{
              cursor: 'pointer',
              color: 'brown',
              transform: 'scale(1.2)',
            }}
          >
            <VscSignOut />
          </Icon>
        </NextLink>
      ) : (
        <Icon
          fontSize="1.7rem"
          transition={'transform 0.2s ease-in-out'}
          _hover={{
            cursor: 'pointer',
            color: 'brown',
            transform: 'scale(1.2)',
          }}
          onClick={() => signIn(undefined, { callbackUrl: pathname })}
        >
          <VscSignIn />
        </Icon>
      )}

      <NextLink href="/checkout" passHref color="black">
        <Icon
          fontSize="1.7rem"
          transition={'transform 0.2s ease-in-out'}
          _hover={{
            cursor: 'pointer',
            color: 'brown',
            transform: 'scale(1.2)',
          }}
        >
          <HiOutlineShoppingBag size="1.6rem" />
        </Icon>
      </NextLink>
      {cartCount > 0 && (
        <Circle
          size="25px"
          bg="tomato"
          color="white"
          fontSize="1rem"
          position="absolute"
          top="-0.5rem"
          right="-0.5rem"
        >
          {cartCount}
        </Circle>
      )}
    </Flex>
  );
}
