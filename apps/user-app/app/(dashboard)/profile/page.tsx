import { Profile } from "../../../components/profile"
import { getProfile } from "../../../lib/utils/profile"

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function ProfilePage(){
    const profile = await getProfile()

    return (
        <div className="w-full">
            {/* Header Section */}
            <div className="bg-white/80 backdrop-blur-md border-b border-primary-100 px-6 py-6 mb-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-2 animate-fade-in">
                        Your 
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Profile</span>
                    </h1>
                    <p className="text-neutral-600 text-lg animate-slide-in-left">
                        Manage your account information and settings
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-6">
                <Profile name={profile.name} phone={profile.phone} />
            </div>
        </div>
    )
} 
