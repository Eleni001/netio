"use server";

import { db } from "@/prisma/db";
import { revalidatePath } from "next/cache";
import { UserCreate, UserCreateSchema } from "../validations/userValidation";

export async function registerUser(incomingData: UserCreate) {
  try {
    const userData = await UserCreateSchema.validate(incomingData);
    const user = await db.user.create({
      data: {
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
