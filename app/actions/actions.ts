'use server';

import { auth } from '@/auth';
import { db } from '@/prisma/db';
import { Category } from '@prisma/client';
import console from 'console';
import { revalidatePath } from 'next/cache';
import { ProductWithCategoriesIds } from '../types';
import { UserCreate, UserCreateSchema } from '../validations/userValidation';

export async function registerUser(incomingData: UserCreate) {
  try {
    const userData = await UserCreateSchema.validate(incomingData);
    const user = await db.user.create({
      data: {
        username: userData.username,
        email: userData.email,
        password: userData.password,
      },
    });
    revalidatePath('/');
    return user;
  } catch (error) {
    console.log(error);
  }
}

export const getAllProducts = async () => {
  const products = await db.product.findMany({ include: { categories: true } });
  return products;
};

export const getAllCategorys = async () => {
  const categorys = await db.category.findMany({});
  return categorys;
};

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
  revalidatePath('/admin');
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

  if (doesCategoryExist) throw new Error('category already exists');
  // const category = await db.category.create({
  //   data: { name: values.name, slug: values.slug },
  // });
};
