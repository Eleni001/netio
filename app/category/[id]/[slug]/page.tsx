import AddToCartIcon from '@/app/components/AddToCartIcon';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Flex,
  GridItem,
  Heading,
  Image,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { LuHeart } from 'react-icons/lu';
import { getProductsByCategorySlug } from '../../../actions/actions';

interface Props {
  params: { slug: string };
}
export default async function CategoryPage(props: Props) {
  const { category, products } = await getProductsByCategorySlug(
    props.params.slug,
  );

  return (
    <Box>
      <Heading
        backgroundImage={category?.imageUrl ?? undefined}
        color="White"
        width="80%"
        ml="10%"
        mt={8}
        p={6}
      >
        {category?.name}
      </Heading>
      {products.length > 0 ? (
        <SimpleGrid
          id="products-grid"
          width="80%"
          m="2rem auto"
          columns={{ base: 1, md: 3, lg: 4 }}
          gap={5}
        >
          {products.map((product) => (
            <GridItem
              data-cy="product-id"
              key={product.id}
              boxShadow="1px 1px 2px rgba(0,0,0,0.1)"
              transition={'transform 0.2s ease-in-out'}
              _hover={{ cursor: 'pointer', transform: 'scale(1.05)' }}
            >
              <Flex flexDirection="column" height="100%">
                <NextLink href={`/product/${product.id}`} key={product.id}>
                  <Box _hover={{ textDecoration: 'none' }}>
                    <Image
                      src={product.imageUrl}
                      alt={product.title}
                      objectFit="cover"
                      width="100%"
                      height="200px"
                    />
                    <Flex
                      justifyContent="flex-start"
                      alignContent="center"
                      flexDirection="column"
                      mt="1.5rem"
                    >
                      <Text
                        data-cy="product-title"
                        fontWeight="semibold"
                        textTransform="capitalize"
                        _hover={{ color: 'brown' }}
                      >
                        {product.title}
                      </Text>
                      <Text data-cy="product-price" _hover={{ color: 'brown' }}>
                        {product.price} kr
                      </Text>
                      {product.stock === 0 ? (
                        <Text>Out of stock </Text>
                      ) : (
                        <Text>Qty: {product.stock} </Text>
                      )}
                    </Flex>
                  </Box>
                </NextLink>
                <Flex gap="6" m="0.5rem" justifyContent="end" mb="1rem">
                  <NextLink href="/">
                    <Box
                      color="black"
                      transition={'transform 0.2s ease-in-out'}
                      _hover={{
                        cursor: 'pointer',
                        color: 'brown',
                        transform: 'scale(1.2)',
                      }}
                    >
                      <LuHeart fontSize="1.7rem" />
                    </Box>
                  </NextLink>
                  <AddToCartIcon product={product} />
                </Flex>
              </Flex>
            </GridItem>
          ))}
        </SimpleGrid>
      ) : (
        <Alert
          width="80%"
          ml="10%"
          mt={8}
          p={6}
          status="info"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="200px"
          bg="white"
          border="1px"
          borderColor="#E4A757"
        >
          <AlertIcon boxSize="40px" mr={0} color="#E4A757" />
          <AlertTitle mt={4} mb={1} fontSize="lg">
            No products found in this category
          </AlertTitle>
        </Alert>
      )}
    </Box>
  );
}
