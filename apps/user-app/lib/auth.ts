/* eslint-disable turbo/no-undeclared-env-vars */
import prisma from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { signinInput } from "@repo/validation/input";



export const NEXT_AUTH = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                phone: { label: "phone", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials: any) {
                if (!credentials.phone || !credentials.password) {
                    throw new Error('Invalid credentials');
                }
                const { phone, password } = credentials;
            
                const { success } = signinInput.safeParse({ phone, password });
            
                if (!success) {
                    throw new Error('Invalid credentials');
                }
            
                const userExist = await prisma.user.findFirst({
                    where: { phone }
                });
            
                if (!userExist) {
                    throw new Error('Invalid credentials');  // 🔴 Avoid telling user exists or not
                }
            
                if (!userExist.password) {
                    throw new Error('Invalid credentials');
                }
            
                const passwordMatch = await bcrypt.compare(password, userExist.password);
            
                if (!passwordMatch) {
                    throw new Error('Invalid credentials');
                }
            
                return {
                    id: userExist.id,
                    phone: userExist.phone,
                    name: userExist.name
                }
            }
        }),
    ],
    secret: process.env.JWT_SECRET,
    callbacks: {
        async jwt({ token, user }:any) {
            if (user) {
                token.sub = user.id;
                token.phone = user.phone;
                token.name = user.name;
            }
            return token;
        },
        async session({ token, session }:any) {
            if (token?.sub) {
                session.user.id = token.sub;
                session.user.phone = token.phone;
                session.user.name = token.name;
            }
            return session;
        }
    },
    session: {
        strategy: 'jwt' as const,
        maxAge: 24 * 60 * 60, // 24 hours
    },
    pages: {
        signIn: '/users/signin',
    },
}