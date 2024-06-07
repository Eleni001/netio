import { getAllCategorys, getAllProducts } from '@/app/actions/actions';
import ProductForm from '@/app/components/ProductForm';
import { auth } from '@/auth';
import { Flex, Heading } from '@chakra-ui/react';
import { redirect } from 'next/navigation';

type PageProps = { params: { id: string } };

export default async function AdminEditProductPage({ params }: PageProps) {
  const session = await auth();

  if (!session?.user.isAdmin) redirect('/');

  const products = await getAllProducts();
  const categories = await getAllCategorys();
  const param = Number(params.id);
  const product = products.find((p) => p.id === param);

  if (!product) {
    return (
      <main>
        <span> Product Does Not Exist - 404</span>
      </main>
    );
  }

  return (
    <>
      <Heading textAlign="center" mt="2rem">
        Edit Product Form
      </Heading>
      <Flex
        flexDir={{ base: 'column', md: 'row' }}
        rounded="lg"
        justify="center"
        alignItems="center"
        width="80%"
        m="2rem auto"
        p="1rem"
        gap={{ base: '1rem', md: '2rem' }}
      >
        <ProductForm product={product} categories={categories} />
        {/* <ProductForm setImagePreview={setImagePreview} product={product} /> */}
      </Flex>
    </>
  );
}
