import { PrismaClient } from "@prisma/client";

// export const userSeed = async () => {};

export async function createUser(db: PrismaClient) {
    const Peter = await db.user.upsert({
        where: {email: "peter.pan@mail.se"},
        update: {},
        create: {
            email: "peter.pan@mail.se",
            password: "secretpassword",
        }
    })
}
