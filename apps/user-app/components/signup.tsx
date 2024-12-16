"use client";
import { PrimaryButton } from "@repo/ui/authButton";
import { Heading } from "@repo/ui/heading";
import { SubHeading } from "@repo/ui/subHeading";
import { Input, PhoneInput } from "@repo/ui/input";
import axios from "axios";
import { useState } from "react";
import { SignupInputTypes } from "@repo/validation/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";


export const SignupComponent = () => {
    const router = useRouter()

    const [data, setData] = useState<SignupInputTypes>({
        name: '',
        phone: '',
        password: ''
    })

    async function handleSignup() {
        if (data.name.trim().length < 1 || data.phone.trim().length < 1 || data.password.trim().length < 1) {
            toast.warning("Please fill all fields")
            return;
        }

        const loadingToastId = toast.loading("Signing up...")
        try {
            const res = await axios.post("http://localhost:3000/api/auth/signup", data)

            if (res.data.error) {
                toast.error(res.data.error)
            }
            else {
                const response = await signIn('credentials', {
                    phone: data.phone,
                    password: data.password,
                    redirect: false
                })

                toast.dismiss(loadingToastId)
                if (response?.error) {
                    toast.error(response.error)
                }
                setData({ name: '', phone: '', password: '' })
                toast.success("User created successfully")
                router.push('/dashboard')
            }
        } catch (err) {
            console.log("Signup error ", err);
            toast.error("An error occurred during signup. Please try again")
        }
    }

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const phoneValue = e.target.value.replace(/\D/g, ''); 
        if (phoneValue.length <= 10) {
            setData({ ...data, phone: phoneValue });
        }
    }
    
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col gap-4 justify-center items-center w-3/6 h-5/6">
                <Heading label="Create your account" />
                <SubHeading label="Already have an account?" to="/users/signin" onclicktext="Signin" />
                <Input value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} label="Name" placeholder="Enter your name" />
                <PhoneInput value={data.phone} maxLength={10} onChange={handlePhoneChange} label="Phone Number" placeholder="000-000-0000" />
                <Input value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} label="Password" type="password" placeholder="Enter your password" />
                <PrimaryButton label="Create an account" onClick={handleSignup}></PrimaryButton>

            </div >
            <div>

            </div>
        </div >
    )
}


