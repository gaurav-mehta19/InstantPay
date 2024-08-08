import prisma from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";
import { signupInput } from "@repo/validation/input"
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
    const body = await req.json();

    const { success } = signupInput.safeParse(body);

    if (!success) {
        return NextResponse.json({
          error : 'Invalid Input' 
     })
    }

    const existingUser = await prisma.user.findFirst({
        where: {
            email: body.email
        }
    });
    
    if (existingUser) {
        return NextResponse.json({
            error: 'User already exists'
        })
    }

    try {
        const hashedPassword = await bcrypt.hash(body.password, 12);
        const newUser = await prisma.user.create({
            data: {
                email: body.email,
                password: hashedPassword,
                name: body.name
            }
        });
        return NextResponse.json({
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        })
    }
    catch (err) {
        console.log(err);
        return NextResponse.json(
            { error: 'Error creating user' },
            { status: 500 }
        )
    }
}