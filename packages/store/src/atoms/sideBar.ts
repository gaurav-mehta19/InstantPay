import { atom } from "recoil";

export const sideBarAtom = atom<boolean>({
    key:"isSideBarOpen",
    default:false
})