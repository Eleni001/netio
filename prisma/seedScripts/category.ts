import { PrismaClient } from '@prisma/client';

export async function createCategory(db: PrismaClient) {
  const category1 = await db.category.upsert({
    where: { id: 4 },
    update: {},
    create: {
      name: 'Indoor & Furniture',
      slug: 'indoor-furniture',
      imageUrl:
        'https://images.unsplash.com/photo-1533779283484-8ad4940aa3a8?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  });
}
