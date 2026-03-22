import {
  getP2Ptransaction,
  getTransaction,
} from "../../../lib/utils/transaction";
import { BreadcrumbNav } from "../../../components/shared/BreadcrumbNav";
import { TransactionTabs } from "../../../components/transactionTabs";

export default async function Transaction() {
  const p2ptransaction = await getP2Ptransaction();
  const onRampTransaction = await getTransaction();

  return (
    <div className="page-shell">
      <BreadcrumbNav current="Transactions" />

      <TransactionTabs p2p={p2ptransaction} onRamp={onRampTransaction} />
    </div>
  );
}
