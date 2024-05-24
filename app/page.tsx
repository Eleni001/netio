import { auth } from "@/auth";
import { Flex } from "@chakra-ui/react";
import { getAllProducts } from "./actions/actions";
import ProductList from "./components/ProductList";
import HomePageTop from "./components/HomePageTop";
import BottomBanner from "./components/BottomBanner";

export default async function Home() {
  const products = await getAllProducts();
  const session = await auth();

  return (
    <Flex flexDir="column">
       <HomePageTop username={session?.user?.name || ""}/>
      <ProductList products={products} />
      <BottomBanner />
    </Flex>
  );
}
