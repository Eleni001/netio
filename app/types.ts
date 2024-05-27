import { Category, Product } from "@prisma/client";
import { ReactNode } from "react";

export type PageProps = Readonly<{ params: { slug: string } }>;
export type LayoutProps = Readonly<{ children: ReactNode }>;

// export interface Product {
//   createdAt: Date;
//   desc: String;
// }

export interface ProductWithCategories extends Product {
  categories: Category[];
}
export interface ProductWithCategoriesIds extends Product {
  categories: number[];
}
