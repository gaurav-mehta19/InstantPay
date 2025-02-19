"use client"
import { Card } from "@repo/ui/card"
import { usePathname } from "next/navigation";

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
        return <Card title="P2P transaction">
            <div className={`text-[#OADBOD] flex justify-center items-center min-h-[550px] max-h-[550px]`}>
                No Recent transaction
            </div>
        </Card>
    }


    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "success":
                return "#10B981";
            case "fail":
                return "#EF4444"; 
            case "processing":
                return "#F59E0B"; 
            default:
                return "text-neutral-300"; 
        }
    }; 

    return (
        <Card title="P2P Transaction">
            <div className="min-h-[550px] max-h-[550px]">
                {transaction.map(t => (
                    <div key={t.id} className="flex justify-between gap-3 border-b border-neutral-200 mt-2">
                        <div className=" text-[#111827]">
                            <div className="text-md p-1">{t.direction === "send" ? "Send INR" : "Received INR"}</div>
                            <div className="text-xs px-1">{t.time.toDateString()}</div>
                        </div>
                        <div className=" text-[#OADBOD]">
                            {t.direction === "send" ? (
                                <>
                                    <div className="text-md p-1">To : {t.toUserName.charAt(0).toUpperCase() + t.toUserName.slice(1)}</div>
                                    <div className="text-xs px-1 text-center">Number : {t.toUserPhone}</div>
                                </>
                            ) : (
                                <>
                                    <div className="text-md p-1">From : {t.toUserName.charAt(0).toUpperCase() + t.toUserName.slice(1)}</div>
                                    <div className="text-xs px-1 text-center">Number : {t.toUserPhone}</div>
                                </>
                            )}
                        </div>
                        <div className=" text-[#OADBOD] text-md py-4">
                            Status :<span style={{color:getStatusColor(t.status)}}> {t.status}</span>
                        </div>
                        <div
                            className={`text-sm py-5  ${t.direction === "send" ? "text-red-500" : "text-emerald-500"
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
