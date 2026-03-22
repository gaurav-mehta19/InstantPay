import dynamicImport from "next/dynamic";
import { BreadcrumbNav } from "../../../components/shared/BreadcrumbNav";

const P2pCard = dynamicImport(
  () =>
    import("../../../components/p2pCard").then((module) => ({
      default: module.P2pCard,
    })),
  { ssr: false },
);

export default function Transfer() {
  return (
    <div className="page-shell">
      <BreadcrumbNav current="P2P Transfer" />

      <P2pCard />
    </div>
  );
}
