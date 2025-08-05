import { P2pCard } from "../../../components/p2pCard";


export default function Transfer(){
    return (
        <div className="w-full">
            {/* Header Section */}
            <div className="bg-white/80 backdrop-blur-md border-b border-primary-100 px-6 py-6 mb-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-2 animate-fade-in">
                        P2P 
                        <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Transfer</span>
                    </h1>
                    <p className="text-neutral-600 text-lg animate-slide-in-left">
                        Send money instantly to friends and family
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6">
                <P2pCard/>
            </div>
        </div>
    )
} 
