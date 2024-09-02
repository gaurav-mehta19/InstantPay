import prisma from "@repo/db/client";
import { NextRequest, NextResponse } from "next/server";
import { forgetPasswordInput, signupInput } from "@repo/validation/input"
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
            phone: body.phone
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
                phone: body.phone,
                password: hashedPassword,
                name: body.name
            }
        });
        return NextResponse.json({
            id: newUser.id,
            name: newUser.name,
            phone: newUser.phone
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

export async function PUT(req:NextRequest){
    const body = req.json()
    const phone = req.nextUrl.searchParams.get('phone')

    const { success } = forgetPasswordInput.safeParse(body)

}