"use client";

import Link from 'next/link';;
import { SendHorizontal, Building2, Wallet2, ArrowRight, Shield, Zap, Clock, Users, Coins, ChevronRight } from "lucide-react";
import { MapPin, Phone, Mail } from "lucide-react";
import { useDemoContext } from "../contexts/demoContext";


export const LandingPage = () => {
    const { isDemoLoading, shouldRedirect } = useDemoContext();

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 relative">
            {/* Demo Loading Overlay */}
            {(isDemoLoading || shouldRedirect) && (
                <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                        <p className="text-xl font-semibold text-primary">
                            {shouldRedirect ? 'Redirecting to your dashboard...' : 'Setting up your demo experience...'}
                        </p>
                        <p className="text-neutral-600 mt-2">Please wait while we prepare your dashboard</p>
                    </div>
                </div>
            )}

            {/* Hero Section */}
            <div className="relative overflow-hidden">
                {/* Background decorations */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse-slow"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-accent-teal/20 to-accent-emerald/20 rounded-full blur-3xl animate-float"></div>
                </div>
                
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
                    <div className="text-center relative z-10">
                        <div className="animate-fade-in">
                            <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
                                <span className="bg-gradient-to-r from-primary via-accent-indigo to-secondary bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_auto]">
                                    Send Money
                                </span>
                                <br />
                                <span className="text-neutral-800 bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text text-transparent">
                                    Fast & Secure
                                </span>
                            </h1>
                        </div>
                        
                        <div className="animate-slide-in-left" style={{animationDelay: '0.2s'}}>
                            <p className="text-xl md:text-2xl text-neutral-600 mb-8 max-w-4xl mx-auto leading-relaxed">
                                Experience the future of digital payments with InstantPay. Send money instantly, 
                                manage your digital wallet, and enjoy seamless bank integrations with enterprise-grade security. 
                                Join thousands of users who trust InstantPay for their daily transactions.
                            </p>
                            
                            {/* Quick Stats */}
                            <div className="flex flex-wrap justify-center gap-8 mb-12 text-center">
                                <div className="animate-bounce-gentle">
                                    <div className="text-3xl font-bold text-primary">₹50M+</div>
                                    <div className="text-sm text-neutral-600">Transactions Processed</div>
                                </div>
                                <div className="animate-bounce-gentle" style={{animationDelay: '0.1s'}}>
                                    <div className="text-3xl font-bold text-secondary">10K+</div>
                                    <div className="text-sm text-neutral-600">Active Users</div>
                                </div>
                                <div className="animate-bounce-gentle" style={{animationDelay: '0.2s'}}>
                                    <div className="text-3xl font-bold text-accent-emerald">99.9%</div>
                                    <div className="text-sm text-neutral-600">Uptime</div>
                                </div>
                                <div className="animate-bounce-gentle" style={{animationDelay: '0.3s'}}>
                                    <div className="text-3xl font-bold text-accent-teal">24/7</div>
                                    <div className="text-sm text-neutral-600">Support</div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="animate-slide-in-right" style={{animationDelay: '0.4s'}}>
                            <div className="flex flex-col sm:flex-row justify-center gap-6 items-center mb-12">
                                <Link href="/users/signup" className="group w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white shadow-elegant hover:shadow-hover transition-all duration-300 flex items-center justify-center text-lg font-medium">
                                    Create Free Account 
                                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link href="/users/signin" className="group w-full sm:w-auto px-8 py-4 rounded-2xl border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300 flex items-center justify-center text-lg font-medium">
                                    Sign In 
                                    <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>

                        {/* Stats Section */}
                        <div className="animate-fade-in" style={{animationDelay: '0.6s'}}>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                                <div className="text-center">
                                    <div className="text-3xl md:text-4xl font-bold text-primary mb-2">₹10M+</div>
                                    <div className="text-neutral-600">Money Transferred</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">1M+</div>
                                    <div className="text-neutral-600">Happy Users</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl md:text-4xl font-bold text-accent-emerald mb-2">99.9%</div>
                                    <div className="text-neutral-600">Uptime</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Features Section */}
            <div id="features" className="relative py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20 animate-fade-in">
                        <h2 className="text-5xl md:text-6xl font-bold text-neutral-800 mb-6">
                            Powerful 
                            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Features</span>
                        </h2>
                        <p className="text-xl md:text-2xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
                            Everything you need to manage your money in one place. Built for speed, security, and simplicity.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="group relative overflow-hidden transition-all duration-500 hover:scale-105 p-10 bg-gradient-to-br from-white to-primary-50 rounded-3xl shadow-card hover:shadow-hover border border-primary-100 animate-slide-in-left">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative z-10">
                                <div className="p-4 bg-gradient-to-br from-primary to-secondary rounded-2xl w-fit mb-8 group-hover:animate-bounce-gentle">
                                    <SendHorizontal className="h-10 w-10 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-neutral-800 mb-4 group-hover:text-primary transition-colors">
                                    Instant Transfers
                                </h3>
                                <p className="text-neutral-600 leading-relaxed text-lg">
                                    Send money instantly to anyone using just their phone number. Our P2P transfer system 
                                    processes transactions in real-time with automatic balance updates and transaction records.
                                </p>
                                <div className="mt-4 space-y-2">
                                    <div className="flex items-center text-sm text-neutral-600">
                                        <div className="w-2 h-2 bg-accent-emerald rounded-full mr-2"></div>
                                        Phone number-based transfers
                                    </div>
                                    <div className="flex items-center text-sm text-neutral-600">
                                        <div className="w-2 h-2 bg-accent-emerald rounded-full mr-2"></div>
                                        Real-time balance updates
                                    </div>
                                    <div className="flex items-center text-sm text-neutral-600">
                                        <div className="w-2 h-2 bg-accent-emerald rounded-full mr-2"></div>
                                        Complete transaction history
                                    </div>
                                </div>
                                <div className="mt-6 flex items-center text-primary font-medium">
                                    <span>Learn more</span>
                                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </div>

                        <div className="group relative overflow-hidden transition-all duration-500 hover:scale-105 p-10 bg-gradient-to-br from-white to-secondary-50 rounded-3xl shadow-card hover:shadow-hover border border-secondary-100 animate-slide-in-left" style={{animationDelay: '0.2s'}}>
                            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative z-10">
                                <div className="p-4 bg-gradient-to-br from-secondary to-primary rounded-2xl w-fit mb-8 group-hover:animate-bounce-gentle">
                                    <Building2 className="h-10 w-10 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-neutral-800 mb-4 group-hover:text-secondary transition-colors">
                                    Bank Integration
                                </h3>
                                <p className="text-neutral-600 leading-relaxed text-lg">
                                    Add money to your digital wallet directly from your bank account. Seamless integration 
                                    with major banks including HDFC, Axis Bank, and more with secure token-based authentication.
                                </p>
                                <div className="mt-4 space-y-2">
                                    <div className="flex items-center text-sm text-neutral-600">
                                        <div className="w-2 h-2 bg-secondary rounded-full mr-2"></div>
                                        Multi-bank support (HDFC, Axis, etc.)
                                    </div>
                                    <div className="flex items-center text-sm text-neutral-600">
                                        <div className="w-2 h-2 bg-secondary rounded-full mr-2"></div>
                                        Secure token-based transactions
                                    </div>
                                    <div className="flex items-center text-sm text-neutral-600">
                                        <div className="w-2 h-2 bg-secondary rounded-full mr-2"></div>
                                        Instant wallet funding
                                    </div>
                                </div>
                                <div className="mt-6 flex items-center text-secondary font-medium">
                                    <span>Learn more</span>
                                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </div>

                        <div className="group relative overflow-hidden transition-all duration-500 hover:scale-105 p-10 bg-gradient-to-br from-white to-accent-emerald/10 rounded-3xl shadow-card hover:shadow-hover border border-accent-emerald/20 animate-slide-in-left" style={{animationDelay: '0.4s'}}>
                            <div className="absolute inset-0 bg-gradient-to-br from-accent-emerald/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="relative z-10">
                                <div className="p-4 bg-gradient-to-br from-accent-emerald to-accent-teal rounded-2xl w-fit mb-8 group-hover:animate-bounce-gentle">
                                    <Shield className="h-10 w-10 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-neutral-800 mb-4 group-hover:text-accent-emerald transition-colors">
                                    Advanced Security
                                </h3>
                                <p className="text-neutral-600 leading-relaxed text-lg">
                                    Military-grade encryption, biometric authentication, and fraud detection. 
                                    Your money and data are protected by the highest security standards.
                                </p>
                                <div className="mt-6 flex items-center text-accent-emerald font-medium">
                                    <span>Learn more</span>
                                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Wallet Management Section */}
            <div className="relative py-24 bg-gradient-to-br from-neutral-50 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20 animate-fade-in">
                        <h2 className="text-5xl md:text-6xl font-bold text-neutral-800 mb-6">
                            Complete 
                            <span className="bg-gradient-to-r from-accent-emerald to-accent-teal bg-clip-text text-transparent"> Wallet Management</span>
                        </h2>
                        <p className="text-xl md:text-2xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
                            Your comprehensive dashboard for managing all your digital transactions and financial activities.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-elegant border border-neutral-200 animate-slide-in-left">
                            <div className="flex items-center mb-6">
                                <div className="p-3 bg-gradient-to-br from-primary to-secondary rounded-2xl mr-4">
                                    <Wallet2 className="h-8 w-8 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-neutral-800">Digital Wallet</h3>
                                    <p className="text-neutral-600">Secure balance management</p>
                                </div>
                            </div>
                            <ul className="space-y-4">
                                <li className="flex items-center">
                                    <div className="w-2 h-2 bg-accent-emerald rounded-full mr-3"></div>
                                    <span className="text-neutral-700">Real-time balance tracking</span>
                                </li>
                                <li className="flex items-center">
                                    <div className="w-2 h-2 bg-accent-emerald rounded-full mr-3"></div>
                                    <span className="text-neutral-700">Locked balance management</span>
                                </li>
                                <li className="flex items-center">
                                    <div className="w-2 h-2 bg-accent-emerald rounded-full mr-3"></div>
                                    <span className="text-neutral-700">Quick balance top-up from banks</span>
                                </li>
                                <li className="flex items-center">
                                    <div className="w-2 h-2 bg-accent-emerald rounded-full mr-3"></div>
                                    <span className="text-neutral-700">Balance history visualization</span>
                                </li>
                            </ul>
                        </div>
                        
                        <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-elegant border border-neutral-200 animate-slide-in-right">
                            <div className="flex items-center mb-6">
                                <div className="p-3 bg-gradient-to-br from-accent-teal to-accent-emerald rounded-2xl mr-4">
                                    <Clock className="h-8 w-8 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-neutral-800">Transaction History</h3>
                                    <p className="text-neutral-600">Complete audit trail</p>
                                </div>
                            </div>
                            <ul className="space-y-4">
                                <li className="flex items-center">
                                    <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                                    <span className="text-neutral-700">P2P transaction records</span>
                                </li>
                                <li className="flex items-center">
                                    <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                                    <span className="text-neutral-700">Bank transaction tracking</span>
                                </li>
                                <li className="flex items-center">
                                    <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                                    <span className="text-neutral-700">Status-based filtering</span>
                                </li>
                                <li className="flex items-center">
                                    <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                                    <span className="text-neutral-700">Downloadable statements</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Benefits Section */}
            <div id="benefits" className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20 animate-fade-in">
                        <h2 className="text-5xl md:text-6xl font-bold text-neutral-800 mb-6">
                            Why Choose 
                            <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent"> InstantPay?</span>
                        </h2>
                        <p className="text-xl md:text-2xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
                            Join over 1 million users who trust InstantPay for secure, fast, and reliable digital payments every day
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        <div className="text-center group animate-slide-in-left">
                            <div className="relative">
                                <div className="bg-gradient-to-br from-primary to-secondary p-8 rounded-3xl w-24 h-24 mx-auto mb-8 shadow-elegant group-hover:shadow-hover transition-all duration-300 group-hover:scale-110">
                                    <Users className="h-8 w-8 text-white mx-auto animate-float" />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <h3 className="text-2xl font-bold text-neutral-800 mb-4 group-hover:text-primary transition-colors">Social Payments</h3>
                            <p className="text-neutral-600 text-lg leading-relaxed">
                                Split bills with friends, pay for group dinners, or share expenses effortlessly. 
                                Make social spending simple and transparent.
                            </p>
                        </div>
                        
                        <div className="text-center group animate-slide-in-left" style={{animationDelay: '0.2s'}}>
                            <div className="relative">
                                <div className="bg-gradient-to-br from-accent-emerald to-accent-teal p-8 rounded-3xl w-24 h-24 mx-auto mb-8 shadow-elegant group-hover:shadow-hover transition-all duration-300 group-hover:scale-110">
                                    <Coins className="h-8 w-8 text-white mx-auto animate-float" style={{animationDelay: '2s'}} />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-br from-accent-emerald/20 to-accent-teal/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <h3 className="text-2xl font-bold text-neutral-800 mb-4 group-hover:text-accent-emerald transition-colors">Zero Fees</h3>
                            <p className="text-neutral-600 text-lg leading-relaxed">
                                No hidden charges, no transaction fees, no monthly subscriptions. 
                                What you send is what they receive, always.
                            </p>
                        </div>
                        
                        <div className="text-center group animate-slide-in-left" style={{animationDelay: '0.4s'}}>
                            <div className="relative">
                                <div className="bg-gradient-to-br from-accent-pink to-accent-coral p-8 rounded-3xl w-24 h-24 mx-auto mb-8 shadow-elegant group-hover:shadow-hover transition-all duration-300 group-hover:scale-110">
                                    <Clock className="h-8 w-8 text-white mx-auto animate-float" style={{animationDelay: '4s'}} />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-br from-accent-pink/20 to-accent-coral/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <h3 className="text-2xl font-bold text-neutral-800 mb-4 group-hover:text-accent-pink transition-colors">24/7 Support</h3>
                            <p className="text-neutral-600 text-lg leading-relaxed">
                                Round-the-clock customer support with real humans. Get help whenever you need it, 
                                however you need it.
                            </p>
                        </div>
                    </div>
                    
                    
                    {/* Performance Stats */}
                    <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="animate-slide-in-left">
                            <h3 className="text-4xl font-bold text-neutral-800 mb-6">
                                Built for 
                                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Performance</span>
                            </h3>
                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-xl">
                                        <Zap className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-semibold text-neutral-800 mb-2">Real-time Processing</h4>
                                        <p className="text-neutral-600">Instant balance updates and transaction processing with atomic database operations</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="p-2 bg-gradient-to-br from-accent-emerald to-accent-teal rounded-xl">
                                        <Shield className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-semibold text-neutral-800 mb-2">Data Integrity</h4>
                                        <p className="text-neutral-600">PostgreSQL ACID compliance ensures your money is always safe and tracked</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <div className="p-2 bg-gradient-to-br from-accent-pink to-accent-coral rounded-xl">
                                        <Users className="h-6 w-6 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-semibold text-neutral-800 mb-2">Scalable Architecture</h4>
                                        <p className="text-neutral-600">Modern tech stack designed to handle millions of transactions securely</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="animate-slide-in-right">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-2xl"></div>
                                <div className="relative bg-white p-8 rounded-3xl shadow-elegant">
                                    <div className="text-center">
                                        <div className="text-5xl font-bold text-primary mb-2">99.9%</div>
                                        <div className="text-neutral-600 mb-6">Database Uptime</div>
                                        <div className="text-3xl font-bold text-secondary mb-2">₹50M+</div>
                                        <div className="text-neutral-600 mb-6">Transactions Processed</div>
                                        <div className="text-3xl font-bold text-accent-emerald mb-2">&lt;1s</div>
                                        <div className="text-neutral-600">Average P2P Transfer Time</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Security Section */}
            <div id="security" className="relative bg-white py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20 animate-fade-in">
                        <h2 className="text-5xl md:text-6xl font-bold text-neutral-800 mb-6">
                            Your Money is 
                            <span className="bg-gradient-to-r from-accent-emerald to-accent-teal bg-clip-text text-transparent"> Safe</span>
                        </h2>
                        <p className="text-xl md:text-2xl text-neutral-600 max-w-3xl mx-auto leading-relaxed">
                            We use the same security standards as major banks to protect your money and personal information
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center group animate-fade-in">
                            <div className="p-6 bg-gradient-to-br from-accent-emerald/10 to-accent-teal/10 rounded-2xl mb-6 group-hover:scale-105 transition-transform duration-300">
                                <Shield className="h-12 w-12 text-accent-emerald mx-auto animate-float" />
                            </div>
                            <h3 className="text-xl font-bold text-neutral-800 mb-2">256-bit SSL</h3>
                            <p className="text-neutral-600">Military-grade encryption</p>
                        </div>
                        
                        <div className="text-center group animate-fade-in" style={{animationDelay: '0.1s'}}>
                            <div className="p-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl mb-6 group-hover:scale-105 transition-transform duration-300">
                                <Users className="h-12 w-12 text-primary mx-auto animate-float" style={{animationDelay: '2s'}} />
                            </div>
                            <h3 className="text-xl font-bold text-neutral-800 mb-2">2FA Authentication</h3>
                            <p className="text-neutral-600">Two-factor security</p>
                        </div>
                        
                        <div className="text-center group animate-fade-in" style={{animationDelay: '0.2s'}}>
                            <div className="p-6 bg-gradient-to-br from-accent-pink/10 to-accent-coral/10 rounded-2xl mb-6 group-hover:scale-105 transition-transform duration-300">
                                <Zap className="h-12 w-12 text-accent-pink mx-auto animate-float" style={{animationDelay: '4s'}} />
                            </div>
                            <h3 className="text-xl font-bold text-neutral-800 mb-2">Fraud Detection</h3>
                            <p className="text-neutral-600">AI-powered monitoring</p>
                        </div>
                        
                        
                    </div>
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