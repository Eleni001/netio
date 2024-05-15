"use server";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const createUser = async () => {
  await db.user.create({
    data: {
      email: "123@mail.com",
      isAdmin: true,
    },
  });
};

export default createUser;
