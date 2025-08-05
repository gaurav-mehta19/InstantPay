
import { AddMoney } from "../../../components/addMoneyCard"
// import { P2pTransaction } from "../../../components/p2pTransaction"
import { BalanceCard } from "../../../components/balanceCard"
import { BalanceChart } from "../../../components/garph"
import { getBalance , getBalanceHistory } from "../../../lib/utils/blance"

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function Dashboard() {
    const balance = await getBalance()
    const balanceHistory = await getBalanceHistory()


    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
            <div className="w-full">
                {/* Header Section */}
                <div className="bg-white/80 backdrop-blur-md border-b border-primary-100 px-6 py-6 mb-8">
                    <div className="max-w-7xl mx-auto">
                        <h1 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-2 animate-fade-in">
                            Welcome back! 
                            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Dashboard</span>
                        </h1>
                        <p className="text-neutral-600 text-lg animate-slide-in-left">Manage your finances with ease and security</p>
                    </div>
                </div>

                {/* Main Content */}
                <div className="max-w-7xl mx-auto px-6">
                    {/* Cards Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                        <div className="animate-slide-in-left h-full">
                            <AddMoney />
                        </div>
                        <div className="animate-slide-in-right h-full">
                            <BalanceCard amount={balance} locked={0} />
                        </div>
                    </div>
                    
                    {/* Chart Section */}
                    <div className="animate-fade-in" style={{animationDelay: '0.4s'}}>
                        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-elegant border border-neutral-200 p-8">
                            <h2 className="text-2xl font-bold text-neutral-800 mb-6 flex items-center">
                                <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-xl mr-3">
                                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                Balance History
                            </h2>
                            <BalanceChart data={balanceHistory} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


