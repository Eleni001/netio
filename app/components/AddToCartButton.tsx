"use client";

import { Button, Text } from "@chakra-ui/react";
import { Product } from "@prisma/client";

import { useCart } from "../contexts/CartContext";

interface Props {
	product: Product;
}

export default function AddToCartButton(props: Props) {
	const { addToCart } = useCart();
  if (props.product.stock === 0) {
    return (
			<>
				<Text>Out of stock</Text>
			</>
		);
	}
	return (
		<Button
			data-cy="product-buy-button"
			onClick={() => addToCart(props.product)}
			rounded={"none"}
			w={"full"}
			mt={8}
			size={"lg"}
			py={"7"}
			bg="rgba(78, 199, 145, 1)"
			color="white"
			textTransform={"uppercase"}
			_hover={{
				transform: "translateY(2px)",
				boxShadow: "lg",
			}}
			disabled={true}
		>
			Add to cart
		</Button>
	);
}
