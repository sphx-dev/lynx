export const formatCoin = (amount: number): string => {
  // TODO: format based on locale
  // TODO: format based on denom
  return Intl.NumberFormat("en-US", { minimumFractionDigits: 4 }).format(
    amount
  );
};
