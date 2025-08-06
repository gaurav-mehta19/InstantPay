import { Card } from "@repo/ui/card"

interface ProfileProps{
    name:string,
    phone:string,
}

export const Profile = ({name,phone}:ProfileProps) =>{
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
            {/* Profile Information */}
            <div className="space-y-8">
                {/* Personal Information Card */}
                <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-elegant border border-neutral-200 p-8 hover:shadow-hover transition-all duration-300">
                    <div className="flex items-center mb-8">
                        <div className="p-3 bg-gradient-to-br from-primary to-secondary rounded-2xl mr-4">
                            <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-neutral-800">Personal Information</h2>
                            <p className="text-neutral-600">Your account details</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Name Field */}
                        <div className="p-6 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl border border-primary-100">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-xl">
                                        <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-neutral-800">Full Name</h3>
                                        <p className="text-2xl font-bold text-primary">{name}</p>
                                    </div>
                                </div>
                                <button className="text-primary hover:text-primary-dark font-medium hover:underline transition-colors duration-300">
                                    Edit
                                </button>
                            </div>
                        </div>

                        {/* Phone Field */}
                        <div className="p-6 bg-gradient-to-r from-accent-emerald/10 to-accent-teal/10 rounded-2xl border border-accent-emerald/20">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="p-2 bg-gradient-to-br from-accent-emerald to-accent-teal rounded-xl">
                                        <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-neutral-800">Phone Number</h3>
                                        <p className="text-2xl font-bold text-accent-emerald">{phone}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                        <svg className="w-2 h-2 mr-1" fill="currentColor" viewBox="0 0 8 8">
                                            <circle cx={4} cy={4} r={3} />
                                        </svg>
                                        Verified
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Profile Stats & Actions */}
            <div className="space-y-6">
                {/* Profile Avatar */}
                <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-elegant border border-neutral-200 p-8 text-center">
                    <div className="flex flex-col items-center">
                        <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mb-4">
                            <span className="text-3xl font-bold text-white">
                                {name.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <h3 className="text-xl font-bold text-neutral-800">{name}</h3>
                    </div>
                </div>

                {/* Account Stats */}
                <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-elegant border border-neutral-200 p-6">
                    <h3 className="text-lg font-bold text-neutral-800 mb-4">Account Activity</h3>
                    <div className="space-y-4">
                        <div className="flex justify-between">
                            <span className="text-neutral-600">Member Since</span>
                            <span className="font-semibold text-neutral-800">Dec 2024</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-neutral-600">Total Transactions</span>
                            <span className="font-semibold text-accent-emerald">24</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-neutral-600">Account Status</span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                Active
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}