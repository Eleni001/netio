import { PrismaClient } from '@prisma/client';
import { createCategory } from './seedScripts/category';
import { createProducts } from './seedScripts/products';
import { createUser } from './seedScripts/users';

const db = new PrismaClient();
async function main() {
  await createProducts(db);
  await createUser(db);
  await createCategory(db);
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
