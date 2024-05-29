'use server';

import { auth } from '@/auth';
import { db } from '@/prisma/db';
import { Category } from '@prisma/client';
import console from 'console';
import { revalidatePath } from 'next/cache';
import { OrderWithInformation, ProductWithCategoriesIds } from '../types';

export const getAllProducts = async () => {
  const products = await db.product.findMany({ include: { categories: true } });
  return products;
};

export const getAllCategorys = async () => {
  const categorys = await db.category.findMany({});
  return categorys;
};

export async function getProductsByCategorySlug(slug: string) {
  const category = await db.category.findUnique({ where: { slug: slug } });
  const products = await db.product.findMany({
    where: { categories: { some: { id: category?.id } } },
    include: { categories: true },
  });
  return products;
}

export const createProduct = async (values: ProductWithCategoriesIds) => {
  //HITTA CATEGORY SOM ÄR VALD, LÄGG MED HELA CATEGORY OBJEKT I OBJEKT
  const categories = await db.category.findMany({});
  const product = await db.product.create({
    data: {
      title: values.title,
      imageUrl: values.imageUrl,
      desc: values.desc,
      stock: Number(values.stock),
      price: Number(values.price),
      isArchived: false,
      categories: {
        connect: values.categories.map((id) => ({
          id,
        })),
      },
    },
  });
  revalidatePath('/admin/products');
};

export const updateProduct = async (values: ProductWithCategoriesIds) => {
  const session = await auth();
  if (!session?.user.isAdmin) return null;

  const categories = await db.category.findMany({});
  console.log(values);
  const archiveProduct = await db.product.update({
    where: { id: values.id },
    data: { isArchived: true },
  });

  const newProduct = await db.product.create({
    data: {
      title: values.title,
      imageUrl: values.imageUrl,
      desc: values.desc,
      stock: Number(values.stock),
      price: Number(values.price),
      isArchived: false,
      categories: {
        connect: values.categories.map((id) => ({ id })),
      },
    },
  });

  revalidatePath('/admin');
};

export async function deleteProduct(productId: any) {
  try {
    await db.product.delete({
      where: {
        id: productId,
      },
    });
    console.log('Product deleted successfully');
  } catch (error) {
    console.error('Failed to delete product:', error);
    throw error;
  }
}

export const updateStock = async (productId: number, quantity: number) => {
  try {
    const product = await db.product.findUnique({ where: { id: productId } });

    if (!product) {
      throw new Error('Product not found');
    }

    if (product.stock < quantity) {
      throw new Error('Insufficient stock');
    }

    await db.product.update({
      where: { id: productId },
      data: { stock: product.stock - quantity },
    });

    return true;
  } catch (error) {
    console.error('Error updating stock:', error);
    throw error;
  }
};

export const createCategory = async (values: Category) => {
  const session = await auth();
  if (!session?.user.isAdmin) return null;

  console.log('test');

  const categorys = await db.category.findMany({});
  const doesCategoryExist = categorys.find((c) => c.name === values.name);

  if (doesCategoryExist) return { status };

  const category = await db.category.create({
    data: { name: values.name, slug: values.slug },
  });
};

export const editSendStatus = async (values: OrderWithInformation) => {
  const session = await auth();
  if (!session?.user.isAdmin) return null;
  const findOrder = await db.order.findFirst({ where: { id: values.id } });
  const order = await db.order.update({
    where: { id: values.id },
    data: { sentStatus: !findOrder?.sentStatus },
  });
  revalidatePath('/admin/orders');
};

export const saveAddress = async (adressData: any) => {
  const session = await auth();
  if (!session?.user) return null;

  try {
    const address = await db.adress.create({
      data: {
        street: adressData.street,
        zip: adressData.zip,
        city: adressData.city,
        email: adressData.email,
      },
    });
    return address.id;
  } catch (error) {
    console.error('Error saving address:', error);
    throw error;
  }
};
