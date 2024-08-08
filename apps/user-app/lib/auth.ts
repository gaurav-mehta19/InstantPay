/* eslint-disable turbo/no-undeclared-env-vars */
import prisma from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import { signinInput } from "@repo/validation/input";



export const NEXT_AUTH = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials:any) {

                if (!credentials.email || !credentials.password ) {
                    throw new Error('Invalid input');
                }
                const { email, password } = credentials;

                const { success } = signinInput.safeParse({ email, password });

                if (!success) {
                    throw new Error('Invalid input');
                }

                const userExist = await prisma.user.findFirst({
                    where: {
                        email: email
                    }
                });

                if (!userExist) {
                    throw new Error('User not found');
                }

                if(!userExist.password){
                    throw new Error('Invalid password');
                }

                const passwrodMatch = await bcrypt.compare(password, userExist.password);

                if (!passwrodMatch) {
                    throw new Error('Invalid password');
                }

                return {
                    id: userExist.id,
                    email: userExist.email,
                    name: userExist.name
                }
            }
        }),

        GoogleProvider({
            name: 'google',
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        })
    ],
    secret: process.env.SECRET,
    callbacks:{
      async session({ token, session }: any) {
            session.user.id = token.sub

            return session
        }
    },
    pages: {
        signIn: '/users/signin',
      },
}