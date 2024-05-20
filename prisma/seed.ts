import { PrismaClient } from "@prisma/client";
import { createUser } from "./seedScripts/user";

const db = new PrismaClient();
async function main() {
    await createUser(db);
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
