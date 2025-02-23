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
import { createBalance } from "../lib/actions/balance";
import { User, KeyRound, Wallet2} from "lucide-react";
import Link from "next/link";

export const SignupComponent = () => {
    const router = useRouter()

    const [data, setData] = useState<SignupInputTypes>({
        name: '',
        phone: '',
        password: ''
    })

    async function handleSignup() {
        const formattedName = data.name.trim().charAt(0).toUpperCase() + data.name.trim().slice(1);

        const formattedData = { ...data, name: formattedName };

        if (data.name.trim().length < 1 || data.phone.trim().length < 1 || data.password.trim().length < 1) {
            toast.warning("Please fill all fields")
            return;
        }
        
        if(data.password.trim().length < 8){
            toast.warning("Password length must be 8")
            return;
        }

        const loadingToastId = toast.loading("Signing up...")
        try {
            const res = await axios.post("https://instant-pay-user-app.vercel.app//api/auth/signup", formattedData)

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
                await createBalance()
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
        <div className="bg-gradient-to-b from-white via-[#F0F5FF] to-white">
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col gap-4 justify-center items-center w-3/6 h-5/6">
            <Link href="/landing" className="flex items-center space-x-2 group mb-3">
            <Wallet2 className="h-10 w-10 text-primary transition-transform group-hover:scale-110" />
            <span className="text-4xl bg-clip-text text-transparent font-bold bg-gradient-to-r from-primary via-primary/80 to-secondary">InstantPay</span>
          </Link>
                <Heading label="Create your account" />
                <p className="text-md mb-3 -mt-1 text-secondary-dark">
            Join millions of users and start your journey with InstantPay
          </p>
                <div className="border px-6 py-8 rounded-lg shadow-lg bg-white flex flex-col items-center gap-4">
                <Input Icon={User} value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} label="Name" placeholder="Enter your name" />
                <PhoneInput value={data.phone} maxLength={10} onChange={handlePhoneChange} label="Phone Number" placeholder="000-000-0000" />
                <Input Icon={KeyRound} value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} label="Password" type="password" placeholder="Enter your password" />
                <p className="-mt-2.5 mb-2 text-xs text-gray-500 text-left -ml-44">Must be at least 8 characters long</p>
                <PrimaryButton label="Create an account" onClick={handleSignup}></PrimaryButton>
                </div>

                <SubHeading label="Already have an account ?" to="/users/signin" onclicktext="Signin" />

            </div >
        </div>
        </div>
    )
}


