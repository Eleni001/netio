// import { PrismaClient } from "@prisma/client";

// const db = new PrismaClient();

// async function main() {
//   const oscar = await db.user.upsert({
//     where: {
//       email: "oscar.jigbring@hotmail.se",
//     },
//     update: {},
//     create: {
//       email: "oscar.jigbring@hotmail.se",
//       name: "Oscar",
//       posts: {
//         create: [
//           {
//             title: "Check out Prisma with Next.js",
//             content: "https://www.prisma.io/nextjs",
//             published: true,
//           },
//           {
//             title: "Check out this sheize",
//             content: "https://www.prisma.io/scooby",
//             published: false,
//           },
//         ],
//       },
//     },
//   });
//   console.log({ oscar });
// }

// main()
//   .then(async () => {
//     await db.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await db.$disconnect();
//     process.exit(1);
//   });

// async function main() {
//   await userSeed();
//   await userSeed();
//   await userSeed();
//   await userSeed();
//   await userSeed();
// }
