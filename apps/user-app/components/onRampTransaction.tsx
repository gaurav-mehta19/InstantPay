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
        return <Card title="Bank transaction">
            <div className="text-[#OADBOD] flex justify-center max-h-64 items-center" style={{ minHeight: '525px' }}>
                No Recent transaction
            </div>
        </Card>
    }

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "success":
                return "#098551";
            case "fail":
                return "#CF202F"; 
            case "processing":
                return "#F36C3D"; 
            default:
                return "text-neutral-300"; 
        }
    };

    return (
        <Card title="Bank transaction">
            <div style={{minHeight:'525px'}}>
                {transaction.map(t => <div key={t.id}>
                    <div className=" border-neutral-200 border-b flex justify-between mt-1.5 p-1.5">
                        <div className=" text-[#OADBOD]">
                            <div className="text-md p-1">
                                Received INR
                            </div>
                            <div className="text-xs px-1">
                                {t.time.toDateString()}
                            </div>
                        </div>
                        <div className=" text-[#OADBOD] mt-2">
                           Status : <span  style={{color:getStatusColor(t.status)}}>{t.status}</span>
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