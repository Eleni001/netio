import { CartItem } from '@/data';
import {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

interface CustomerData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  phone: string;
  postalCode: string;
}

interface CustomerContextValue {
  customerData: CustomerData;
  orderItems: CartItem[];
  setCustomerData: Dispatch<SetStateAction<CustomerData>>;
  setOrderItems: Dispatch<SetStateAction<CartItem[]>>;
}

const CustomerContext = createContext({} as CustomerContextValue);

function CustomerContextProvider(props: PropsWithChildren) {
  const [orderItems, setOrderItems] = useState<CartItem[]>([]);
  const [customerData, setCustomerData] = useState<CustomerData>({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    phone: '',
    postalCode: '',
  });

  return (
    // bilarna - value är det som skickas över kontexten
    <CustomerContext.Provider
      value={{ customerData, setCustomerData, setOrderItems, orderItems }}
    >
      {props.children}
    </CustomerContext.Provider>
  );
}

// Avfarten - för att kunna ta emot kontext data i komponenterna
export const useCustomer = () => useContext(CustomerContext);
export default CustomerContextProvider;
