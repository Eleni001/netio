import { PrismaClient } from "@prisma/client";

export async function createUser(db: PrismaClient) {
  const Peter = await db.user.upsert({
    where: { email: "peter.pan@mail.se" },
    update: {},
    create: {
      username: "peter",
      email: "peter.pan@mail.se",
      password: "secretpassword",
      orders: {
        create: {
          shippingAddress: {
            create: {
              city: "Borås",
              email: "peter.pan@mail.se",
              street: "Kungsgatan 10",
              zip: 50452,
            },
          },
          total: 200,
          createdAt: new Date(),
          orderRows: { create: { productId: 1, quantity: 1, subTotal: 1 } },
        },
      },
    },
  });
  const Lena = await db.user.upsert({
    where: { email: "lena.lamm@mail.se" },
    update: {},
    create: {
      username: "lena",
      email: "lena.lamm@mail.se",
      password: "cruder",
    },
  });
  const Maja = await db.user.upsert({
    where: { email: "nalle.maja@mail.se" },
    update: {},
    create: {
      username: "nalle",
      email: "nalle.maja@mail.se",
      password: "cruder",
      isAdmin: true,
    },
  });
}
