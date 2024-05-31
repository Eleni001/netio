import { auth } from '@/auth';
import { Flex } from '@chakra-ui/react';
import { getAllProducts } from './actions/actions';

import BottomBanner from './components/BottomBanner';
import HomePageTop from './components/HomePageTop';

export default async function Home() {
  const products = await getAllProducts();
  const session = await auth();

  return (
    <Flex flexDir="column">
      <HomePageTop username={session?.user?.name || ''} />
      <BottomBanner />
    </Flex>
  );
}
