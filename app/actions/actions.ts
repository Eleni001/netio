"use server";

import { db } from "@/prisma/db";
import console from "console";
import { revalidatePath } from "next/cache";
import { ProductWithCategoriesIds } from "../types";
import { UserCreate, UserCreateSchema } from "../validations/userValidation";
import { auth } from "@/auth";

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

export const createProduct = async (values: ProductWithCategoriesIds) => {
  //HITTA CATEGORY SOM ÄR VALD, LÄGG MED HELA CATEGORY OBJEKT I OBJEKT
  const categories = await db.category.findMany({});
  /* DAVID */
  // const matchingCategories = categories.filter((category) =>
  //   values.categories.includes(category.id)
  // );
  // const newValues = { ...values, categories: matchingCategories };
  console.log(values);
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
  revalidatePath("/admin");
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

  revalidatePath("/admin");
};
