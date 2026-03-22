import prisma from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";
import bcrypt from "bcrypt";
import { signinInput } from "./validation/input";

type AuthJwt = JWT & {
  phone?: string;
  name?: string;
};

type SessionUser = {
  id: string;
  phone?: string;
  name?: string;
};

export const NEXT_AUTH: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: { label: "phone", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.phone || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const { phone, password } = credentials;

        const { success } = signinInput.safeParse({ phone, password });
        if (!success) {
          throw new Error("Invalid credentials");
        }

        const userExist = await prisma.user.findFirst({
          where: { phone },
        });

        const dummyHash = "$2b$10$dummyhashdummyhashdummyhashdumm";
        const hashToCompare = userExist?.password || dummyHash;
        const passwordMatch = await bcrypt.compare(password, hashToCompare);

        if (!userExist || !passwordMatch) {
          throw new Error("Invalid credentials");
        }

        return {
          id: userExist.id,
          phone: userExist.phone,
          name: userExist.name,
        };
      },
    }),
  ],
  secret: process.env.JWT_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      const authToken = token as AuthJwt;

      if (user) {
        authToken.sub = user.id;
        authToken.phone = (user as { phone?: string }).phone;
        authToken.name = user.name ?? undefined;
      }

      return authToken;
    },
    async session({ token, session }) {
      const authToken = token as AuthJwt;
      const user = (session.user ?? { id: "" }) as SessionUser;
      user.id = authToken.sub ?? user.id ?? "";
      user.phone = authToken.phone;
      user.name = authToken.name;

      session.user = user;
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },
  pages: {
    signIn: "/users/signin",
  },
};
