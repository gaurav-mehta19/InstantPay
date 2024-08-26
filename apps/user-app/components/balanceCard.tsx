import { Card } from "@repo/ui/card"
interface BalanceCardprops{
    amount:number,
    locked:number
}

export const BalanceCard = ({amount,locked}:BalanceCardprops) => {
    return (
        <div className="text-neutral-400">
            <Card title="Balance">
                <div className="flex justify-between border-b border-neutral-700 mt-8 mb-6 pb-1.5">
                    <div className="text-neutral-200 ">
                        Unlocked Balance
                    </div>
                    <div>
                        {amount/100} INR
                    </div>
                </div>
                <div className="flex justify-between border-b border-neutral-700 mb-6 pb-1.5">
                    <div className="text-neutral-200">
                       Total Locked Balance
                    </div>
                    <div>
                        {locked/100} INR
                    </div>
                </div>
                <div className="flex justify-between border-b border-neutral-700 mb-7 pb-1.5">
                    <div className="text-neutral-200">
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