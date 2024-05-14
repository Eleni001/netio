import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main () {
 await db.user.create({
    data: {
        email: "123@mail.com"
    }
    
 })
}
main()
