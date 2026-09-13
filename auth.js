import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcryptjs";
import { db } from "./lib/prisma.js";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  providers: [
    Google({ clientId: process.env.AUTH_GOOGLE_ID, clientSecret: process.env.AUTH_GOOGLE_SECRET }),
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        const email = String(credentials?.email || "").trim().toLowerCase();
        const password = String(credentials?.password || "");
        if (!email || !password) return null;
        const user = await db.user.findUnique({ where: { email } });
        if (!user?.passwordHash) return null;
        if (!(await compare(password, user.passwordHash))) return null;
        return { id: user.id, email: user.email, name: user.name, nickname: user.nickname };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) { if (user) token.nickname = user.nickname; return token; },
    async session({ session, token }) {
      if (session.user) { session.user.id = token.sub; session.user.nickname = token.nickname; }
      return session;
    },
  },
  pages: { signIn: "/login" },
});
