import { auth } from '@/auth';
import { Flex } from '@chakra-ui/react';
import BottomBanner from './components/BottomBanner';
import HomePageTop from './components/HomePageTop';

export default async function Home() {
  const session = await auth();

  return (
    <Flex flexDir="column">
      <HomePageTop username={session?.user?.name || ''} />
      <BottomBanner />
    </Flex>
  );
}
