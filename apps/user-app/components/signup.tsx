"use client";
import { PrimaryButton } from "@repo/ui/authButton";
import { Heading } from "@repo/ui/heading";
import { SubHeading } from "@repo/ui/subHeading";
import { Input, PhoneInput } from "@repo/ui/input";
import axios from "axios";
import { useState, useEffect } from "react";
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
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);

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

        setIsLoading(true);
        const loadingToastId = toast.loading("Signing up...")
        try {
            const res = await axios.post("https://instant-pay-user-app.vercel.app/api/auth/signup", formattedData)

            if ((res.data as any)?.error) {
                toast.error((res.data as any).error)
            }
            else {
                const response = await signIn('credentials', {
                    phone: data.phone,
                    password: data.password,
                    redirect: false
                })

                toast.dismiss(loadingToastId)
                setIsLoading(false);
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
            toast.dismiss(loadingToastId);
            setIsLoading(false);
            toast.error("An error occurred during signup. Please try again")
        }
    }

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const phoneValue = e.target.value.replace(/\D/g, '');
        if (phoneValue.length <= 10) {
            setData({ ...data, phone: phoneValue });
        }
    }

    const calculatePasswordStrength = (password: string) => {
        let strength = 0;
        if (password.length >= 8) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[a-z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;
        return strength;
    }

    useEffect(() => {
        setPasswordStrength(calculatePasswordStrength(data.password));
    }, [data.password]);

    return (
        <div className="min-h-screen p-6 py-8">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-accent-teal/10 to-accent-emerald/10 rounded-full blur-3xl animate-float"></div>
            </div>

            <div className="relative z-10 w-full max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* Left Column - Form */}
                    <div className="space-y-6">
                        <div className="text-center mb-8 animate-fade-in">
                            <Link href="/landing" className="flex items-center justify-center space-x-3 group mb-6">
                                <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-2xl group-hover:scale-110 transition-transform duration-300">
                                    <Wallet2 className="h-8 w-8 text-white" />
                                </div>
                                <span className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                                    InstantPay
                                </span>
                            </Link>
                            
                            <h1 className="text-4xl font-bold text-neutral-800 mb-3">Create Account</h1>
                            <p className="text-lg text-neutral-600">
                                Join millions of users and start your digital payment journey today
                            </p>
                        </div>

                        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-elegant border border-neutral-200 p-8 animate-slide-in-left">
                            <div className="space-y-6">
                        {/* Name Input */}
                        <div>
                            <label className="block text-sm font-semibold text-neutral-700 mb-3">Full Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-neutral-400" />
                                </div>
                                <input
                                    type="text"
                                    value={data.name}
                                    onChange={(e) => setData({ ...data, name: e.target.value })}
                                    placeholder="Enter your full name"
                                    className="w-full pl-12 pr-4 py-4 text-lg border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 bg-neutral-50 hover:bg-white"
                                />
                            </div>
                        </div>

                        {/* Phone Input */}
                        <div>
                            <label className="block text-sm font-semibold text-neutral-700 mb-3">Phone Number</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <input
                                    type="tel"
                                    value={data.phone}
                                    onChange={handlePhoneChange}
                                    maxLength={10}
                                    placeholder="Enter your phone number"
                                    className="w-full pl-12 pr-4 py-4 text-lg border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 bg-neutral-50 hover:bg-white"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-sm font-semibold text-neutral-700 mb-3">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <KeyRound className="h-5 w-5 text-neutral-400" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={data.password}
                                    onChange={(e) => setData({ ...data, password: e.target.value })}
                                    placeholder="Create a secure password"
                                    className="w-full pl-12 pr-12 py-4 text-lg border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 bg-neutral-50 hover:bg-white"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-neutral-400 hover:text-neutral-600 transition-colors"
                                >
                                    {showPassword ? (
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            
                            {/* Password Strength Indicator */}
                            {data.password && (
                                <div className="mt-3">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs text-neutral-600">Password Strength</span>
                                        <span className={`text-xs font-medium ${
                                            passwordStrength <= 2 ? 'text-red-500' : 
                                            passwordStrength <= 3 ? 'text-yellow-500' : 
                                            'text-green-500'
                                        }`}>
                                            {passwordStrength <= 2 ? 'Weak' : 
                                             passwordStrength <= 3 ? 'Medium' : 
                                             'Strong'}
                                        </span>
                                    </div>
                                    <div className="flex space-x-1">
                                        {[1, 2, 3, 4, 5].map((level) => (
                                            <div
                                                key={level}
                                                className={`h-2 flex-1 rounded-full transition-colors duration-200 ${
                                                    level <= passwordStrength
                                                        ? passwordStrength <= 2 
                                                            ? 'bg-red-500' 
                                                            : passwordStrength <= 3 
                                                                ? 'bg-yellow-500' 
                                                                : 'bg-green-500'
                                                        : 'bg-neutral-200'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                    <div className="mt-2 space-y-1">
                                        <div className={`text-xs flex items-center ${data.password.length >= 8 ? 'text-green-600' : 'text-neutral-500'}`}>
                                            <svg className={`h-3 w-3 mr-1 ${data.password.length >= 8 ? 'text-green-500' : 'text-neutral-400'}`} fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            At least 8 characters
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                                {/* Sign Up Button */}
                                <button
                                    onClick={handleSignup}
                                    disabled={isLoading || !data.name || !data.phone || !data.password || data.password.length < 8}
                                    className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold text-lg rounded-2xl hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Creating Account...
                                        </>
                                    ) : (
                                        'Create Account'
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Sign In Link */}
                        <div className="text-center animate-slide-in-right">
                            <p className="text-neutral-600">
                                Already have an account?{' '}
                                <Link href="/users/signin" className="text-primary hover:text-primary-dark font-semibold hover:underline transition-colors duration-300">
                                    Sign in here
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* Right Column - Features */}
                    <div className="space-y-8 animate-fade-in" style={{animationDelay: '0.6s'}}>
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold text-neutral-800 mb-2">Why choose InstantPay?</h3>
                            <p className="text-neutral-600">Join millions of users who trust InstantPay</p>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-6">
                            <div className="flex items-center space-x-4 p-6 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl border border-primary-100">
                                <div className="p-3 bg-gradient-to-br from-primary to-secondary rounded-xl">
                                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-lg font-semibold text-neutral-800">Instant Money Transfers</p>
                                    <p className="text-neutral-600">Send money in seconds with just a phone number</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-4 p-6 bg-gradient-to-r from-accent-emerald/10 to-accent-teal/10 rounded-2xl border border-accent-emerald/20">
                                <div className="p-3 bg-gradient-to-br from-accent-emerald to-accent-teal rounded-xl">
                                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-lg font-semibold text-neutral-800">Bank-Grade Security</p>
                                    <p className="text-neutral-600">Advanced encryption keeps your money safe</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-4 p-6 bg-gradient-to-r from-accent-pink/10 to-accent-coral/10 rounded-2xl border border-accent-pink/20">
                                <div className="p-3 bg-gradient-to-br from-accent-pink to-accent-coral rounded-xl">
                                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-lg font-semibold text-neutral-800">Zero Transaction Fees</p>
                                    <p className="text-neutral-600">No hidden charges, completely free to use</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


