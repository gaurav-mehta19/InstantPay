import dynamicImport from "next/dynamic";
import { getBalance, getBalanceHistory } from "../../../lib/utils/balance-core";
import { BreadcrumbNav } from "../../../components/shared/BreadcrumbNav";

const AddMoney = dynamicImport(
  () =>
    import("../../../components/addMoneyCard").then((module) => ({
      default: module.AddMoney,
    })),
  { ssr: false },
);

const BalanceCard = dynamicImport(
  () =>
    import("../../../components/balanceCard").then((module) => ({
      default: module.BalanceCard,
    })),
  { ssr: false },
);

const BalanceChart = dynamicImport(
  () =>
    import("../../../components/graph").then((module) => ({
      default: module.BalanceChart,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="animate-pulse space-y-3">
        <div className="h-4 w-44 rounded bg-neutral-200" />
        <div className="h-[300px] w-full rounded bg-neutral-100" />
      </div>
    ),
  },
);

export default async function Dashboard() {
  const bypassCache = true;

  const balance = await getBalance({ bypassCache });
  const balanceHistory = await getBalanceHistory({ bypassCache });

  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 pb-4 pt-2 md:px-6">
      <div className="flex min-h-[calc(100vh-4rem)] flex-col gap-3">
        <BreadcrumbNav current="Dashboard" />

        <div className="grid grid-cols-1 gap-4 lg:auto-rows-fr lg:grid-cols-12 lg:items-stretch">
          <div className="h-full lg:col-span-7">
            <AddMoney />
          </div>

          <div className="h-full lg:col-span-5">
            <BalanceCard amount={balance} locked={0} />
          </div>
        </div>

        <div className="min-h-0 flex-1">
          <div className="panel card-interactive surface-neutral flex h-full min-h-[300px] flex-col">
            <h2 className="panel-title">Balance Trend</h2>
            <p className="panel-subtitle">Recent balance changes over time.</p>
            <div className="mt-2 min-h-0 flex-1">
              <BalanceChart data={balanceHistory} height={268} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
