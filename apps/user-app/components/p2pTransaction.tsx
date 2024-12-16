import { Card } from "@repo/ui/card"

interface P2PTransactionProps {
    transaction:{
        time:Date,
        amount:number,
        status:string,
        toUserId:string,
        fromUserId:string,
        direction:string,
        id:string
    }[];
    currentUserId:string
}


export const P2pTransaction = ({ transaction }: P2PTransactionProps) => {
    return (
        <Card title="P2P Transaction">
            <div>
                {transaction.map(t => (
                    <div key={t.id} className="flex justify-between">
                        <div className="text-neutral-300">
                            <div className="text-md p-1">{t.direction === "send" ? "Send INR" : "Received INR"}</div>
                            <div className="text-xs px-1">{t.time.toDateString()}</div>
                        </div>
                        <div>
                            {t.direction === "send" ? `to: ${t.toUserId}` : `from: ${t.fromUserId}`}
                        </div>
                        <div className="text-neutral-500 text-xs p-1.5">
                            Status: {t.status}
                        </div>
                        <div
                            className={`text-sm p-1.5 mt-1.5 ${
                                t.direction === "send" ? "text-red-500" : "text-green-500"
                            }`}
                        >
                            {t.direction === "send"
                                ? `- Rs ${Math.abs(t.amount) / 100}`
                                : `+ Rs ${t.amount / 100}`}
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
};
