import { Box, Heading, Link } from '@chakra-ui/react';
import { getAllCategorys } from '../actions/actions';

export default async function CategoriesLayout(props: any) {
  const categories = await getAllCategorys();

  return (
    <Box>
      <Heading bg="Green">
        {categories.map((c) => (
          <Link key={c.id} href={`/category/${c.id}/${c.name}`}>
            {c.name}
          </Link>
        ))}
      </Heading>
      
      {props.children}
    </Box>
  );
}
