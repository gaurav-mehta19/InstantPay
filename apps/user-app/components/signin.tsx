"use client";
import { PrimaryButton } from "@repo/ui/authButton";
import { Heading } from "@repo/ui/heading";
import { SubHeading } from "@repo/ui/subHeading";
import { Input, PhoneInput } from "@repo/ui/input";
import { useState } from "react";
import { SigninInputTypes } from "@repo/validation/input";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { KeyRound, Wallet2} from "lucide-react";
import Link from "next/link";



export const SigninComponent = () => {

    const router = useRouter()

    const [data, setData] = useState<SigninInputTypes>({
        phone: '',
        password: ''
    })

    async function handleSignin() {
        if (data.phone.trim().length < 1 || data.password.trim().length < 1) {
            toast.warning("Please fill all fields");
            return;
        }

        if(data.password.trim().length < 8){
            toast.warning("Password length must be 8")
            return;
        }
    
        const loadingToastId = toast.loading("Signing in...");
    
        try {
            const res = await signIn('credentials', {
                phone: data.phone,
                password: data.password,
                redirect: false
            });
    
            toast.dismiss(loadingToastId);
    
            if (res?.error) {
                toast.error(res.error);
            } else {
                setData({ phone: '', password: '' });
                toast.success("User signed in successfully");
                router.push('/dashboard');
            }
        } catch (err) {
            console.log("Signup error ", err);
            toast.dismiss(loadingToastId);
            toast.error("An error occurred during signin. Please try again");
        }
    }

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Remove any non-numeric characters
        const phoneValue = e.target.value.replace(/\D/g, ''); // This removes anything that's not a number
        // Limit input to 10 digits
        if (phoneValue.length <= 10) {
            setData({ ...data, phone: phoneValue });
        }
    }
    

    return (
        <div className="bg-gradient-to-b from-white via-[#F0F5FF] to-white">
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col gap-4 justify-center items-center w-4/6 h-4/6">
            <Link href="/landing" className="flex items-center space-x-2 group mb-3">
            <Wallet2 className="h-10 w-10 text-primary transition-transform group-hover:scale-110" />
            <span className="text-4xl bg-clip-text text-transparent font-bold bg-gradient-to-r from-primary via-primary/80 to-secondary">InstantPay</span>
          </Link>
                <Heading label="Welcome back" />
                <p className="text-md mb-3 -mt-1 text-secondary-dark">
            Sign in to your account to continue
          </p>
                <div className="border bg-white px-6 py-8 rounded-lg flex flex-col gap-4 shadow-lg">
                <PhoneInput value={data.phone} maxLength={10} onChange={handlePhoneChange} label="Phone Number" placeholder="000-000-0000" />
                <Input Icon={KeyRound} value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })} label="Password" type="password" placeholder="Enter your password" />
                <div className="text-right ml-60 -mt-3.5 -mb-2.5">
                <div className="text-primary  hover:underline ">Forget password?</div>
                </div>
                <PrimaryButton label="Sign in" onClick={handleSignin}></PrimaryButton>
                </div>

                <SubHeading label="Don't have an account ?" to="/users/signup" onclicktext="Signup" />
               
            </div>
            </div>
        </div>
    )
}