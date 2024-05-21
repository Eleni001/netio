import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import github from "next-auth/providers/github";
import { db } from "./prisma/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
	adapter: PrismaAdapter(db),
	providers: [github],
});
