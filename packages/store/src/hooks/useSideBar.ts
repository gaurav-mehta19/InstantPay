"use client"
import { useRecoilValue } from "recoil";
import { sideBarAtom } from "../atoms/sideBar";


export const useSideBar = () => {
    const value = useRecoilValue(sideBarAtom);
    return value;
}