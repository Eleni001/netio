import { PrismaClient } from '@prisma/client';

export async function createProducts(db: PrismaClient) {
  const product1 = await db.product.upsert({
    where: { id: 1 },
    update: {},
    create: {
      title: 'ceilinglamp',
      price: 399,
      imageUrl:
        'https://plus.unsplash.com/premium_photo-1705582800047-1aacf1e0f0ba?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      desc: 'a nice looking ceilinglamp',
      stock: 25,
      isArchived: false,
      categories: { create: { name: 'Lighting', slug: 'lighting' } },
    },
  });

  const product2 = await db.product.upsert({
    where: { id: 2 },
    update: {},
    create: {
      title: 'kitchenknife',
      price: 2000,
      imageUrl:
        'https://images.unsplash.com/photo-1614362705324-8da11fd16754?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      desc: 'A hella sharp kitchenknife',
      stock: 10,
      isArchived: false,
      categories: { create: { name: 'Kitchen', slug: 'kitchen' } },
    },
  });
  const product3 = await db.product.upsert({
    where: { id: 3 },
    update: {},
    create: {
      title: 'Green Sofa',
      price: 350,
      imageUrl:
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      desc: 'A hella sharp kitchenknife',
      stock: 99,
      isArchived: false,
      categories: { create: { name: 'Furniture', slug: 'furniture' } },
    },
  });
}
