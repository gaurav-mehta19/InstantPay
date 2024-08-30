"use client";
import { PrimaryButton } from "@repo/ui/authButton";
import { Heading } from "@repo/ui/heading";
import { SubHeading } from "@repo/ui/subHeading";
import { Input } from "@repo/ui/input";
import { useState } from "react";
import { SigninInputTypes } from "@repo/validation/input";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";




export const SigninComponent = () => {

    const router = useRouter()

    const [data, setData] = useState<SigninInputTypes>({
        phone: '',
        password: ''
    })

    async function handleSignin() {
        if (data.phone.trim().length < 1 || data.password.trim().length < 1) {
            toast.warning("Please fill all fields")
            return;
        }

        try {
            const res = await signIn('credentials', {
                phone: data.phone,
                password: data.password,
                redirect: false
            })

            if (res?.error) {
                toast.error(res.error)
            } else {
                setData({ phone: '', password: '' })
                toast.success("User signin successfully")
                router.push('/dashboard')
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
                <Input value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} label="Phone Number" placeholder="Enter your number" />
                <Input value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} label="Password" type="password" placeholder="Enter your password" />
                <div className="text-right ml-60 -mt-3">
                <div className="text-neutral-200 hover:underline">Forget password?</div>
                </div>
                <PrimaryButton label="Sign in" onClick={handleSignin}></PrimaryButton>
               
            </div>

        </div>
    )
}