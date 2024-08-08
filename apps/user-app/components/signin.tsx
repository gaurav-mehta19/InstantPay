"use client";
import { PrimaryButton, SecondaryButton } from "@repo/ui/button";
import { Heading } from "@repo/ui/heading";
import { SubHeading } from "@repo/ui/subHeading";
import { Input } from "@repo/ui/input";
import { useState } from "react";
import { SigninInputTypes } from "@repo/validation/input";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { HorizontalLine } from "@repo/ui/horizontalLine";



export const SigninComponent = () => {

    const router = useRouter()

    const [data, setData] = useState<SigninInputTypes>({
        email: '',
        password: ''
    })

    async function handleSignin() {
        if (data.email.trim().length < 1 || data.password.trim().length < 1) {
            toast.warning("Please fill all fields")
            return;
        }

        try {
            const res = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false
            })

            if (res?.error) {
                toast.error(res.error)
            } else {
                setData({ email: '', password: '' })
                toast.success("User signin successfully")
                router.push('/')
            }
        } catch (err) {
            console.log("Signup error ", err);
            toast.error("An error occurred during signin. Please try again")
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col gap-4 justify-center items-center w-4/6 h-4/6">
                <Heading label="Sign in your account" />
                <SubHeading label="Don't have an account?" to="/users/signup" onclicktext="Signup" />
                <Input value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} label="Email" placeholder="Enter your email" />
                <Input value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} label="Password" type="password" placeholder="Enter your password" />
                <div className="text-right ml-60 -mt-3">
                <div className="text-neutral-200 hover:underline">Forget password?</div>
                </div>
                <PrimaryButton label="Sign in" onClick={handleSignin}></PrimaryButton>
                <HorizontalLine label="or" />
                <SecondaryButton label="Sign in with Google" onClick={handleSignin}></SecondaryButton>

               
            </div>

        </div>
    )
}