// import { useToast } from "@chakra-ui/react";
// import { Product } from "@prisma/client";

// import {
//   PropsWithChildren,
//   createContext,
//   useContext,
//   useEffect,
//   useState,
// } from "react";

// interface AdminContextValue {
//   products: Product[];
//   addProduct: (product: Product) => void;
//   removeProduct: (product: Product) => void;
//   updateProduct: (productId: string, updatedProduct: Product) => void;
// }

// const AdminContext = createContext({} as AdminContextValue);

// // Skapa Provider-komponenten
// function AdminProvider(props: PropsWithChildren) {
//   const [products, setProducts] = useState<Product[]>([]);
//   const toast = useToast();

//   useEffect(() => {
//     const storedProducts = localStorage.getItem("products");
//     if (storedProducts) {
//       setProducts(JSON.parse(storedProducts));
//     } else {
//       setProducts(initialProducts);
//       localStorage.setItem("products", JSON.stringify(initialProducts));
//     }
//   }, []);

//   const addProduct = (newProduct: Product) => {
//     setProducts((currentProducts) => {
//       const updatedProducts = [...currentProducts, newProduct];
//       localStorage.setItem("products", JSON.stringify(updatedProducts));
//       return updatedProducts;
//     });
//     toast({
//       title: "Product added",
//       description: `${newProduct.title} has been added to the store`,
//       status: "success",
//       duration: 3000,
//       isClosable: true,
//     });
//   };

//   const removeProduct = (item: Product) => {
//     const updatedProducts = products.filter(
//       (product) => product.id !== item.id
//     );
//     setProducts(updatedProducts);

//     toast({
//       title: "Product removed",
//       description: "The product has been removed successfully.",
//       status: "success",
//       duration: 3000,
//       isClosable: true,
//     });
//   };

//   const updateProduct = (productId: string, updatedProduct: Product) => {
//     setProducts((prevProducts) =>
//       prevProducts.map((product) =>
//         product.id === productId ? { ...product, ...updatedProduct } : product
//       )
//     );
//     const updatedProducts = products.map((product) =>
//       product.id === productId ? { ...product, ...updatedProduct } : product
//     );
//     localStorage.setItem("products", JSON.stringify(updatedProducts));
//     toast({
//       title: "Product updated",
//       description: `${updatedProduct.title} has been updated successfully.`,
//       status: "success",
//       duration: 3000,
//       isClosable: true,
//     });
//   };

//   return (
//     <AdminContext.Provider
//       value={{
//         products,
//         addProduct,
//         removeProduct,
//         updateProduct,
//       }}
//     >
//       {props.children}
//     </AdminContext.Provider>
//   );
// }

// // Skapa en hook som ger oss tillgång till contexten
// export const useAdmin = () => useContext(AdminContext);
// export default AdminProvider;
