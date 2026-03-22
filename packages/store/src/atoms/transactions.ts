import { atom } from "recoil";

export type TransactionTab = "all" | "p2p" | "onramp";

export const transactionTabAtom = atom<TransactionTab>({
  key: "transactionTab",
  default: "all",
});

export const transactionStatusFilterAtom = atom<string>({
  key: "transactionStatusFilter",
  default: "all",
});
