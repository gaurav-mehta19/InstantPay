"use client";

import Link from 'next/link';;
import { SendHorizontal, Building2, Wallet2, ArrowRight, Shield, Zap, Clock, Users, Coins, ChevronRight } from "lucide-react";
import { MapPin, Phone, Mail } from "lucide-react";
import { signIn } from "next-auth/react";
import { toast } from 'sonner';
import { useRouter } from "next/navigation";


export const LandingPage = () => {
    const router = useRouter();

    async function handleDemo(){
        const loadingToastId = toast.loading("Signing in as Test User");
        try{
            const res = await signIn('credentials', {
                phone: '2222222222',
                password: '123456789',
                redirect: false
            })
    
            toast.dismiss(loadingToastId);


            if (res?.error) {
                toast.error(res.error);
            } else {
                toast.success("Signed in Test User");
                router.push('/dashboard');
            }
        } catch (err) {
            console.log("Signup error ", err);
            toast.dismiss(loadingToastId);
            toast.error("An error occurred during signin. Please try again");
        }
    
    
    }


    return (
        <div>
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
                    <div className="text-center relative z-10">
                        <h1 className="text-7xl font-bold mb-6 leading-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-secondary">Send Money</span><br />
                            <span className="text-secondary-darker">  Fast & Secure</span>
                        </h1>
                        <p className="text-xl text-secondary-dark mb-8 max-w-2xl mx-auto leading-relaxed">
                            The simplest way to send money to friends and family. No hidden fees, instant transfers, and bank-grade security.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
                            <Link href="/users/signin" className="w-full sm:w-auto px-6 py-3 rounded-md bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-primary/25 transition-all flex items-center justify-center">
                                Get Started <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                            <button onClick={handleDemo} className="w-full sm:w-auto px-6 py-3 rounded-lg border border-primary text-primary hover:bg-primary/10 transition-all flex items-center justify-center group">
                                Watch Demo <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>


            {/* Features Section */}
            <div id="features" className="relative py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-secondary-darker mb-4">Powerful Features</h2>
                        <p className="text-xl text-secondary-dark max-w-2xl mx-auto">
                            Everything you need to manage your money in one place
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="relative overflow-hidden transition-all duration-300 hover:scale-105 p-8 bg-white rounded-lg shadow-lg border border-secondary-medium/30">
                            <SendHorizontal className="h-12 w-12 text-primary mb-6 animate-[float_6s_ease-in-out_infinite]" />
                            <h3 className="text-xl font-semibold text-secondary-darker mb-3">Instant Transfers</h3>
                            <p className="text-secondary-dark leading-relaxed">
                                Send money instantly to anyone, anywhere. Split bills and share expenses with zero fees.
                            </p>
                        </div>

                        <div className="relative overflow-hidden transition-all duration-300 hover:scale-105 p-8 bg-white rounded-lg shadow-lg border border-secondary-medium/30">
                            <Building2 className="h-12 w-12 text-primary mb-6 animate-[float_6s_ease-in-out_infinite]" style={{ animationDelay: '2s' }} />
                            <h3 className="text-xl font-semibold text-secondary-darker mb-3">Bank Integration</h3>
                            <p className="text-secondary-dark leading-relaxed">
                                Connect your bank accounts securely. Support for all major banks with instant transfers.
                            </p>
                        </div>

                        <div className="relative overflow-hidden transition-all duration-300 hover:scale-105 p-8 bg-white rounded-lg shadow-lg border border-secondary-medium/30">
                            <Shield className="h-12 w-12 text-primary mb-6 animate-[float_6s_ease-in-out_infinite]" style={{ animationDelay: '4s' }} />
                            <h3 className="text-xl font-semibold text-secondary-darker mb-3">Advanced Security</h3>
                            <p className="text-secondary-dark leading-relaxed">
                                Bank-grade encryption and security measures to keep your money and data safe.
                            </p>
                        </div>
                    </div>
                </div>
            </div>


            {/* Benefits Section */}
            <div id="benefits" className="relative bg-[#F0F5FF] py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-secondary-darker mb-4">Why Choose InstantPay?</h2>
                        <p className="text-xl text-secondary-dark max-w-2xl mx-auto">
                            Join millions of users who trust InstantPay for their daily transactions
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        <div className="text-center group">
                            <div className="bg-white p-6 rounded-full w-20 h-20 mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow">
                                <Users className="h-8 w-8 text-primary mx-auto group-hover:scale-110 transition-transform" />
                            </div>
                            <h3 className="text-xl font-semibold text-secondary-darker mb-2">Social Payments</h3>
                            <p className="text-secondary-dark">Split bills with friends easily</p>
                        </div>
                        <div className="text-center group">
                            <div className="bg-white p-6 rounded-full w-20 h-20 mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow">
                                <Coins className="h-8 w-8 text-primary mx-auto group-hover:scale-110 transition-transform" />
                            </div>
                            <h3 className="text-xl font-semibold text-secondary-darker mb-2">Zero Fees</h3>
                            <p className="text-secondary-dark">No hidden charges</p>
                        </div>
                        <div className="text-center group">
                            <div className="bg-white p-6 rounded-full w-20 h-20 mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow">
                                <Clock className="h-8 w-8 text-primary mx-auto group-hover:scale-110 transition-transform" />
                            </div>
                            <h3 className="text-xl font-semibold text-secondary-darker mb-2">24/7 Support</h3>
                            <p className="text-secondary-dark">Always here to help</p>
                        </div>
                    </div>
                </div>
            </div>


            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="p-12 bg-gradient-to-br from-primary/5 via-[#F0F5FF] to-white border border-secondary-medium rounded-lg text-center">
                    <Zap className="h-16 w-16 mx-auto mb-6 text-primary animate-[float_6s_ease-in-out_infinite]" />
                    <h2 className="text-3xl font-bold mb-4 text-secondary-darker">Ready to Get Started?</h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto text-secondary-dark">
                        Join thousands of users who trust InstantPay for their daily transactions.
                        Experience the future of digital payments today.
                    </p>
                    <Link href="/users/signup" className="inline-flex items-center px-6 py-3 rounded-md bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-primary/25 transition-all">
                        Create Your Wallet Now <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                </div>
            </div>

            <footer className="bg-white border-t border-secondary-medium/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Main Footer Content */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                        {/* Company Info */}
                        <div className="space-y-6">
                            <Link href="/" className="flex items-center space-x-2 group">
                                <Wallet2 className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
                                <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-secondary">InstantPay</span>
                            </Link>
                            <p className="text-secondary-dark">
                                Making digital payments simple, secure, and instant for everyone.
                            </p>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-lg font-semibold text-secondary-darker mb-4">Quick Links</h3>
                            <ul className="space-y-3">
                                <li>
                                    <Link href="#" className="text-secondary-dark hover:text-primary transition-colors">About Us</Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-secondary-dark hover:text-primary transition-colors">How It Works</Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-secondary-dark hover:text-primary transition-colors">Security</Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-secondary-dark hover:text-primary transition-colors">Careers</Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-secondary-dark hover:text-primary transition-colors">Blog</Link>
                                </li>
                            </ul>
                        </div>

                        {/* Support */}
                        <div>
                            <h3 className="text-lg font-semibold text-secondary-darker mb-4">Support</h3>
                            <ul className="space-y-3">
                                <li>
                                    <Link href="#" className="text-secondary-dark hover:text-primary transition-colors">Help Center</Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-secondary-dark hover:text-primary transition-colors">FAQs</Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-secondary-dark hover:text-primary transition-colors">Privacy Policy</Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-secondary-dark hover:text-primary transition-colors">Terms of Service</Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-secondary-dark hover:text-primary transition-colors">Contact Us</Link>
                                </li>
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h3 className="text-lg font-semibold text-secondary-darker mb-4">Contact</h3>
                            <ul className="space-y-3">
                                <li className="flex items-center space-x-3 text-secondary-dark">
                                    <MapPin className="h-5 w-5 text-primary" />
                                    <span>123 Payment Street, Financial District, 12345</span>
                                </li>
                                <li className="flex items-center space-x-3 text-secondary-dark">
                                    <Phone className="h-5 w-5 text-primary" />
                                    <span>+1 (555) 123-4567</span>
                                </li>
                                <li className="flex items-center space-x-3 text-secondary-dark">
                                    <Mail className="h-5 w-5 text-primary" />
                                    <span>support@instantpay.com</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}