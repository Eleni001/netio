"use server";

import { db } from "@/prisma/db";
import console from "console";
import { revalidatePath } from "next/cache";
import { ProductWithCategories } from "../types";
import { UserCreate, UserCreateSchema } from "../validations/userValidation";

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
    revalidatePath("/");
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
  const product = await db.product.create({
    data: {
      title: values.title,
      imageUrl: values.imageUrl,
      desc: values.desc,
      stock: parseInt(values.stock),
      price: parseInt(values.price),
      isArchived: false,
      categories: {
        connect: values.categories.map((category) => ({ name: category })),
      },
    },
  });
  revalidatePath("/admin");
};

export const updateProduct = async (values: ProductWithCategories) => {
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
        connect: values.categories.map((category) => ({ name: category })),
      },
    },
  });

  revalidatePath("/admin");
};
