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

export const createProduct = async (values: ProductWithCategories) => {
  //HITTA CATEGORY SOM ÄR VALD, LÄGG MED HELA CATEGORY OBJEKT I OBJEKT
  const categories = await db.category.findMany({});
  const matchingCategories = categories.filter((category) =>
    values.categories.includes(category.name)
  );
  const newValues = { ...values, categories: matchingCategories };
  console.log(newValues);
  const product = await db.product.create({
    data: {
      title: newValues.title,
      imageUrl: newValues.imageUrl,
      desc: newValues.desc,
      stock: Number(newValues.stock),
      price: Number(newValues.price),
      isArchived: false,
      categories: {
        connect: newValues.categories.map((category) => ({
          name: category.name,
          slug: category.slug,
        })),
      },
    },
  });
  revalidatePath("/admin");
};

export const updateProduct = async (values: ProductWithCategories) => {
  const categories = await db.category.findMany({});
  const matchingCategories = categories.filter((category) =>
    values.categories.includes(category.name)
  );
  const newValues = { ...values, categories: matchingCategories };
  const archiveProduct = await db.product.update({
    where: { id: newValues.id },
    data: { isArchived: true },
  });

  const newProduct = await db.product.create({
    data: {
      title: newValues.title,
      imageUrl: newValues.imageUrl,
      desc: newValues.desc,
      stock: Number(newValues.stock),
      price: Number(newValues.price),
      isArchived: false,
      categories: {
        connect: newValues.categories.map((category) => ({
          name: category.name,
          slug: category.slug,
        })),
      },
    },
  });

  revalidatePath("/admin");
};
