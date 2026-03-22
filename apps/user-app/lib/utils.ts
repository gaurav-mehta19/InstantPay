import { format } from "date-fns";

type ClassValue = string | number | boolean | null | undefined;

export function cn(...inputs: ClassValue[]) {
  return inputs.filter((value) => typeof value === "string" || typeof value === "number").join(" ");
}

export function formatDate(date: Date) {
  return format(date, "MMM d, yyyy");
}
