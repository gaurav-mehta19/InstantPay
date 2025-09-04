"use client"


interface P2PTransactionProps {
    transaction: {
        time: Date,
        amount: number,
        status: string,
        toUserId: string,
        fromUserId: string,
        direction: string,
        id: string,
        toUserName: string,
        toUserPhone: string,
    }[];
}


export const P2pTransaction = ({ transaction }: P2PTransactionProps) => {

    if (!transaction.length) {
        return (
            <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-elegant border border-neutral-200 p-8">
                <div className="flex items-center mb-6">
                    <div className="p-3 bg-gradient-to-br from-primary to-secondary rounded-2xl mr-4">
                        <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-neutral-800">P2P Transfers</h2>
                        <p className="text-neutral-600">Your peer-to-peer transactions</p>
                    </div>
                </div>
                
                <div className="flex flex-col items-center justify-center py-16">
                    <div className="p-6 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-full mb-6">
                        <svg className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-neutral-800 mb-2">No P2P Transactions Yet</h3>
                    <p className="text-neutral-600 text-center">Start sending money to friends and family to see your transaction history here.</p>
                </div>
            </div>
        );
    }


    const getStatusBgColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "success":
                return "bg-emerald-50 text-emerald-700 border-emerald-200";
            case "fail":
                return "bg-red-50 text-red-700 border-red-200"; 
            case "processing":
                return "bg-yellow-50 text-yellow-700 border-yellow-200"; 
            default:
                return "bg-neutral-50 text-neutral-700 border-neutral-200"; 
        }
    };

    return (
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-elegant border border-neutral-200 p-8">
            <div className="flex items-center mb-6">
                <div className="p-3 bg-gradient-to-br from-primary to-secondary rounded-2xl mr-4">
                    <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                    </svg>
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-neutral-800">P2P Transfers</h2>
                    <p className="text-neutral-600">{transaction.length} recent transactions</p>
                </div>
            </div>
            
            <div className="max-h-[500px] overflow-y-auto space-y-4 pr-2">
                {transaction.map((t, index) => (
                    <div key={t.id} className="p-8 bg-gradient-to-r from-neutral-50 to-white rounded-2xl border border-neutral-100 hover:shadow-md transition-all duration-300 animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                        <div className="flex items-center justify-between">
                            {/* Transaction Info */}
                            <div className="flex items-center space-x-4">
                                <div className={`p-3 rounded-2xl ${t.direction === "send" ? "bg-gradient-to-br from-accent-coral/10 to-accent-pink/10" : "bg-gradient-to-br from-accent-emerald/10 to-accent-teal/10"}`}>
                                    {t.direction === "send" ? (
                                        <svg className="h-6 w-6 text-accent-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16L16 8M16 8V16M16 8H8" />
                                        </svg>
                                    ) : (
                                        <svg className="h-6 w-6 text-accent-emerald" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8L8 16M8 16V8M8 16H16" />
                                        </svg>
                                    )}
                                </div>
                                
                                <div>
                                    <div className="font-semibold text-neutral-800 text-lg">
                                        {t.direction === "send" ? "Money Sent" : "Money Received"}
                                    </div>
                                    <div className="text-sm text-neutral-600">
                                        {t.direction === "send" ? "To" : "From"}: {t.toUserName.charAt(0).toUpperCase() + t.toUserName.slice(1)}
                                    </div>
                                    <div className="text-xs text-neutral-500">
                                        {t.toUserPhone} • {new Date(t.time).toLocaleDateString('en-US', { 
                                            year: 'numeric', 
                                            month: '2-digit', 
                                            day: '2-digit' 
                                        })}
                                    </div>
                                </div>
                            </div>
                            
                            {/* Status and Amount */}
                            <div className="text-right">
                                <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getStatusBgColor(t.status)} mb-2`}>
                                    {t.status.charAt(0).toUpperCase() + t.status.slice(1)}
                                </div>
                                <div className={`text-xl font-bold ${t.direction === "send" ? "text-accent-coral" : "text-accent-emerald"}`}>
                                    {t.direction === "send"
                                        ? `- ₹${Math.abs(t.amount) / 100}`
                                        : `+ ₹${t.amount / 100}`}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
