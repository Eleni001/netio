import { Flex, Text } from '@chakra-ui/react';
import { Category } from '@prisma/client';
import NextLink from 'next/link';

interface Props {
  categories: Category[];
}
export default function NavLinks(props: Props) {
  return (
    <Flex
      justify="center"
      p="0.3rem"
      //   bg='#f3f1ed'
      gap="2rem"
      borderTop="1px solid #e1dcd6"
      fontSize="1.2rem"
      flexDir={{ base: 'column', md: 'row' }}
      textAlign={{ base: 'left', md: 'center' }}
      padding={{ base: '0.5rem', md: '0.5rem' }}
    >
      {props.categories.map((c) => (
        <NextLink key={c.id} href={`/category/${c.id}/${c.slug}`}>
          <Text _hover={{ color: 'brown' }} textDecor="none">
            {c.name}
          </Text>
        </NextLink>
      ))}
    </Flex>
  );
}
