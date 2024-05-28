import {
  Adress,
  Category,
  Order,
  OrderRow,
  Product,
  User,
} from '@prisma/client';
import { ReactNode } from 'react';

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

export interface OrderWithInformation extends Order {
  user: User;
  shippingadress: Adress;
  orderrows: OrderRow;
}
