export const formatCoin = (amount: number): string => {
  // TODO: format based on locale
  // TODO: format based on denom
  return Intl.NumberFormat("en-GB", { minimumFractionDigits: 4 }).format(
    amount
  );
};
