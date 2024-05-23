"use server";

import { db } from "@/prisma/db";
import console from "console";
import { revalidatePath } from "next/cache";
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
  const products = await db.product.findMany({});
  return products;
};

export const createProduct = async (values: any) => {
  console.log(values);
  const product = await db.product.create({
    data: {
      title: values.title,
      imageUrl: values.imageUrl,
      desc: values.desc,
      stock: parseInt(values.stock),
      price: parseInt(values.price),
      isArchived: false,
    },
  });
  revalidatePath("/admin");
};
