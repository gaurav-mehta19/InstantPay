import { Card } from "@repo/ui/card"
interface BalanceCardprops{
    amount:number,
    locked:number
}

export const BalanceCard = ({amount,locked}:BalanceCardprops) => {
    return (
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-elegant border border-neutral-200 p-8 hover:shadow-hover transition-all duration-300 h-full flex flex-col">
            <div className="flex items-center mb-8">
                <div className="p-3 bg-gradient-to-br from-primary to-secondary rounded-2xl mr-4">
                    <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-neutral-800">Balance Overview</h2>
                    <p className="text-neutral-600">Your account summary</p>
                </div>
            </div>

            <div className="space-y-6 flex-1">
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl border border-primary-100">
                    <div className="flex items-center">
                        <div className="w-3 h-3 bg-gradient-to-r from-primary to-secondary rounded-full mr-3"></div>
                        <span className="text-neutral-700 font-medium">Available Balance</span>
                    </div>
                    <div className="text-2xl font-bold text-primary">
                        ₹{(amount/100).toLocaleString('en-IN')}
                    </div>
                </div>

                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-accent-emerald/10 to-accent-teal/10 rounded-2xl border border-accent-emerald/20">
                    <div className="flex items-center">
                        <div className="w-3 h-3 bg-gradient-to-r from-accent-emerald to-accent-teal rounded-full mr-3"></div>
                        <span className="text-neutral-700 font-medium">Locked Balance</span>
                    </div>
                    <div className="text-2xl font-bold text-accent-emerald">
                        ₹{(locked/100).toLocaleString('en-IN')}
                    </div>
                </div>

                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-neutral-50 to-neutral-100 rounded-2xl border border-neutral-200">
                    <div className="flex items-center">
                        <div className="w-3 h-3 bg-gradient-to-r from-neutral-600 to-neutral-800 rounded-full mr-3"></div>
                        <span className="text-neutral-700 font-semibold">Total Balance</span>
                    </div>
                    <div className="text-3xl font-bold text-neutral-800">
                        ₹{((amount+locked)/100).toLocaleString('en-IN')}
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="mt-8 pt-6 border-t border-neutral-200">
                <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                        <div className="text-xl font-bold text-secondary">₹{(amount/100 * 0.02).toFixed(0)}</div>
                        <div className="text-sm text-neutral-600">Monthly Savings</div>
                    </div>
                    <div className="text-center">
                        <div className="text-xl font-bold text-accent-emerald">24/7</div>
                        <div className="text-sm text-neutral-600">Available</div>
                    </div>
                </div>
            </div>
        </div>
    )
}