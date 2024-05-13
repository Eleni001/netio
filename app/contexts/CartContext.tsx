import { CartItem, Product } from "@/data";
import { useToast } from "@chakra-ui/react";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import CustomToast from "../components/CustomToast";

// Skapa kontexten
interface CartContextValue {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  removeSameIdItems: (product: Product) => void;
  cartCount: number;
  clearCartSilently: () => void;
}

const CartContext = createContext({} as CartContextValue);

// Skapa Provider-komponenten
function CartProvider(props: PropsWithChildren) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const toast = useToast();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart, isLoaded]);

  // Logiken för att ändra kundvagnen ligger nära tillståndet

  const addToCart = (product: Product) => {
    console.log("initial cart", cart);
    // 1. Om produkten redan finns i kundvagnen, öka antalet
    const isProductPresent = cart.find(
      (cartItem) => cartItem.id === product.id
    );
    console.log("isProductPresent", isProductPresent);
    if (isProductPresent) {
      const newCart = cart.map((cartItem) => {
        if (cartItem.id === product.id) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        } else {
          return cartItem;
        }
      });
      setCart(newCart);

      toast({
        render: () => <CustomToast />,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      // 2. Annars, lägg till produkten i kundvagnen med antal 1
      setCart([...cart, { ...product, quantity: 1 }]);
      toast({
        render: () => <CustomToast />,

        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const removeFromCart = (product: Product) => {
    const productToRemove = cart.find((cartItem) => cartItem.id === product.id);
    if (productToRemove) {
      if (productToRemove.quantity > 1) {
        const newCart = cart.map((cartItem) => {
          if (cartItem.id === product.id) {
            return { ...cartItem, quantity: cartItem.quantity - 1 };
          } else {
            return cartItem;
          }
        });
        setCart(newCart);
        toast({
          title: "Item removed from cart",
          description: "An item has been removed form your cart.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        const newCart = cart.filter((cartItem) => cartItem.id !== product.id);
        setCart(newCart);
        toast({
          title: "Products removed from cart",
          description: "All items has been removed form your cart.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const removeSameIdItems = (product: Product) => {
    const newCart = cart.filter((cartItem) => cartItem.id !== product.id);
    setCart(newCart);
    toast({
      title: "Product removed from cart",
      description: "Your product has been removed form your cart.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const clearCartSilently = useCallback(() => {
    setCart([]);
  }, []);

  // härleda från tillstånd
  const cartCount = cart.reduce(
    (totalItems, item) => totalItems + item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        removeSameIdItems,
        cartCount,
        clearCartSilently,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}

// Skapa en hook som ger oss tillgång till contexten
export const useCart = () => useContext(CartContext);
export default CartProvider;
