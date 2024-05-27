'use server';

import { db } from '@/prisma/db';
import console from 'console';
import { revalidatePath } from 'next/cache';
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

export const createProduct = async (values: any) => {
  const categorys = await db.category.findMany({});
  const doesCategoryExist = categorys.find(
    (cat) => cat.name === values.category,
  );
  // console.log("WHAT IS THIS?", doesCategoryExist);
  const product = await db.product.create({
    data: {
      title: values.title,
      imageUrl: values.imageUrl,
      desc: values.desc,
      stock: parseInt(values.stock),
      price: parseInt(values.price),
      isArchived: false,
      categories: { connect: { id: doesCategoryExist?.id } },
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
