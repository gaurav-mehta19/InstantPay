"use client";
import { PrimaryButton } from "@repo/ui/authButton";
import { Heading } from "@repo/ui/heading";
import { SubHeading } from "@repo/ui/subHeading";
import { Input, PhoneInput } from "@repo/ui/input";
import { useState, useEffect } from "react";
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
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    async function handleSignin() {
        if (data.phone.trim().length < 1 || data.password.trim().length < 1) {
            toast.warning("Please fill all fields");
            return;
        }

        if(data.password.trim().length < 8){
            toast.warning("Password length must be 8")
            return;
        }
    
        setIsLoading(true);
        const loadingToastId = toast.loading("Signing in...");
    
        try {
            const res = await signIn('credentials', {
                phone: data.phone,
                password: data.password,
                redirect: false
            });
    
            toast.dismiss(loadingToastId);
            setIsLoading(false);
    
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
            setIsLoading(false);
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
        <div className="min-h-screen flex items-center justify-center p-6">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl animate-pulse-slow"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-accent-teal/10 to-accent-emerald/10 rounded-full blur-3xl animate-float"></div>
            </div>

            <div className="relative z-10 w-full max-w-md">
                <div className="text-center mb-8 animate-fade-in">
                    <Link href="/landing" className="flex items-center justify-center space-x-3 group mb-6">
                        <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-2xl group-hover:scale-110 transition-transform duration-300">
                            <Wallet2 className="h-8 w-8 text-white" />
                        </div>
                        <span className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            InstantPay
                        </span>
                    </Link>
                    
                    <h1 className="text-4xl font-bold text-neutral-800 mb-3">Welcome back!</h1>
                    <p className="text-lg text-neutral-600">
                        Sign in to your account to continue your financial journey
                    </p>
                </div>

                <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-elegant border border-neutral-200 p-8 animate-slide-in-left">
                    <div className="space-y-6">
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
                                    placeholder="Enter your password"
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
                        </div>

                        {/* Forgot Password */}
                        <div className="text-right">
                            <button className="text-primary hover:text-primary-dark font-medium hover:underline transition-colors duration-300">
                                Forgot password?
                            </button>
                        </div>

                        {/* Sign In Button */}
                        <button
                            onClick={handleSignin}
                            disabled={isLoading || !data.phone || !data.password}
                            className="w-full py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold text-lg rounded-2xl hover:shadow-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing In...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </div>
                </div>

                {/* Sign Up Link */}
                <div className="text-center mt-8 animate-slide-in-right">
                    <p className="text-neutral-600">
                        Don't have an account?{' '}
                        <Link href="/users/signup" className="text-primary hover:text-primary-dark font-semibold hover:underline transition-colors duration-300">
                            Create one now
                        </Link>
                    </p>
                </div>

                {/* Trust Indicators */}
                <div className="mt-8 space-y-3 animate-fade-in" style={{animationDelay: '0.6s'}}>
                    <div className="flex items-center justify-center space-x-6 text-xs text-neutral-500">
                        <div className="flex items-center space-x-1">
                            <svg className="h-4 w-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>SSL Encrypted</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <svg className="h-4 w-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>Bank Grade Security</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <svg className="h-4 w-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            <span>24/7 Support</span>
                        </div>
                    </div>
                    
                    <div className="p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl border border-primary-100">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-xl">
                                <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-neutral-700">Your data is safe with us</p>
                                <p className="text-xs text-neutral-600">Advanced encryption protects your information</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}