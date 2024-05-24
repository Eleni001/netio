import { PrismaClient } from "@prisma/client";

export async function createCategory(db: PrismaClient) {
  const category1 = await db.category.upsert({
    where: { id: 4 },
    update: {},
    create: { name: "Indoor & Furniture", slug: "indoor-furniture" },
  });
}
