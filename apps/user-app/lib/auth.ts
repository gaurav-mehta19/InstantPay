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
                    throw new Error('Invalid input');
                }
                const { phone, password } = credentials;

                const { success } = signinInput.safeParse({ phone, password });

                if (!success) {
                    throw new Error('Invalid input');
                }

                const userExist = await prisma.user.findFirst({
                    where: {
                        phone: phone
                    }
                });

                if (!userExist) {
                    throw new Error('User not found');
                }

                if (!userExist.password) {
                    throw new Error('Invalid password');
                }

                const passwordMatch = await bcrypt.compare(password, userExist.password);

                if (!passwordMatch) {
                    throw new Error('Invalid password');
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
            session.user.id = token.sub;
            session.user.phone = token.phone;
            session.user.name = token.name;
            return session;
        }
    },
    pages: {
        signIn: '/users/signin',
    },
}