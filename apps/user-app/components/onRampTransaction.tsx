import { Card } from "@repo/ui/card"

interface OnrampTransactionProps {
    transaction: {
        time: Date,
        amount: number,
        status: string,
        provider: string,
        id: string
    }[]
}

export const OnrampTransaction = ({ transaction }: OnrampTransactionProps) => {
    if (!transaction.length) {
        return <Card title="Recent transaction">
            <div className="text-neutral-300 flex justify-center max-h-64 items-center" style={{ minHeight: '510px' }}>
                No Recent transaction
            </div>
        </Card>
    }

    return (
        <Card title="Recent transaction">
            <div style={{ minHeight: '510px' }}>
                {transaction.map(t => <div key={t.id}>
                    <div className=" border-neutral-700 border-b flex justify-between mt-1.5 p-1.5">
                        <div className="text-neutral-300">
                            <div className="text-sm p-1">
                                Received INR
                            </div>
                            <div className="text-xs px-1">
                                {t.time.toDateString()}
                            </div>
                        </div>
                        <div className="text-neutral-300 mt-2">
                            {t.status}
                        </div>
                        <div className="text-green-500 text-sm p-1.5 mt-1.5">
                            + Rs {t.amount / 100}
                        </div>
                    </div>
                </div>)}
            </div>
        </Card>
    )
}