import { atom } from "recoil";

export const isDemoLoadingAtom = atom<boolean>({
  key: "isDemoLoading",
  default: false,
});

export const shouldRedirectAtom = atom<boolean>({
  key: "shouldDemoRedirect",
  default: false,
});
