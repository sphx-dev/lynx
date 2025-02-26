interface FormatNumber {
  value: number;
  fixed?: number;
  before?: string;
  after?: string;
}
export const formatNumber = ({
  value,
  fixed = 4,
  before = "",
  after = "",
}: FormatNumber): string => {
  try {
    const formattedValue = Number(Math.abs(value)?.toString()).toFixed(fixed);
    const localeValue = Number(formattedValue).toLocaleString("en-GB");
    const sign = value < 0 ? "-" : "";
    return sign + String(before || "") + localeValue + String(after || "");
  } catch (e) {
    return value?.toString();
  }
};

export const displayPrice = (price: number, unit: string) =>
  formatNumber({
    value: price,
    before: unit,
  });

export function formatPrice(price: number, fixed = 5): string {
  return price.toFixed(fixed);
}

///
export function formatDollars(value: number, currencyDisplay?: any): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    // currencyDisplay values can be: "code", "symbol", "narrowSymbol", or "name"
    currencyDisplay: currencyDisplay || "code",
  })
    .format(value)
    .replaceAll(String.fromCharCode(160), " ")
    .trim();
}
