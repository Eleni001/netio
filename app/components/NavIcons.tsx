"use client";

import { Circle, Flex, Icon } from "@chakra-ui/react";
import { Session } from "@prisma/client";
import NextLink from "next/link";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { IoPersonOutline } from "react-icons/io5";
import { LuHeart } from "react-icons/lu";
import { RiAdminLine } from "react-icons/ri";
import { useCart } from "../contexts/CartContext";
import { SessionProp } from "./Header";

interface Props {
  session: Session;
}
export default function NavIcons({ session }: SessionProp) {
  const { cartCount } = useCart();

  return (
    <Flex
      position="relative"
      gap={{ base: "1.2rem", md: "2rem" }}
      fontSize={{ base: "1.4rem", md: "1.7rem" }}
      justify="center"
      align="center"
    >
      {session?.user.isAdmin && (
        <NextLink href="/admin" data-cy="admin-link" color="black">
          <Icon
            fontSize="1.7rem"
            transition={"transform 0.2s ease-in-out"}
            _hover={{
              cursor: "pointer",
              color: "brown",
              transform: "scale(1.2)",
            }}
          >
            <IoPersonOutline size="1.6rem" />
            <RiAdminLine size="1.6rem" />
          </Icon>
        </NextLink>
      )}

      <NextLink href="/user" data-cy="admin-link" color="black">
        {" "}
        <Icon
          fontSize="1.7rem"
          transition={"transform 0.2s ease-in-out"}
          _hover={{
            cursor: "pointer",
            color: "brown",
            transform: "scale(1.2)",
          }}
        >
          <IoPersonOutline size="1.6rem" />
        </Icon>
      </NextLink>
      <NextLink href="/register" passHref color="black" data-cy="cart-link">
        <Icon
          fontSize="1.7rem"
          transition={"transform 0.2s ease-in-out"}
          _hover={{
            cursor: "pointer",
            color: "brown",
            transform: "scale(1.2)",
          }}
        >
          <LuHeart size="1.5rem" /> *
        </Icon>
      </NextLink>

      <NextLink href="/checkout" passHref color="black" data-cy="cart-link">
        <Icon
          fontSize="1.7rem"
          transition={"transform 0.2s ease-in-out"}
          _hover={{
            cursor: "pointer",
            color: "brown",
            transform: "scale(1.2)",
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
          data-cy="cart-items-count-badge"
        >
          {cartCount}
        </Circle>
      )}
    </Flex>
  );
}
