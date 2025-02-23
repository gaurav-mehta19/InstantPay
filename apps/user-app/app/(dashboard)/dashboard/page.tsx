
import { AddMoney } from "../../../components/addMoneyCard"
// import { P2pTransaction } from "../../../components/p2pTransaction"
import { BalanceCard } from "../../../components/balanceCard"
import { BalanceChart } from "../../../components/garph"
import { getBalance , getBalanceHistory } from "../../../lib/utils/blance"

export default async function Dashboard() {
    const balance = await getBalance()
    const balanceHistory = await getBalanceHistory()


    return (
        <div className="w-screen h-screen bg-[#FFFFFF]">
            <div>
                <div className="grid grid-cols-10 gap-3 mt-6">
                    <div className="col-start-3 col-span-3">
                        <AddMoney />
                    </div>
                    <div className="col-start-6 col-span-3">
                        <BalanceCard amount={balance} locked={0} />
                    </div>
                </div>
                <div className="grid grid-cols-10 mt-3">
                    <div className="col-start-3 col-span-6">
                        <BalanceChart data={balanceHistory}></BalanceChart>
                    </div>
                </div>
            </div>
        </div>
    )
}


