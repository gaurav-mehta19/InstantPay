export function formatInrFromPaise(amountInPaise: number) {
  return `₹${(amountInPaise / 100).toLocaleString("en-IN")}`;
}

export function formatInr(amountInRupees: number) {
  return `₹${amountInRupees.toLocaleString("en-IN")}`;
}
