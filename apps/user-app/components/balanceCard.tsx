import { Card } from "@repo/ui/card"
interface BalanceCardprops{
    amount:number,
    locked:number
}

export const BalanceCard = ({amount,locked}:BalanceCardprops) => {
    return (
        <div>
            <Card title="Balance">
                <div className="flex justify-between border-b border-neutral-200 mt-10 mb-6 pb-2">
                    <div className=" text-[#OADBOD] ">
                        Unlocked Balance
                    </div>
                    <div>
                        {amount/100} INR
                    </div>
                </div>
                <div className="flex justify-between border-b border-neutral-200 mb-10 pb-1.5">
                    <div className="text-[#OADBOD]">
                       Total Locked Balance
                    </div>
                    <div>
                        {locked/100} INR
                    </div>
                </div>
                <div className="flex justify-between border-b border-neutral-200 mb-7 pb-1.5">
                    <div className="text-[#OADBOD]">
                        Total Balance
                    </div>
                    <div>
                        {(amount+locked)/100} INR
                    </div>
                </div>
                
            </Card>
        </div>
    )
}